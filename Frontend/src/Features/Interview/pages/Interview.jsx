import '../styles/interview.scss'
import { useMemo, useState } from 'react'

const report = {
  matchScore: 35,
  technicalQuestions: [
    {
      question:
        "Given your experience with Next.js and Supabase in 'Quiet Room,' how would you design a highly scalable and secure full-stack application for a financial institution, considering data sensitivity and transaction volume?",
      intention:
        'To assess understanding of enterprise-level architecture, scalability, security, and data handling beyond personal projects, specifically for the financial domain.',
      answer:
        'Discuss a layered architecture, security best practices, scaling strategies, and database optimization.'
    },
    {
      question:
        'You mentioned working on server-side functionality with PHP and Apache in an internship, but your projects use Node.js/Express.js. Can you discuss the advantages and disadvantages of using Node.js for backend development in a high-performance environment compared to other options you might be familiar with?',
      intention:
        'To gauge understanding of backend technology choices, performance considerations, and ability to compare different stacks.',
      answer:
        'Discuss Node.js non-blocking I/O, concurrency tradeoffs, and compare it briefly to PHP or Java.'
    },
    {
      question:
        "Your 'Debris AI' project involved AI/ML concepts. How do you see AI/ML being integrated into financial services to drive transformative solutions, and what technical challenges might arise in implementing such solutions at scale?",
      intention:
        'To explore the candidate\'s understanding of AI/ML applications in a domain relevant to the company, and their awareness of practical implementation challenges.',
      answer:
        'Discuss fraud detection, personalization, risk modeling, compliance, drift, and explainability.'
    },
    {
      question:
        'In a full-stack development environment, how do you approach ensuring high quality and performant code, specifically considering frontend and backend aspects?',
      intention:
        'To understand their approach to quality assurance, testing, and performance optimization across the full stack.',
      answer:
        'Cover testing, CI/CD, accessibility, performance audits, logging, monitoring, caching, and query tuning.'
    }
  ],
  behavioralQuestions: [
    {
      question:
        'The job description mentions leading design and development and providing technical mentorship. While your experience is primarily in projects and internships, can you describe a time when you took a leadership role or mentored someone on a technical task, even if informally?',
      intention:
        'To understand their leadership potential and ability to guide others, despite limited formal experience in a senior role.',
      answer:
        'Use the STAR method and highlight leadership in a project setting.'
    },
    {
      question:
        'BNY values collaboration within diverse teams. Describe a situation where you had to work with team members who had different technical backgrounds or perspectives. How did you ensure effective collaboration and a successful outcome?',
      intention:
        'To assess their collaboration skills, adaptability, and ability to work with varied team dynamics.',
      answer:
        'Show how you aligned team members, used communication tools, and leveraged strengths.'
    },
    {
      question:
        'BNY encourages integrating new technologies to advance engineering capabilities. How do you stay updated with the latest industry trends and what new technology have you recently learned or explored that excites you?',
      intention:
        'To gauge their proactive learning, curiosity, and alignment with the company\'s culture of innovation.',
      answer:
        'Mention reading, experimenting, and a recent technology you explored.'
    },
    {
      question:
        'Tell me about a significant technical challenge you faced in one of your projects or internships. How did you approach problem-solving, and what was the outcome?',
      intention:
        'To evaluate their problem-solving methodology, resilience, and ability to learn from challenges.',
      answer:
        'Use the STAR method and explain diagnosis, solution, and impact.'
    }
  ],
  skillGaps: [
    { skill: '5-9 years of professional full-stack engineering experience', severity: 'high' },
    { skill: "Bachelor's degree completed", severity: 'high' },
    { skill: 'Experience leading enterprise-level design and architecture', severity: 'high' },
    { skill: 'Experience conducting formal code reviews and technical mentorship', severity: 'medium' },
    { skill: 'Advanced degree', severity: 'low' }
  ],
  preparationPlan: [
    {
      day: 1,
      focus: 'Understanding the Role & Self-Assessment',
      tasks: [
        'Thoroughly re-read the job description, highlight keywords.',
        'Research BNY Mellon\'s core business, values, and technology initiatives.',
        'Review own resume and projects, identify direct links to job requirements.',
        'Prepare a concise tell me about yourself pitch tailored to the role.'
      ]
    },
    {
      day: 2,
      focus: 'Advanced Full-Stack Architecture & Scalability',
      tasks: [
        'Study common architectural patterns for large-scale web applications.',
        'Learn about horizontal and vertical scaling techniques.',
        'Understand database scaling strategies and security best practices.',
        'Research OWASP Top 10 for finance-grade applications.'
      ]
    },
    {
      day: 3,
      focus: 'Deep Dive - Frontend (Next.js, React)',
      tasks: [
        'Review advanced React concepts and performance optimization.',
        'Understand Next.js data fetching strategies and rendering models.',
        'Practice building performant and accessible UI components.',
        'Familiarize with UI and UX principles for enterprise applications.'
      ]
    }
  ]
}

const sectionMeta = [
  {
    id: 'technical',
    label: 'Technical questions',
    icon: '◎',
    count: report.technicalQuestions.length,
    items: report.technicalQuestions,
    kind: 'questions'
  },
  {
    id: 'behavioral',
    label: 'Behavioral questions',
    icon: '◌',
    count: report.behavioralQuestions.length,
    items: report.behavioralQuestions,
    kind: 'questions'
  },
  {
    id: 'roadmap',
    label: 'Road Map',
    icon: '◈',
    count: report.preparationPlan.length,
    items: report.preparationPlan,
    kind: 'roadmap'
  }
]

const Interview = () => {
  const [activeTab, setActiveTab] = useState('technical')
  const [openIndex, setOpenIndex] = useState(0)

  const activeSection = useMemo(
    () => sectionMeta.find((section) => section.id === activeTab) ?? sectionMeta[0],
    [activeTab]
  )

  const activeItems = activeSection.items
  const topSkillGaps = report.skillGaps.slice(0, 4)

  const visibleItems = activeItems.map((item, index) => ({
    ...item,
    index
  }))

  return (
    <main className="interview-page">
      <section className="interview-shell">
        <aside className="interview-sidebar">
          <div className="sidebar-brand-card">
            <div className="brand-mark">AI</div>
            <div>
              <p className="sidebar-label">Interview report</p>
              <h1>MatchFlow AI</h1>
            </div>
          </div>

          <div className="score-card">
            <span className="score-caption">Match score</span>
            <strong>{report.matchScore}%</strong>
            <p>Strong match for this role with focused areas to improve.</p>
          </div>

          <nav className="sidebar-nav interview-nav" aria-label="Interview sections">
            {sectionMeta.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id)
                  setOpenIndex(0)
                }}
              >
                <span className="nav-link-icon">{item.icon}</span>
                <span>
                  {item.label}
                  <small>{item.count} questions</small>
                </span>
              </button>
            ))}
          </nav>

          <div className="sidebar-footer-card">
            <p>Quick focus</p>
            <ul>
              <li>Security and scalability</li>
              <li>Leadership framing</li>
              <li>STAR-based storytelling</li>
            </ul>
          </div>
        </aside>

        <section className="interview-workspace">
          <header className="interview-topbar">
            <div>
              <p className="topbar-label">Sections</p>
              <h2>{activeSection.label}</h2>
            </div>

            <div className="topbar-actions">
              <span className="status-pill">{activeSection.count} questions</span>
            </div>
          </header>

          <div className="interview-grid">
            <section className="content-panel main-panel">
              <div className="panel-header panel-header-main">
                <div>
                  <p className="panel-kicker">Technical Questions</p>
                  <h3>{activeSection.label}</h3>
                </div>
                <span className="panel-badge">{visibleItems.length} cards</span>
              </div>

              {activeSection.kind === 'roadmap' ? (
                <div className="roadmap-list main-roadmap">
                  {report.preparationPlan.map((day) => (
                    <article className="roadmap-card" key={day.day}>
                      <div className="roadmap-day">Day {day.day}</div>
                      <div>
                        <h4>{day.focus}</h4>
                        <ul>
                          {day.tasks.map((task) => (
                            <li key={task}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="accordion-list">
                  {visibleItems.map((item) => {
                    const isOpen = item.index === openIndex

                    return (
                      <article
                        key={item.question}
                        className={`accordion-card ${isOpen ? 'open' : ''}`}
                      >
                        <button
                          type="button"
                          className="accordion-trigger"
                          onClick={() => setOpenIndex(isOpen ? -1 : item.index)}
                          aria-expanded={isOpen}
                        >
                          <span className="question-index">Q{String(item.index + 1).padStart(2, '0')}</span>
                          <span className="question-text">{item.question}</span>
                          <span className="chevron">⌃</span>
                        </button>

                        {isOpen ? (
                          <div className="accordion-content">
                            <div className="label-block intention">
                              <span>Intention</span>
                              <p>{item.intention}</p>
                            </div>
                            <div className="label-block answer">
                              <span>Model answer</span>
                              <p>{item.answer}</p>
                            </div>
                          </div>
                        ) : null}
                      </article>
                    )
                  })}
                </div>
              )}
            </section>

            <aside className="content-panel right-panel">
              <div className="score-circle-card">
                <p className="panel-kicker">Match Score</p>
                <div className="score-ring" style={{ '--score': report.matchScore }}>
                  <div>
                    <strong>{report.matchScore}</strong>
                    <span>%</span>
                  </div>
                </div>
                <p className="score-note">Strong match for this role</p>
              </div>

              <div className="skill-gap-stack">
                <p className="panel-kicker">Skill Gaps</p>
                {topSkillGaps.map((item) => (
                  <div key={item.skill} className={`gap-pill ${item.severity}`}>
                    {item.skill}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </section>
    </main>
  )
}

export default Interview