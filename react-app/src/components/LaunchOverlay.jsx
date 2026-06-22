import { useState } from 'react'
import { motion } from 'framer-motion'

function MountainDecoBg() {
  return (
    <svg
      viewBox="0 0 480 200"
      preserveAspectRatio="xMidYMax meet"
      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: 200, pointerEvents: 'none', opacity: 0.35 }}
    >
      <path d="M0,140 L80,80 L140,110 L200,50 L270,90 L320,40 L390,85 L440,60 L480,80 L480,200 L0,200 Z" fill="#1A1410" />
      <path d="M0,160 L60,118 L120,135 L180,88 L250,120 L300,72 L370,108 L430,88 L480,100 L480,200 L0,200 Z" fill="#120E08" />
      <path d="M0,140 L80,80 L140,110 L200,50 L270,90 L320,40 L390,85 L440,60 L480,80" fill="none" stroke="#2A2218" strokeWidth="0.6" />
    </svg>
  )
}

export default function LaunchOverlay({ onLaunch }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.5 } }}
      style={styles.overlay}
    >
      <MountainDecoBg />

      {/* contour rings decoration */}
      <div style={styles.contourWrap}>
        {[80, 60, 42, 26, 13].map((r, i) => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: r * 2, height: r * 2,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: '1px solid rgba(232,95,30,0.08)',
          }} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={styles.label}
      >
        <span style={styles.labelDot} />
        MISSION READY · 任务就绪
        <span style={styles.labelDot} />
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        style={styles.title}
      >
        48小时<span style={{ color: '#E85F1E' }}>倒计时</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        style={styles.sub}
      >
        山野召唤 · 逃离城市 · 48小时极限体验
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={styles.divider}
      />

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.97 }}
        onClick={onLaunch}
        style={{
          ...styles.btn,
          background: hovered ? '#E85F1E' : 'transparent',
          color: hovered ? '#fff' : '#E85F1E',
          borderColor: '#E85F1E',
        }}
      >
        ▶ 启动倒计时
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={styles.hint}
      >
        MOGANSHAN · OUTDOOR · TRAIL · RUN
      </motion.p>
    </motion.div>
  )
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 200,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: 'linear-gradient(170deg, #0E0B08 0%, #0C0906 100%)',
    gap: 18, padding: 40, paddingBottom: '18vh',
    overflow: 'hidden',
  },
  contourWrap: {
    position: 'absolute', top: '38%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 160, height: 160,
    pointerEvents: 'none',
  },
  label: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 10, letterSpacing: 5, color: '#8A7E6E',
    fontWeight: 700, textAlign: 'center',
    display: 'flex', alignItems: 'center', gap: 10,
    position: 'relative', zIndex: 2,
  },
  labelDot: {
    display: 'inline-block', width: 4, height: 4,
    background: '#E85F1E', borderRadius: '50%',
  },
  title: {
    fontFamily: "'Noto Sans SC', sans-serif",
    fontSize: 46, fontWeight: 900, color: '#F0E8DC',
    letterSpacing: 6, lineHeight: 1.15,
    textAlign: 'center', whiteSpace: 'nowrap',
    position: 'relative', zIndex: 2,
  },
  sub: {
    fontFamily: "'Noto Sans SC', sans-serif",
    fontSize: 12, color: '#4A4438', letterSpacing: 3,
    textAlign: 'center', position: 'relative', zIndex: 2,
  },
  divider: {
    width: 48, height: 2, background: '#E85F1E',
    transformOrigin: 'center',
    position: 'relative', zIndex: 2,
  },
  btn: {
    marginTop: 8,
    border: '1px solid',
    cursor: 'pointer',
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 18, letterSpacing: 8,
    whiteSpace: 'nowrap',
    padding: '16px 56px',
    transition: 'background 0.2s ease, color 0.2s ease',
    outline: 'none',
    clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
    position: 'relative', zIndex: 2,
  },
  hint: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 9, letterSpacing: 4, color: '#2A2420',
    fontWeight: 700, textAlign: 'center',
    position: 'relative', zIndex: 2,
  },
}
