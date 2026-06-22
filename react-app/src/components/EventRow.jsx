import { motion } from 'framer-motion'

export default function EventRow({ event, unlocked, highlight }) {
  const { tMinus, accentColor, countColor, phase, name, time, nameLines } = event

  const pad2 = n => String(n).padStart(2, '0')
  const hh = Math.floor(tMinus)
  const mm = tMinus % 1 === 0 ? '00' : '30'
  const label = `${pad2(hh)}:${mm}`

  // Remap old yellow-green accent colors to new palette
  const remapColor = (c) => {
    if (!c) return '#3A3530'
    if (c === '#E8FF00') return '#B2CB12'
    if (c === '#FF4D1C') return '#E85F1E'
    if (c === '#00C4FF') return '#5B9FA8'
    return c
  }
  const mappedAccent = remapColor(accentColor)
  const mappedCount = remapColor(countColor)

  const hlBg = highlight === 'yellow' ? 'rgba(178,203,18,0.04)'
    : highlight === 'blue' ? 'rgba(91,159,168,0.04)'
    : 'transparent'

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: unlocked ? 1 : 0.12,
        filter: unlocked ? 'blur(0px)' : 'blur(2.5px)',
      }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        ...styles.row,
        background: hlBg,
        position: 'relative',
        borderBottom: '1px solid #1C1814',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {/* unlock flash */}
      {unlocked && (
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{ position: 'absolute', inset: 0, background: 'rgba(232,95,30,0.08)', pointerEvents: 'none' }}
        />
      )}

      {/* left accent bar */}
      <div style={{ width: 3, background: mappedAccent, flexShrink: 0 }} />

      <div style={styles.countdownCol}>
        <div style={styles.countLabel}>T-MINUS</div>
        <div style={{ ...styles.countValue, color: mappedCount }}>{label}</div>
      </div>

      <div style={styles.divider} />

      <div style={styles.eventCol}>
        <div style={styles.eventPhase}>{phase}</div>
        <div style={styles.eventName}>
          {nameLines.map((line, i) => <span key={i}>{line}{i < nameLines.length - 1 && <br />}</span>)}
        </div>
        <div style={styles.eventTime}>{time}</div>
      </div>

      {/* subtle right-side terrain mark */}
      <div style={styles.terrainMark}>
        <div style={{ width: 12, height: 1, background: '#2A2420' }} />
        <div style={{ width: 8, height: 1, background: '#2A2420', marginTop: 3 }} />
        <div style={{ width: 5, height: 1, background: '#2A2420', marginTop: 3 }} />
      </div>
    </motion.div>
  )
}

const styles = {
  row: {},
  countdownCol: {
    width: 96, minWidth: 96,
    padding: '14px 10px 14px 24px',
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
  },
  countLabel: { fontSize: 8, letterSpacing: 2, color: '#4A4438', marginBottom: 2, fontWeight: 700 },
  countValue: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 28, lineHeight: 1, letterSpacing: 1,
  },
  divider: { width: 1, background: '#2A2420', margin: '10px 0' },
  eventCol: {
    flex: 1, padding: '14px 20px 14px 18px',
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
  },
  eventPhase: { fontSize: 8, letterSpacing: 3, color: '#4A4438', marginBottom: 3, fontWeight: 700 },
  eventName: {
    fontFamily: "'Noto Sans SC', sans-serif",
    fontSize: 14, fontWeight: 700, color: '#F0E8DC',
    lineHeight: 1.35, marginBottom: 4,
  },
  eventTime: { fontSize: 10, color: '#5A5040', letterSpacing: 1 },
  terrainMark: {
    display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
    justifyContent: 'center', padding: '0 14px 0 0',
    opacity: 0.5,
  },
}
