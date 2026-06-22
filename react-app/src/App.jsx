import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import SecretOverlay from './components/SecretOverlay'
import LaunchOverlay from './components/LaunchOverlay'
import Poster from './components/Poster'

// Beijing time 2026-07-03 14:00 = UTC 2026-07-03 06:00
export const ANCHOR = new Date('2026-07-03T06:00:00Z')
export const TOTAL_MS = 48 * 60 * 60 * 1000

function getInitialPhase() {
  // ?phase=secret|ready|running for testing
  const p = new URLSearchParams(location.search).get('phase')
  if (p === 'secret' || p === 'ready' || p === 'running') return p
  const now = Date.now()
  if (now < ANCHOR.getTime()) return 'secret'
  if (!localStorage.getItem('48h_launched')) return 'ready'
  return 'running'
}

export default function App() {
  const [phase, setPhase] = useState(getInitialPhase)

  // Auto-transition from secret → ready when anchor time arrives
  useEffect(() => {
    if (phase !== 'secret') return
    const remaining = ANCHOR.getTime() - Date.now()
    if (remaining <= 0) { setPhase('ready'); return }
    const t = setTimeout(() => setPhase('ready'), remaining)
    return () => clearTimeout(t)
  }, [phase])

  function handleLaunch() {
    localStorage.setItem('48h_launched', '1')
    setPhase('running')
  }

  return (
    <>
      <AnimatePresence>
        {phase === 'secret' && (
          <SecretOverlay key="secret" />
        )}
        {phase === 'ready' && (
          <LaunchOverlay key="launch" onLaunch={handleLaunch} />
        )}
      </AnimatePresence>

      <Poster phase={phase} />
    </>
  )
}
