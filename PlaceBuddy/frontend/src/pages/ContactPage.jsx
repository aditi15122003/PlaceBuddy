import { useState } from 'react'
import { sendContact } from '../api'
import './ContactPage.css'

// TODO: replace with your real contact details
const info = [
  { icon: '📧', title: 'Email', text: 'support@placebuddy.com' },
  { icon: '📞', title: 'Phone', text: '+91 98765 43210' },
  { icon: '📍', title: 'Address', text: 'Pune, Maharashtra, India' },
]

const EMPTY = { name: '', email: '', subject: '', message: '' }

function ContactPage() {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
    setSent(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Name, email and message are required.')
      return
    }
    setSubmitting(true)
    try {
      await sendContact({ ...form, name: form.name.trim(), message: form.message.trim() })
      setSent(true)
      setForm(EMPTY)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <h1>Contact <span>Us</span></h1>
        <p>Have a question or feedback? We'd love to hear from you.</p>
      </section>

      <section className="contact-wrap">
        <div className="contact-info">
          {info.map((i) => (
            <div className="info-card" key={i.title}>
              <div className="info-icon">{i.icon}</div>
              <div>
                <h4>{i.title}</h4>
                <p>{i.text}</p>
              </div>
            </div>
          ))}
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send us a message</h2>

          {sent && <p className="form-success" role="status">✅ Thanks! Your message has been sent.</p>}
          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="row">
            <div>
              <label htmlFor="c-name">Name</label>
              <input id="c-name" name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="c-email">Email</label>
              <input id="c-email" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
            </div>
          </div>

          <label htmlFor="c-subject">Subject</label>
          <input id="c-subject" name="subject" placeholder="What is this about?" value={form.subject} onChange={handleChange} />

          <label htmlFor="c-message">Message</label>
          <textarea
            id="c-message"
            name="message"
            rows={6}
            maxLength={5000}
            placeholder="Write your message..."
            value={form.message}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default ContactPage
