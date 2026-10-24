from django.contrib.auth import get_user_model
from django.core.cache import cache
from rest_framework.test import APIClient, APITestCase

from .models import ContactMessage, Profile

User = get_user_model()

PAYLOAD = {"name": "Aditi", "email": "Aditi@Example.com", "password": "S3cure-pass-987"}


class AuthFlowTests(APITestCase):
    def setUp(self):
        # enforce_csrf_checks=True makes the test client behave like a real browser
        self.client = APIClient(enforce_csrf_checks=True)

    def csrf_headers(self):
        self.client.get("/api/accounts/csrf/")
        return {"HTTP_X_CSRFTOKEN": self.client.cookies["csrftoken"].value}

    def test_csrf_endpoint_sets_cookie(self):
        r = self.client.get("/api/accounts/csrf/")
        self.assertEqual(r.status_code, 200)
        self.assertIn("csrftoken", r.cookies)

    def test_register_without_csrf_is_rejected(self):
        r = self.client.post("/api/accounts/register/", PAYLOAD, format="json")
        self.assertEqual(r.status_code, 403)
        self.assertFalse(User.objects.exists())

    def test_register_with_csrf_creates_user_and_profile(self):
        r = self.client.post(
            "/api/accounts/register/", PAYLOAD, format="json", **self.csrf_headers()
        )
        self.assertEqual(r.status_code, 201, r.data)
        self.assertEqual(r.data["email"], "aditi@example.com")
        user = User.objects.get(email="aditi@example.com")
        self.assertTrue(Profile.objects.filter(user=user).exists())

    def test_register_with_only_email_and_password(self):
        r = self.client.post(
            "/api/accounts/register/",
            {"email": "new@example.com", "password": PAYLOAD["password"]},
            format="json",
            **self.csrf_headers(),
        )
        self.assertEqual(r.status_code, 201, r.data)
        self.assertEqual(r.data["email"], "new@example.com")
        self.assertEqual(r.data["name"], "")

    def test_duplicate_email_rejected(self):
        h = self.csrf_headers()
        self.client.post("/api/accounts/register/", PAYLOAD, format="json", **h)
        self.client.post("/api/accounts/logout/", format="json", **{
            "HTTP_X_CSRFTOKEN": self.client.cookies["csrftoken"].value})
        h = self.csrf_headers()
        r = self.client.post("/api/accounts/register/", PAYLOAD, format="json", **h)
        self.assertEqual(r.status_code, 400)
        self.assertIn("email", r.data)

    def test_login_me_logout(self):
        User.objects.create_user(
            username="aditi@example.com", email="aditi@example.com",
            password=PAYLOAD["password"], first_name="Aditi",
        )
        creds = {"email": "ADITI@example.com", "password": PAYLOAD["password"]}

        # no CSRF token -> 403
        self.assertEqual(
            self.client.post("/api/accounts/login/", creds, format="json").status_code, 403
        )

        # wrong password -> 400
        bad = self.client.post(
            "/api/accounts/login/", {**creds, "password": "nope"},
            format="json", **self.csrf_headers(),
        )
        self.assertEqual(bad.status_code, 400)

        # good login
        ok = self.client.post(
            "/api/accounts/login/", creds, format="json", **self.csrf_headers()
        )
        self.assertEqual(ok.status_code, 200, ok.data)

        # session works for /me/
        me = self.client.get("/api/accounts/me/")
        self.assertEqual(me.status_code, 200)
        self.assertEqual(me.data["name"], "Aditi")

        # logout is a POST, so it needs the (rotated) CSRF token
        token = self.client.cookies["csrftoken"].value
        self.assertEqual(
            self.client.post("/api/accounts/logout/", format="json").status_code, 403
        )
        out = self.client.post(
            "/api/accounts/logout/", format="json", HTTP_X_CSRFTOKEN=token
        )
        self.assertEqual(out.status_code, 204)
        self.assertEqual(self.client.get("/api/accounts/me/").status_code, 403)


class ContactTests(APITestCase):
    URL = "/api/accounts/contact/"
    DATA = {"name": "Ravi", "email": "ravi@example.com", "subject": "Hi", "message": "Hello team"}

    def setUp(self):
        cache.clear()  # reset the rate limiter between tests
        self.client = APIClient(enforce_csrf_checks=True)

    def csrf(self):
        self.client.get("/api/accounts/csrf/")
        return {"HTTP_X_CSRFTOKEN": self.client.cookies["csrftoken"].value}

    def test_without_csrf_is_rejected(self):
        r = self.client.post(self.URL, self.DATA, format="json")
        self.assertEqual(r.status_code, 403)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_saves_message_for_anonymous_visitor(self):
        r = self.client.post(self.URL, self.DATA, format="json", **self.csrf())
        self.assertEqual(r.status_code, 201, r.data)
        self.assertEqual(ContactMessage.objects.get().email, "ravi@example.com")

    def test_subject_is_optional_but_message_is_required(self):
        h = self.csrf()
        ok = self.client.post(
            self.URL, {"name": "A", "email": "a@b.com", "message": "x"}, format="json", **h
        )
        self.assertEqual(ok.status_code, 201, ok.data)
        bad = self.client.post(
            self.URL, {"name": "A", "email": "a@b.com", "message": ""}, format="json", **h
        )
        self.assertEqual(bad.status_code, 400)
        self.assertIn("message", bad.data)

    def test_rate_limited_after_10_messages(self):
        h = self.csrf()
        codes = [self.client.post(self.URL, self.DATA, format="json", **h).status_code for _ in range(11)]
        self.assertEqual(codes[:10], [201] * 10)
        self.assertEqual(codes[10], 429)
