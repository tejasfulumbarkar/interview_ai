import '../styles/home.scss'
import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'

const Home = () => {
        const { user, loading } = useAuth()
        const [storedUser, setStoredUser] = useState(null)

    useEffect(() => {
        try {
            const rawUser = localStorage.getItem('auth_user')
            setStoredUser(rawUser ? JSON.parse(rawUser) : null)
        } catch (error) {
            setStoredUser(null)
        }
    }, [user])

    const displayName = loading
        ? 'Loading...'
        : user?.username?.trim()
            ? user.username
            : storedUser?.username?.trim()
                ? storedUser.username
                : user?.email?.split('@')[0] || storedUser?.email?.split('@')[0] || 'Guest'

  return (
    <main className='home'>
            <section className="dashboard-shell">
                <aside className="sidebar">
                    <div className="sidebar-brand">
                        <div>
                            <h2>MatchFlow AI</h2>
                            <p>AI Career Platform</p>
                        </div>
                    </div>

                    <nav className="sidebar-nav" aria-label="Primary">
                        <a className="nav-item active" href="#">
                            <span className="nav-icon">▦</span>
                            Dashboard
                        </a>
                        <a className="nav-item" href="#">
                            <span className="nav-icon">▤</span>
                            My Reports
                        </a>
                        <a className="nav-item" href="#">
                            <span className="nav-icon">⚙</span>
                            Settings
                        </a>
                    </nav>

                    <button className="new-analysis-btn">+ New Analysis</button>

                    <div className="sidebar-footer">
                        <a href="#">Help Center</a>
                        <a href="#">Logout</a>
                    </div>
                </aside>

                <section className="workspace">
                    <header className="topbar">
                        <div>
                            <p className="topbar-label">Analysis Dashboard</p>
                            <h1>Forge Your Career Future</h1>
                        </div>

                        <div className="topbar-actions" aria-label="Quick actions">
                            <span>◔</span>
                            <span>◉</span>
                            <span className="username-pill">{displayName}</span>
                        </div>
                    </header>

                    <p className="workspace-intro">
                        Our advanced AI analyzes the semantic gap between your professional identity and target roles,
                        delivering precise interview preparation in a black-themed workspace.
                    </p>

                    <section className="workspace-grid">
                        <div className="panel panel-profile">
                            <div className="panel-headline">
                                <span className="panel-kicker">Self Description</span>
                                <h2>Who are you professionally?</h2>
                            </div>

                            <textarea
                                name='selfDescription'
                                id='selfDescription'
                                placeholder='Describe your goals, values, strengths, and what drives you...'
                            ></textarea>
                        </div>

                        <div className="panel panel-upload">
                            <div className="panel-headline row">
                                <div>
                                    <span className="panel-kicker">Resume / CV</span>
                                    <h2>Experience &amp; Skills</h2>
                                </div>
                                <label className="upload-link" htmlFor="resume">Upload PDF</label>
                            </div>

                            <textarea
                                className="resume-area"
                                name='resumePreview'
                                id='resumePreview'
                                placeholder='Paste your resume content here or upload a file for deeper analysis...'
                            ></textarea>

                            <div className="chip-row">
                                <span>Product Design</span>
                                <span>Strategic Planning</span>
                                <span>AI Engineering</span>
                            </div>

                            <input hidden type="file" name='resume' id='resume' accept='.pdf' />
                        </div>

                        <div className="panel panel-job">
                            <div className="panel-headline">
                                <span className="panel-kicker">Target Job Description</span>
                                <h2>What is the role you're aiming for?</h2>
                            </div>

                            <textarea
                                name='jobDescription'
                                id='jobDescription'
                                placeholder='Paste the full job description here...'
                            ></textarea>
                        </div>
                    </section>

                    <footer className="cta-bar">
                        <div>
                            <h3>Ready for Analysis?</h3>
                            <p>Our AI will generate a detailed compatibility report in under 30 seconds.</p>
                        </div>

                        <button className='generate-btn'> Generate AI Report</button>
                    </footer>
                </section>
            </section>
    </main>
  )
}

export default Home