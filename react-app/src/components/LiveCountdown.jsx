import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ANCHOR, TOTAL_MS } from '../App'

function pad(n) { return String(n).padStart(2, '0') }

export default function LiveCountdown() {
  const [remaining, setRemaining] = useState(() => Math.max(0, TOTAL_MS - (Date.now() - ANCHOR.getTime())))

  useEffect(() => {
    const t = setInterval(() => {
      setRemaining(Math.max(0, TOTAL_MS - (Date.now() - ANCHOR.getTime())))
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const totalSec = Math.ceil(remaining / 1000)
  const hh = Math.floor(totalSec / 3600)
  const mm = Math.floor((totalSec % 3600) / 60)
  const ss = totalSec % 60
  const pct = (remaining / TOTAL_MS) * 100
  const urgent = hh < 6

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.bar}
    >
      <div style={styles.label}>T-MINUS · 剩余时间</div>
      <div style={styles.timer}>
        {[pad(hh), pad(mm), pad(ss)].map((val, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-end' }}>
            {i > 0 && <div style={styles.colon}>:</div>}
            <div style={styles.seg}>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={val}
                  initial={{ y: -16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 16, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ ...styles.num, color: urgent ? '#FF4D1C' : '#E8FF00' }}
                >
                  {val}
                </motion.div>
              </AnimatePresence>
              <div style={styles.unit}>{['HRS', 'MIN', 'SEC'][i]}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.progressBg}>
        <motion.div
          animate={{ width: `${pct}%`, background: urgent ? '#FF4D1C' : '#E8FF00' }}
          transition={{ duration: 1, ease: 'linear' }}
          style={styles.progressBar}
        />
      </div>
    </motion.div>
  )
}

const styles = {
  bar: {
    background: '#0a0a0a',
    borderBottom: '2px solid #E8FF00',
    padding: '20px 28px 16px',
    position: 'sticky', top: 0, zIndex: 50,
  },
  label: {
    fontSize: 10, letterSpacing: 4, color: '#E8FF00',
    fontWeight: 700, marginBottom: 8,
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  timer: { display: 'flex', alignItems: 'flex-end' },
  seg: { display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' },
  num: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 64, lineHeight: 0.9, minWidth: 56, textAlign: 'center',
  },
  unit: {
    fontSize: 9, letterSpacing: 3, color: '#444',
    fontWeight: 700, marginTop: 4,
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  colon: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 48, color: '#333',
    padding: '0 4px', paddingBottom: 14, lineHeight: 1,
  },
  progressBg: { marginTop: 10, height: 2, background: '#1a1a1a' },
  progressBar: { height: '100%' },
}
