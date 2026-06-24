const RouteErrorPage = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px', textAlign: 'center' }}>
      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '12px' }}>Page not found</h1>
        <p style={{ marginBottom: '20px' }}>The route you tried to open does not exist.</p>
        <a href="/login">Go to login</a>
      </div>
    </div>
  )
}

export default RouteErrorPage