import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ANCHOR, TOTAL_MS } from '../App'
import LiveCountdown from './LiveCountdown'
import EventRow from './EventRow'
import { DAYS } from '../data/events'

function useElapsed() {
  const [elapsed, setElapsed] = useState(() => Date.now() - ANCHOR.getTime())
  useEffect(() => {
    const t = setInterval(() => setElapsed(Date.now() - ANCHOR.getTime()), 1000)
    return () => clearInterval(t)
  }, [])
  return elapsed
}

function isUnlocked(tMinus, elapsedMs) {
  const elapsedH = elapsedMs / (60 * 60 * 1000)
  return elapsedH >= (48 - tMinus)
}

// Mountain silhouette SVG background
function MountainSilhouette() {
  return (
    <svg
      viewBox="0 0 480 90"
      preserveAspectRatio="none"
      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: 90, pointerEvents: 'none' }}
    >
      {/* far ridge */}
      <path d="M0,72 L60,48 L110,60 L170,30 L230,52 L280,22 L340,46 L390,28 L440,54 L480,38 L480,90 L0,90 Z" fill="#1A1410" />
      {/* near ridge */}
      <path d="M0,82 L40,62 L90,74 L150,44 L210,66 L260,36 L310,58 L370,40 L430,62 L480,50 L480,90 L0,90 Z" fill="#141008" />
      {/* contour lines */}
      <path d="M0,76 L60,54 L110,65 L170,36 L230,57 L280,28 L340,51 L390,34 L440,58 L480,44" fill="none" stroke="#2A2218" strokeWidth="0.5" />
      <path d="M0,80 L40,66 L90,77 L150,50 L210,70 L260,42 L310,63 L370,46 L430,67 L480,55" fill="none" stroke="#221E14" strokeWidth="0.5" />
    </svg>
  )
}

// Topographic contour decoration
function ContourDeco() {
  return (
    <svg viewBox="0 0 120 80" style={{ position: 'absolute', right: 24, top: 20, width: 120, height: 80, opacity: 0.12, pointerEvents: 'none' }}>
      <ellipse cx="60" cy="40" rx="55" ry="34" fill="none" stroke="#E85F1E" strokeWidth="0.8" />
      <ellipse cx="60" cy="40" rx="42" ry="25" fill="none" stroke="#E85F1E" strokeWidth="0.8" />
      <ellipse cx="60" cy="40" rx="29" ry="17" fill="none" stroke="#E85F1E" strokeWidth="0.8" />
      <ellipse cx="60" cy="40" rx="17" ry="10" fill="none" stroke="#E85F1E" strokeWidth="0.8" />
      <ellipse cx="60" cy="40" rx="7" ry="4" fill="none" stroke="#E85F1E" strokeWidth="0.8" />
    </svg>
  )
}

export default function Poster({ phase }) {
  const elapsed = useElapsed()
  const prevUnlocked = useRef({})
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  useEffect(() => {
    if (phase !== 'running') return
    DAYS.forEach(day => day.events.forEach(ev => {
      const key = `${ev.tMinus}`
      const unlocked = isUnlocked(ev.tMinus, elapsed)
      if (unlocked && !prevUnlocked.current[key]) {
        prevUnlocked.current[key] = true
        if (Object.keys(prevUnlocked.current).length > 1) {
          clearTimeout(toastTimer.current)
          setToast(ev.nameLines.join(' · '))
          toastTimer.current = setTimeout(() => setToast(null), 3500)
        }
      }
    }))
  }, [elapsed, phase])

  const bannerAccent = { orange: '#E85F1E', blue: '#5B9FA8', default: '#B2CB12' }

  return (
    <div style={styles.poster}>
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={styles.toast}
          >
            ◆ 已解锁 · {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live countdown bar */}
      {phase === 'running' && <LiveCountdown />}

      {/* Header */}
      <div style={styles.header}>
        <MountainSilhouette />
        <ContourDeco />

        {/* Background stroke number */}
        <div style={styles.bgStroke}>48</div>

        <div style={styles.headerTag}>
          <span style={styles.tagDot} />
          MISSION / 莫干山 · 2026
          <span style={styles.tagDot} />
        </div>

        <div style={styles.bigNum}>
          48<span style={styles.unit}>HRS</span>
        </div>

        <div style={styles.titleCn}>倒计时城市落跑计划</div>
        <div style={styles.subtitle}>48-HOUR COUNTDOWN URBAN RUNNING PLAN</div>

        {/* Elevation marker */}
        <div style={styles.elevRow}>
          <div style={styles.elevItem}>
            <span style={styles.elevLabel}>ELEV.</span>
            <span style={styles.elevVal}>1,380M</span>
          </div>
          <div style={styles.elevDivider} />
          <div style={styles.elevItem}>
            <span style={styles.elevLabel}>DIST.</span>
            <span style={styles.elevVal}>48KM+</span>
          </div>
          <div style={styles.elevDivider} />
          <div style={styles.elevItem}>
            <span style={styles.elevLabel}>TERRAIN</span>
            <span style={styles.elevVal}>TRAIL</span>
          </div>
        </div>

        <div style={styles.orgs}>
          {['莫干山户外运动协会', '山野梦想家', 'DEEPBEAT 记路家'].map(o => (
            <span key={o} style={styles.orgTag}>{o}</span>
          ))}
        </div>
      </div>

      {/* Accent bar */}
      <div style={styles.accentBar}>
        <div style={{ flex: 4, height: '100%', background: '#E85F1E' }} />
        <div style={{ flex: 1, height: '100%', background: '#B2CB12', marginLeft: 3 }} />
        <div style={{ flex: 2, height: '100%', background: '#2E3A28', marginLeft: 3 }} />
        <div style={{ flex: 5, height: '100%', background: '#1C1814', marginLeft: 3 }} />
      </div>

      {/* Pre-event */}
      <div style={styles.preEvent}>
        <div style={styles.preIconWrap}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#3A3530" strokeWidth="1"/>
            <path d="M7 3V7L9.5 9" stroke="#E85F1E" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={styles.preLabel}>PRE-START</span>
        <span style={styles.preSep}>—</span>
        <span style={styles.preName}>D1 上午 · 接机</span>
      </div>

      {/* Timeline */}
      <div>
        {DAYS.map(day => {
          const col = bannerAccent[day.banner?.color] || bannerAccent.default
          const dayAccent = day.accentClass === 'day3' ? '#B2CB12'
            : day.accentClass === 'day4' ? '#E85F1E' : '#5B9FA8'
          return (
            <div key={day.id} style={{ borderBottom: '1px solid #1C1814' }}>
              {/* Day label */}
              <div style={{ ...styles.dayLabel, borderLeftColor: dayAccent }}>
                <span style={styles.dayLabelText}>{day.label}</span>
                <div style={{ ...styles.dayLabelLine, background: dayAccent }} />
              </div>

              {/* Day banner */}
              <div style={styles.dayBanner}>
                <div style={styles.dcbLayout}>
                  <div>
                    <div style={styles.dcbPre}>距离倒计时结束</div>
                    <div style={styles.dcbMain}>
                      <span style={{ ...styles.dcbNum, color: col }}>{day.banner.num}</span>
                      <span style={styles.dcbUnit}>小时</span>
                    </div>
                  </div>
                  <div style={styles.dcbRight}>
                    <div style={styles.dcbSub}>{day.banner.sub}</div>
                    <div style={{ ...styles.dcbAccentBar, background: col }} />
                  </div>
                </div>
              </div>

              {/* Events */}
              {day.events.map(ev => (
                <EventRow
                  key={ev.tMinus}
                  event={ev}
                  unlocked={phase === 'running' ? isUnlocked(ev.tMinus, elapsed) : false}
                  highlight={ev.highlight}
                />
              ))}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <div style={styles.footerLeft}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L14 8H16L10 18L4 8H6L10 2Z" fill="none" stroke="#3A3530" strokeWidth="1" strokeLinejoin="round"/>
            <path d="M10 6L12 9H10L8 9L10 6Z" fill="#E85F1E" opacity="0.6"/>
          </svg>
          <span style={styles.footerBrand}>MOGANSHAN</span>
        </div>
        <div style={styles.footerLine} />
        <span style={styles.footerRight}>OUTDOOR · TRAIL · RUN</span>
      </div>
    </div>
  )
}

const C = {
  bg: '#0C0A08',
  bgMid: '#141008',
  bgLight: '#1C1814',
  border: '#2A2420',
  orange: '#E85F1E',
  lime: '#B2CB12',
  teal: '#5B9FA8',
  white: '#F0E8DC',
  stone: '#8A7E6E',
  dim: '#4A4438',
  forest: '#2E3A28',
}

const styles = {
  poster: {
    background: C.bg,
    color: C.white,
    fontFamily: "'Barlow Condensed', 'Noto Sans SC', sans-serif",
    width: 480,
    overflow: 'hidden',
    border: `1px solid ${C.border}`,
    position: 'relative',
  },
  toast: {
    position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)',
    background: C.orange, color: '#fff',
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 13, fontWeight: 700, letterSpacing: 3,
    padding: '10px 24px', zIndex: 999, whiteSpace: 'nowrap',
    clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
  },
  header: {
    background: `linear-gradient(175deg, #120E08 0%, #0C0A06 60%, #0A0806 100%)`,
    padding: '36px 28px 28px',
    borderBottom: `2px solid ${C.orange}`,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 220,
  },
  bgStroke: {
    position: 'absolute', right: -16, top: -10,
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 220,
    color: 'transparent', WebkitTextStroke: '1px #1E1A14',
    lineHeight: 1, zIndex: 1, pointerEvents: 'none', userSelect: 'none',
  },
  headerTag: {
    fontSize: 10, letterSpacing: 5, color: C.stone,
    marginBottom: 18, fontWeight: 700, position: 'relative', zIndex: 2,
    display: 'flex', alignItems: 'center', gap: 10,
  },
  tagDot: {
    display: 'inline-block', width: 4, height: 4,
    background: C.orange, borderRadius: '50%', flexShrink: 0,
  },
  bigNum: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 118,
    lineHeight: 0.85, color: C.white, letterSpacing: -2,
    display: 'block', position: 'relative', zIndex: 2,
  },
  unit: { fontSize: 44, letterSpacing: 6, verticalAlign: 'middle', color: C.orange },
  titleCn: {
    fontFamily: "'Noto Sans SC', sans-serif", fontSize: 28, fontWeight: 900,
    color: C.white, letterSpacing: 5, marginTop: 10, marginBottom: 4,
    lineHeight: 1.2, position: 'relative', zIndex: 2,
  },
  subtitle: {
    fontSize: 10, letterSpacing: 3, color: C.dim, fontWeight: 700, marginBottom: 20,
    position: 'relative', zIndex: 2,
  },
  elevRow: {
    display: 'flex', alignItems: 'center', gap: 0,
    marginBottom: 20, position: 'relative', zIndex: 2,
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${C.border}`,
    padding: '8px 0',
    width: 'fit-content',
  },
  elevItem: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '0 16px', gap: 2,
  },
  elevLabel: { fontSize: 8, letterSpacing: 3, color: C.dim, fontWeight: 700 },
  elevVal: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 18, letterSpacing: 2, color: C.white,
  },
  elevDivider: { width: 1, height: 28, background: C.border },
  orgs: { display: 'flex', gap: 6, flexWrap: 'wrap', position: 'relative', zIndex: 2 },
  orgTag: {
    fontSize: 10, letterSpacing: 1.5, color: C.stone,
    background: 'transparent',
    border: `1px solid ${C.border}`,
    padding: '3px 10px', fontWeight: 600,
    clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)',
  },
  accentBar: {
    display: 'flex', height: 5,
    background: C.bgLight,
  },
  preEvent: {
    display: 'flex', alignItems: 'center', padding: '12px 28px', gap: 10,
    background: C.bgMid, borderBottom: `1px solid ${C.border}`,
  },
  preIconWrap: { display: 'flex', alignItems: 'center' },
  preLabel: { fontSize: 9, letterSpacing: 3, color: C.dim, fontWeight: 700 },
  preSep: { color: C.border, fontSize: 12 },
  preName: {
    fontFamily: "'Noto Sans SC', sans-serif",
    fontSize: 13, color: C.stone,
  },
  dayLabel: {
    background: C.bgMid, padding: '9px 28px',
    display: 'flex', alignItems: 'center', gap: 12,
    borderLeft: '3px solid',
  },
  dayLabelText: { fontSize: 10, letterSpacing: 4, color: C.dim, fontWeight: 700 },
  dayLabelLine: { flex: 1, height: 1, opacity: 0.3 },
  dayBanner: {
    padding: '18px 28px 14px',
    borderBottom: `1px solid ${C.border}`,
    background: `linear-gradient(90deg, rgba(28,24,20,0.8) 0%, transparent 100%)`,
  },
  dcbLayout: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' },
  dcbPre: {
    fontFamily: "'Noto Sans SC', sans-serif",
    fontSize: 11, fontWeight: 700, color: C.dim, letterSpacing: 2,
    lineHeight: 1, marginBottom: 2,
  },
  dcbMain: { display: 'flex', alignItems: 'baseline', gap: 4, lineHeight: 1 },
  dcbNum: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 68, lineHeight: 0.9, letterSpacing: -1,
  },
  dcbUnit: {
    fontFamily: "'Noto Sans SC', sans-serif", fontSize: 18, fontWeight: 900,
    letterSpacing: 2, marginLeft: 2, color: C.white,
  },
  dcbRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, paddingBottom: 6 },
  dcbSub: {
    fontSize: 9, letterSpacing: 3, color: C.dim, fontWeight: 700,
    textAlign: 'right',
  },
  dcbAccentBar: { width: 32, height: 2 },
  footer: {
    background: C.bgMid, padding: '14px 28px',
    borderTop: `1px solid ${C.border}`,
    display: 'flex', alignItems: 'center', gap: 12,
  },
  footerLeft: { display: 'flex', alignItems: 'center', gap: 8 },
  footerBrand: { fontSize: 9, letterSpacing: 4, color: C.dim, fontWeight: 700 },
  footerLine: { flex: 1, height: 1, background: C.border },
  footerRight: { fontSize: 9, letterSpacing: 3, color: C.dim, fontWeight: 700 },
}
