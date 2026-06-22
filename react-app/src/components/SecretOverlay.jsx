import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ANCHOR } from '../App'

function pad(n) { return String(n).padStart(2, '0') }

function useCountdown(target) {
  const [remaining, setRemaining] = useState(() => Math.max(0, target - Date.now()))
  useEffect(() => {
    const t = setInterval(() => setRemaining(Math.max(0, target - Date.now())), 1000)
    return () => clearInterval(t)
  }, [target])
  return remaining
}

function MountainBg() {
  return (
    <svg
      viewBox="0 0 480 180"
      preserveAspectRatio="xMidYMax meet"
      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: 180, pointerEvents: 'none' }}
    >
      <path d="M0,130 L70,70 L130,100 L190,38 L260,80 L310,28 L380,72 L430,50 L480,68 L480,180 L0,180 Z" fill="#14100A" />
      <path d="M0,155 L55,115 L110,130 L170,92 L240,118 L290,70 L360,102 L420,84 L480,96 L480,180 L0,180 Z" fill="#0E0B07" />
      <path d="M0,130 L70,70 L130,100 L190,38 L260,80 L310,28 L380,72 L430,50 L480,68" fill="none" stroke="#201A12" strokeWidth="0.7" />
      <path d="M0,155 L55,115 L110,130 L170,92 L240,118 L290,70 L360,102 L420,84 L480,96" fill="none" stroke="#1A1610" strokeWidth="0.5" />
    </svg>
  )
}

export default function SecretOverlay() {
  const remaining = useCountdown(ANCHOR.getTime())
  const d  = Math.floor(remaining / 86400000)
  const h  = Math.floor((remaining % 86400000) / 3600000)
  const m  = Math.floor((remaining % 3600000) / 60000)
  const s  = Math.floor((remaining % 60000) / 1000)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      style={styles.overlay}
    >
      <MountainBg />

      {/* contour ring */}
      <div style={styles.contourOuter}>
        {[90, 72, 55, 38, 22].map((r, i) => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: r * 2, height: r * 2,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: `1px solid rgba(232,95,30,${0.04 + i * 0.015})`,
          }} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={styles.eyebrow}
      >
        <span style={styles.eyeDot} />
        MISSION / 莫干山 · 2026
        <span style={styles.eyeDot} />
      </motion.p>

      {/* Summit / lock icon */}
      <motion.svg
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        style={styles.lockIcon}
        viewBox="0 0 52 52" fill="none"
      >
        {/* mountain peak */}
        <path d="M26 8L36 26H16L26 8Z" stroke="#3A3530" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
        <path d="M21 20L26 8L31 20" stroke="#E85F1E" strokeWidth="1" fill="none" strokeLinejoin="round" opacity="0.6"/>
        {/* lock body */}
        <rect x="14" y="30" width="24" height="16" rx="1" stroke="#3A3530" strokeWidth="1.2"/>
        <path d="M19 30V25C19 22.239 22.134 20 26 20C29.866 20 33 22.239 33 25V30" stroke="#2A2420" strokeWidth="1.2" strokeLinecap="square"/>
        <circle cx="26" cy="38" r="2.5" fill="#E85F1E"/>
        <line x1="26" y1="40.5" x2="26" y2="43.5" stroke="#E85F1E" strokeWidth="1.2"/>
      </motion.svg>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={styles.title}
      >
        行程<span style={{ color: '#E85F1E' }}>保密</span>中
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={styles.sub}
      >
        48-HOUR COUNTDOWN · MOGANSHAN<br />
        北京时间 2026年7月3日 14:00 解锁
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        style={styles.divider}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        style={styles.countdown}
      >
        {[
          { val: pad(d), label: 'DAYS' },
          { val: pad(h), label: 'HRS' },
          { val: pad(m), label: 'MIN' },
          { val: pad(s), label: 'SEC' },
        ].map(({ val, label }, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'stretch' }}>
            {i > 0 && <div style={styles.sep}>:</div>}
            <div style={styles.block}>
              <div style={styles.num}>{val}</div>
              <div style={styles.blockLabel}>{label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={styles.unlockInfo}
      >
        UNLOCK AT T-MINUS 48:00:00
      </motion.p>

      <div style={styles.bottomTag}>
        <div style={styles.tagLine} />
        <span style={styles.tagText}>MOGANSHAN · OUTDOOR · TRAIL · RUN</span>
        <div style={styles.tagLine} />
      </div>
    </motion.div>
  )
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 200,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: 'linear-gradient(170deg, #0F0C09 0%, #0C0906 100%)',
    padding: '40px 32px', paddingBottom: '18vh',
    overflow: 'hidden',
  },
  contourOuter: {
    position: 'absolute', top: '42%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 180, height: 180,
    pointerEvents: 'none',
  },
  eyebrow: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 10, letterSpacing: 5, color: '#5A5040',
    fontWeight: 700, marginBottom: 24, textAlign: 'center',
    display: 'flex', alignItems: 'center', gap: 10,
    position: 'relative', zIndex: 2,
  },
  eyeDot: {
    display: 'inline-block', width: 3, height: 3,
    background: '#E85F1E', borderRadius: '50%',
  },
  lockIcon: { width: 52, height: 52, marginBottom: 16, position: 'relative', zIndex: 2 },
  title: {
    fontFamily: "'Noto Sans SC', sans-serif",
    fontSize: 48, fontWeight: 900, color: '#F0E8DC',
    letterSpacing: 6, lineHeight: 1, whiteSpace: 'nowrap',
    marginBottom: 6, position: 'relative', zIndex: 2,
  },
  sub: {
    fontFamily: "'Noto Sans SC', sans-serif",
    fontSize: 10, color: '#3A3530', letterSpacing: 3,
    textAlign: 'center', lineHeight: 2.2, marginBottom: 30,
    position: 'relative', zIndex: 2,
  },
  divider: {
    width: 48, height: 2, background: '#E85F1E',
    marginBottom: 28, transformOrigin: 'center',
    position: 'relative', zIndex: 2,
  },
  countdown: { display: 'flex', gap: 4, alignItems: 'stretch', position: 'relative', zIndex: 2 },
  block: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  num: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 54, lineHeight: 1, color: '#F0E8DC',
    minWidth: 66, textAlign: 'center',
    background: '#161210',
    border: '1px solid #2A2420',
    borderBottom: 'none',
    padding: '12px 8px 8px',
  },
  blockLabel: {
    fontSize: 8, letterSpacing: 3, color: '#3A3530',
    fontWeight: 700, textAlign: 'center',
    background: '#161210',
    border: '1px solid #2A2420',
    borderTop: `2px solid #E85F1E`,
    width: '100%', paddingBottom: 8, paddingTop: 5,
  },
  sep: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 36, color: '#2A2420',
    display: 'flex', alignItems: 'center',
    padding: '0 2px', paddingTop: 4,
  },
  unlockInfo: {
    fontSize: 9, letterSpacing: 3, color: '#282420',
    textAlign: 'center', marginTop: 24, fontWeight: 700,
    position: 'relative', zIndex: 2,
  },
  bottomTag: {
    position: 'absolute', bottom: 28, left: 0, right: 0,
    display: 'flex', alignItems: 'center', padding: '0 32px', gap: 12,
  },
  tagLine: { flex: 1, height: 1, background: '#1C1814' },
  tagText: { fontSize: 9, letterSpacing: 3, color: '#2A2420', fontWeight: 700, whiteSpace: 'nowrap' },
}
