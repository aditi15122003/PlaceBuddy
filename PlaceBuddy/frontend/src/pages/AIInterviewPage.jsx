import { useAuth } from '../context/auth'
import './AIInterviewPage.css'

// The AI part is not connected yet. This page is login-only (see App.jsx),
// so for now it shows the three interview modes as "coming soon".
const modes = [
  {
    icon: '🎯',
    title: 'Role Based Interview',
    desc: 'Pick a job role like Frontend Developer or Data Analyst and get questions tailored to it.',
  },
  {
    icon: '🧠',
    title: 'Skill Based Interview',
    desc: 'Choose skills like React, Python or SQL and be tested on exactly those.',
  },
  {
    icon: '📝',
    title: 'Practice Questions',
    desc: 'Browse a bank of common interview questions and practise at your own pace.',
  },
]

function AIInterviewPage() {
  const { user } = useAuth()

  return (
    <main>
      <section className="ai-hero">
        <span className="badge-soft">🤖 AI Mock Interviewer</span>
        <h1>Hi, {user.name || user.email.split('@')[0]} 👋</h1>
        <p>Your account is ready. Interview practice is launching very soon.</p>
      </section>

      <section className="section ai-modes">
        <div className="card-grid">
          {modes.map((m) => (
            <div className="card" key={m.title}>
              <span className="soon">Coming soon</span>
              <div className="card-icon">{m.icon}</div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default AIInterviewPage
