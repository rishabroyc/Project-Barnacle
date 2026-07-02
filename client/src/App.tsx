import { useEffect, useState } from 'react'

type HealthStatus = 'loading' | 'ok' | 'unreachable'

function App() {
  const [status, setStatus] = useState<HealthStatus>('loading')

  useEffect(() => {
    fetch('/api/health')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => setStatus(data.status === 'ok' ? 'ok' : 'unreachable'))
      .catch(() => setStatus('unreachable'))
  }, [])

  return (
    <main>
      <h1>The Brophet — client</h1>
      <p>
        API health: <strong>{status}</strong>
      </p>
    </main>
  )
}

export default App
