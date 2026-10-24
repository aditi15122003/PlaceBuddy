import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth'
import './HomePage.css'

const features = [
  {
    icon: '🎯',
    title: 'Role Based Interview',
    desc: 'Pick a job role like Frontend Developer or Data Analyst and get questions tailored to it.',
  },
  {
    icon: '🧠',
    title: 'Skill Based Interview',
    desc: 'Choose skills like React, Python or SQL and the AI tests you on exactly those.',
  },
  {
    icon: '📝',
    title: 'Practice Questions',
    desc: 'Browse a bank of common interview questions and practise at your own pace.',
  },
]

const steps = [
  { no: '01', title: 'Create Account', desc: 'Register for free in seconds.' },
  { no: '02', title: 'Choose Interview Type', desc: 'Select a role or skills to be tested on.' },
  { no: '03', title: 'Take AI Interview', desc: 'Answer questions like a real interview.' },
  { no: '04', title: 'Get Feedback', desc: 'See your score and where to improve.' },
]

const reviews = [
  { name: 'Ananya S.', role: 'Placed at TCS', rating: 5, text: 'The role based interviews felt very real. I felt confident on the actual day.' },
  { name: 'Rahul P.', role: 'Placed at Infosys', rating: 5, text: 'Skill based mode helped me find weak topics in SQL quickly.' },
  { name: 'Sneha K.', role: 'Placed at Wipro', rating: 4, text: 'Practice questions and instant feedback made my preparation much easier.' },
]

function HomePage() {
  const { user } = useAuth()

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <span className="badge">🚀 AI Powered Placement Prep</span>
          <h1>
            Crack Your Dream Job with <span>PlaceBuddy</span>
          </h1>
          <p>
            Practice with our AI mock interviewer, improve your skills and get
            instant feedback before the real interview.
          </p>
          <div className="hero-buttons">
            <Link to="/ai-interview" className="btn btn-primary">Start Mock Interview</Link>
            <Link to="/about" className="btn btn-outline">Learn More</Link>
          </div>
          <div className="hero-stats">
            <div><h3>10K+</h3><p>Students</p></div>
            <div><h3>500+</h3><p>Questions</p></div>
            <div><h3>4.8★</h3><p>Rating</p></div>
          </div>
        </div>

        <div className="hero-card">
          <div className="chat-bubble ai">🤖 Tell me about yourself.</div>
          <div className="chat-bubble user">I am a final year CS student...</div>
          <div className="chat-bubble ai">Great! What is the difference between props and state in React?</div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <h2 className="section-title">AI Mock Interviewer</h2>
        <p className="section-sub">Three ways to prepare, all in one place</p>
        <div className="card-grid">
          {features.map((f) => (
            <div className="card" key={f.title}>
              <div className="card-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <Link to="/ai-interview" className="card-link">Try now →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <div className="alt-wrap">
        <section className="section">
          <h2 className="section-title">How It Works</h2>
          <p className="section-sub">Get interview-ready in four simple steps</p>
          <div className="steps-grid">
            {steps.map((s) => (
              <div className="step" key={s.no}>
                <span className="step-no">{s.no}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Reviews */}
      <section className="section">
        <h2 className="section-title">Reviews &amp; Ratings</h2>
        <p className="section-sub">What students say about PlaceBuddy</p>
        <div className="card-grid">
          {reviews.map((r) => (
            <div className="card review" key={r.name}>
              <div className="stars" aria-label={`${r.rating} out of 5 stars`}>
                {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
              </div>
              <p>"{r.text}"</p>
              <h4>{r.name}</h4>
              <small>{r.role}</small>
            </div>
          ))}
        </div>
      </section>

      {/* CTA: changes once you are logged in */}
      <section className="cta">
        {user ? (
          <>
            <h2>Welcome back, ready to practise?</h2>
            <p>Jump into your next mock interview.</p>
            <Link to="/ai-interview" className="btn cta-btn">Go to Mock Interviewer</Link>
          </>
        ) : (
          <>
            <h2>Ready to ace your next interview?</h2>
            <p>Join PlaceBuddy today and start practising for free.</p>
            <Link to="/register" className="btn cta-btn">Get Started Free</Link>
          </>
        )}
      </section>
    </main>
  )
}

export default HomePage
