import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth'
import './AboutPage.css'

const values = [
  { icon: '🎯', title: 'Our Mission', desc: 'Help every student walk into placement interviews with confidence, not fear.' },
  { icon: '👁️', title: 'Our Vision', desc: 'A world where quality interview practice is free and available to everyone.' },
  { icon: '🤝', title: 'Our Promise', desc: 'Honest feedback, real interview questions and tools that keep improving.' },
]

const offers = [
  'AI mock interviews based on job roles',
  'Skill based interviews for React, Python, SQL and more',
  'A practice question bank with sample answers',
  'Reviews and ratings to track your progress',
]

// TODO: put your real team details here
const team = [
  { name: 'Your Name', role: 'Founder & Developer' },
  { name: 'Team Member', role: 'Backend Developer' },
  { name: 'Team Member', role: 'UI/UX Designer' },
]

function AboutPage() {
  const { user } = useAuth()

  return (
    <main className="about-page">
      <section className="about-hero">
        <h1>About <span>PlaceBuddy</span></h1>
        <p>
          PlaceBuddy is your AI study buddy for placements. We help students
          practise interviews, find weak areas and improve before the real thing.
        </p>
      </section>

      <section className="about-section">
        <div className="about-grid">
          {values.map((v) => (
            <div className="about-card" key={v.title}>
              <div className="about-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section split">
        <div>
          <h2>What we offer</h2>
          <ul className="offer-list">
            {offers.map((o) => <li key={o}>✅ {o}</li>)}
          </ul>
        </div>
        <div className="about-stats">
          <div><h3>10K+</h3><p>Students</p></div>
          <div><h3>500+</h3><p>Questions</p></div>
          <div><h3>50+</h3><p>Roles &amp; Skills</p></div>
          <div><h3>4.8★</h3><p>Average Rating</p></div>
        </div>
      </section>

      <section className="about-section">
        <h2 className="center">Meet the Team</h2>
        <div className="about-grid">
          {team.map((t, i) => (
            <div className="about-card team" key={i}>
              <div className="avatar">{t.name.charAt(0)}</div>
              <h3>{t.name}</h3>
              <p>{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Start preparing today</h2>
        <p>Join thousands of students already practising with PlaceBuddy.</p>
        {user ? (
          <Link to="/ai-interview" className="btn cta-btn">Go to Mock Interviewer</Link>
        ) : (
          <Link to="/register" className="btn cta-btn">Get Started Free</Link>
        )}
      </section>
    </main>
  )
}

export default AboutPage
