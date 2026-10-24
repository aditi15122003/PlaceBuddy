AI mock interview prep for placements.
Frontend: React (Vite)
Backend: Django + Django REST Framework
Database:MySQL


PlaceBuddy/
├── backend/                  Django project
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example          not actual env 
│   ├── config/               
│   └── accounts/             
├── frontend/                 React project
│   ├── package.json
│   ├── .env.example          
│   └── src/
│       ├── api.js            all backend calls + CSRF handling
│       ├── index.css         
│       ├── context/          
│       ├── components/       
│       └── pages/            
└── README.md






Backend (terminal 1)
cd PlaceBuddy\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt


Frontend (terminal 2)
cd PlaceBuddy\frontend
npm install
npm run dev



