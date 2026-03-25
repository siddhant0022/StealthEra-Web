/**
 * SeniorsSection.jsx — FINAL v2
 *
 * MOBILE FIX:
 *   The core problem was the section had minHeight:100vh, so all 4 blocks
 *   had to fight over a single viewport of scroll distance.
 *   Block 1 appeared and vanished before the user could read it.
 *
 *   Solution: On mobile the outer section is 500vh tall.
 *   The wheel + text panel uses position:sticky so it stays centered
 *   on screen while the user scrolls through all 4 blocks at a
 *   comfortable reading pace (~1 screen per block).
 *
 *   useScroll tracks the OUTER section (500vh), so progress 0→1
 *   covers 4 full viewports. Each block owns 0.25 of that range.
 *
 * DESKTOP: unchanged — right-half wheel, all rows visible, grows on active.
 *
 * npm install framer-motion
 */

import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════════ */
const IconPeople = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconBrain = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.98-3 2.5 2.5 0 0 1-1.32-4.24A3 3 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.98-3 2.5 2.5 0 0 0 1.32-4.24A3 3 0 0 0 14.5 2Z"/>
  </svg>
);
const IconWalk = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="3.5" r="1.5" fill="currentColor" stroke="none"/>
    <path d="M9 7.5l-2 5h4l-1 6"/>
    <path d="M9 7.5l3 1 2-2"/>
    <path d="M13 8.5l2 4.5"/>
  </svg>
);
const IconClock = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
const ICONS = [IconPeople, IconBrain, IconWalk, IconClock];

/* ═══════════════════════════════════════════════════════════
   CONTENT
   ═══════════════════════════════════════════════════════════ */
const BLOCKS = [
  {
    stat: "60%",
    text: "of senior populations now live in nuclear family structures with limited daily oversight.",
    emphasis: null,
  },
  {
    stat: null,
    text: "1 in 3 seniors experience cognitive decline that goes undetected in early, treatable stages.",
    emphasis: null,
    indent: true,
  },
  {
    stat: null,
    text: "Unnoticed falls are the leading cause of hospitalizations delayed response",
    emphasis: "increases risk by 80%.",
    indent: true,
  },
  {
    stat: null,
    text: "Manual check-ins only capture a moment. Emergencies happen in the silent gaps between calls.",
    emphasis: null,
  },
];

// Each block owns an equal slice of scroll progress
// Block i is active when progress ∈ [i/4, (i+1)/4]
const BLOCK_RANGES = BLOCKS.map((_, i) => [i / BLOCKS.length, (i + 1) / BLOCKS.length]);

/* ═══════════════════════════════════════════════════════════
   DESKTOP GEOMETRY — right-half wheel
   ═══════════════════════════════════════════════════════════ */
const D_R       = 230;
const D_INSET   = 90;
const D_WRAP_W  = D_INSET + D_R;
const D_ICON_R  = D_R * 0.88;
// Icons spread -62° to +62° (0°=right/3-o'clock, CW positive)
const D_ICON_ANGLES    = BLOCKS.map((_, i) => -62 + (i / (BLOCKS.length - 1)) * 124);
const D_ROTATION_STOPS = D_ICON_ANGLES.map(a => -a); // bring icon[i] to 3-o'clock

/* ═══════════════════════════════════════════════════════════
   MOBILE GEOMETRY — full circle, icons at 90° intervals
   Active icon passes 6-o'clock (bottom)
   ═══════════════════════════════════════════════════════════ */
const M_R            = 130;
const M_ICON_R       = M_R * 0.85;
const M_BASE_ANGLES  = [0, 90, 180, 270]; // icon starting angles (0=right, CW)
// Rotation to bring icon[i] to 6-o'clock (90°): rotate by (90 - base)
const M_ROTATION_STOPS = M_BASE_ANGLES.map(a => 90 - a); // [90, 0, -90, -180]

/* ═══════════════════════════════════════════════════════════
   RINGS (shared)
   ═══════════════════════════════════════════════════════════ */
const RINGS = [
  { frac: 1.00, alpha: 0.09 },
  { frac: 0.80, alpha: 0.17 },
  { frac: 0.60, alpha: 0.32 },
  { frac: 0.40, alpha: 0.58 },
  { frac: 0.22, alpha: 0.90 },
];

/* ═══════════════════════════════════════════════════════════
   DESKTOP WHEEL
   ═══════════════════════════════════════════════════════════ */
function DesktopWheel({ rotation, counterRotation, activeIndex }) {
  const CD = D_R * 2;
  return (
    <div style={{ position: "relative", width: D_WRAP_W, height: CD, flexShrink: 0, overflow: "hidden" }}>
      <motion.div style={{
        position: "absolute", left: D_INSET - D_R, top: 0,
        width: CD, height: CD,
        transformOrigin: "center center",
        rotate: rotation, willChange: "transform",
      }}>
        {RINGS.map((ring, i) => (
          <div key={i} style={{
            position: "absolute",
            width: D_R * ring.frac * 2, height: D_R * ring.frac * 2,
            borderRadius: "50%", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            background: `radial-gradient(circle at center,
              rgba(111,190,41,${ring.alpha}) 0%,
              rgba(55,110,15,${ring.alpha * 0.5}) 52%,
              transparent 100%)`,
          }}/>
        ))}
        <div style={{
          position: "absolute", width: 50, height: 50, borderRadius: "50%",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(220,245,180,0.95) 0%, rgba(111,190,41,0.3) 60%, transparent 100%)",
          boxShadow: "0 0 24px 10px rgba(111,190,41,0.4)",
        }}/>
        {BLOCKS.map((_, i) => {
          const rad = (D_ICON_ANGLES[i] * Math.PI) / 180;
          const lx  = D_R + D_ICON_R * Math.cos(rad) - 12;
          const ly  = D_R + D_ICON_R * Math.sin(rad) - 12;
          const Icon = ICONS[i];
          const isActive = activeIndex === i;
          return (
            <motion.div key={i}
              style={{ position: "absolute", left: lx, top: ly, width: 24, height: 24,
                display: "flex", alignItems: "center", justifyContent: "center",
                rotate: counterRotation }}
              animate={{
                color: isActive ? "rgba(220,245,180,1)" : "rgba(160,210,100,0.4)",
                filter: isActive ? "drop-shadow(0 0 7px rgba(160,210,100,1))" : "none",
              }}
              transition={{ duration: 0.3 }}
            >
              <Icon size={16}/>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESKTOP TEXT ROWS
   ═══════════════════════════════════════════════════════════ */
function DesktopTextRows({ activeIndex }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {BLOCKS.map((block, i) => {
        const isActive = activeIndex === i;
        const isPast   = i < activeIndex;
        const Icon     = ICONS[i];
        return (
          <motion.div key={i}
            animate={{ opacity: isActive ? 1 : isPast ? 0.35 : 0.2 }}
            transition={{ duration: 0.35 }}
            style={{ display: "flex", alignItems: "flex-start", gap: 14 }}
          >
            <motion.div
              animate={{
                background: isActive ? "rgba(111,190,41,0.18)" : "rgba(111,190,41,0.05)",
                borderColor: isActive ? "rgba(111,190,41,0.55)" : "rgba(111,190,41,0.15)",
                color: isActive ? "rgba(220,245,180,1)" : "rgba(160,210,100,0.38)",
                boxShadow: isActive ? "0 0 10px 2px rgba(111,190,41,0.22)" : "none",
              }}
              transition={{ duration: 0.35 }}
              style={{
                flexShrink: 0, marginTop: 3, width: 32, height: 32, borderRadius: "50%",
                border: "1px solid", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Icon size={15}/>
            </motion.div>
            <div style={{ paddingTop: 2 }}>
              {block.stat && (
                <motion.span
                  animate={{ fontSize: isActive ? "52px" : "32px", color: isActive ? "#fff" : "rgba(255,255,255,0.45)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontWeight: 800, lineHeight: 1, display: "inline", marginRight: 8, verticalAlign: "middle" }}
                >{block.stat}</motion.span>
              )}
              <motion.span
                animate={{ fontSize: isActive ? "19px" : "16px", color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontWeight: 300, lineHeight: 1.68, verticalAlign: block.stat ? "middle" : "unset" }}
              >{block.text}</motion.span>
              {block.emphasis && (
                <> {" "}
                  <motion.span
                    animate={{ fontSize: isActive ? "25px" : "18px", color: isActive ? "#fff" : "rgba(255,255,255,0.5)" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontWeight: 700, lineHeight: 1.4 }}
                  >{block.emphasis}</motion.span>
                </>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MOBILE WHEEL
   ═══════════════════════════════════════════════════════════ */
function MobileWheel({ rotation, counterRotation, activeIndex }) {
  const MD = M_R * 2;
  return (
    <div style={{ position: "relative", width: MD, height: MD, margin: "0 auto", flexShrink: 0 }}>
      <motion.div style={{
        position: "absolute", inset: 0,
        transformOrigin: "center center",
        rotate: rotation, willChange: "transform",
      }}>
        {RINGS.map((ring, i) => (
          <div key={i} style={{
            position: "absolute",
            width: M_R * ring.frac * 2, height: M_R * ring.frac * 2,
            borderRadius: "50%", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            background: `radial-gradient(circle at center,
              rgba(111,190,41,${ring.alpha}) 0%,
              rgba(55,110,15,${ring.alpha * 0.5}) 52%,
              transparent 100%)`,
          }}/>
        ))}
        <div style={{
          position: "absolute", width: 36, height: 36, borderRadius: "50%",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(220,245,180,0.95) 0%, rgba(111,190,41,0.3) 60%, transparent 100%)",
          boxShadow: "0 0 18px 8px rgba(111,190,41,0.4)",
        }}/>
        {BLOCKS.map((_, i) => {
          const rad = (M_BASE_ANGLES[i] * Math.PI) / 180;
          const lx  = M_R + M_ICON_R * Math.cos(rad) - 12;
          const ly  = M_R + M_ICON_R * Math.sin(rad) - 12;
          const Icon = ICONS[i];
          const isActive = activeIndex === i;
          return (
            <motion.div key={i}
              style={{ position: "absolute", left: lx, top: ly, width: 24, height: 24,
                display: "flex", alignItems: "center", justifyContent: "center",
                rotate: counterRotation }}
              animate={{
                color: isActive ? "rgba(220,245,180,1)" : "rgba(160,210,100,0.45)",
                filter: isActive ? "drop-shadow(0 0 7px rgba(160,210,100,1))" : "none",
                scale: isActive ? 1.2 : 1,
              }}
              transition={{ duration: 0.35 }}
            >
              <Icon size={16}/>
            </motion.div>
          );
        })}
      </motion.div>
      {/* 6-o'clock activation dot */}
      <div style={{
        position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
        width: 6, height: 6, borderRadius: "50%",
        background: "rgba(111,190,41,0.8)",
        boxShadow: "0 0 6px rgba(111,190,41,0.9)",
      }}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MOBILE TEXT — one block at a time, large and readable
   ═══════════════════════════════════════════════════════════ */
function MobileText({ activeIndex }) {
  const block = BLOCKS[activeIndex];
  const Icon  = ICONS[activeIndex];
  return (
    <div style={{ textAlign: "center", padding: "0 20px", minHeight: 160 }}>
      <AnimatePresence mode="wait">
        <motion.div key={activeIndex}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Icon badge centered above text */}
          <div style={{
            display: "flex", justifyContent: "center", marginBottom: 16,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(111,190,41,0.18)",
              border: "1px solid rgba(111,190,41,0.55)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(220,245,180,1)",
              boxShadow: "0 0 12px 2px rgba(111,190,41,0.25)",
            }}>
              <Icon size={18}/>
            </div>
          </div>

          {/* Stat number */}
          {block.stat && (
            <div style={{ marginBottom: 8, lineHeight: 1 }}>
              <span style={{ fontSize: 52, fontWeight: 800, color: "#fff" }}>
                {block.stat}
              </span>
            </div>
          )}

          {/* Body text — larger, readable */}
          <p style={{
            margin: 0,
            fontSize: 16,
            color: "rgba(255,255,255,0.88)",
            fontWeight: 300,
            lineHeight: 1.7,
          }}>
            {block.text}
            {block.emphasis && (
              <>
                {" "}
                <span style={{ fontWeight: 700, color: "#fff", fontSize: 19 }}>
                  {block.emphasis}
                </span>
              </>
            )}
          </p>

          {/* Progress dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 24 }}>
            {BLOCKS.map((_, i) => (
              <div key={i} style={{
                height: 6,
                width: i === activeIndex ? 20 : 6,
                borderRadius: 3,
                background: i === activeIndex ? "rgba(111,190,41,0.9)" : "rgba(255,255,255,0.2)",
                transition: "all 0.38s ease",
              }}/>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ORIGINAL DESKTOP SCROLL RANGES (restored exactly)
   ═══════════════════════════════════════════════════════════ */
const DESKTOP_RANGES = [
  [0.05, 0.28],
  [0.28, 0.48],
  [0.48, 0.68],
  [0.68, 0.90],
];

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function SeniorsSection() {
  const outerRef   = useRef(null); // mobile: tall 500vh container
  const desktopRef = useRef(null); // desktop: original section ref
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile]       = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── DESKTOP scroll — original working behavior ── */
  const { scrollYProgress: dProgress } = useScroll({
    target: desktopRef,
    offset: ["start 80%", "end 20%"],
  });

  useMotionValueEvent(dProgress, "change", (v) => {
    if (isMobile) return;
    let found = 0;
    for (let i = DESKTOP_RANGES.length - 1; i >= 0; i--) {
      if (v >= DESKTOP_RANGES[i][0]) { found = i; break; }
    }
    setActiveIndex(found);
  });

  const dScrollKeys    = [0, ...DESKTOP_RANGES.map(r => r[0])];
  const dRotationKeys  = [D_ROTATION_STOPS[0], ...D_ROTATION_STOPS];
  const dWheelRotation = useTransform(dProgress, dScrollKeys, dRotationKeys);
  const dCounterRot    = useTransform(dProgress, dScrollKeys, dRotationKeys.map(r => -r));

  /* ── MOBILE scroll — 500vh sticky, each block gets ~1 viewport ── */
  const { scrollYProgress: mProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(mProgress, "change", (v) => {
    if (!isMobile) return;
    const mobileLead = 0.2;
    const idx = Math.min(
      Math.floor(v * BLOCKS.length + mobileLead),
      BLOCKS.length - 1
    );
    setActiveIndex(idx);
  });

  const mScrollKeys    = BLOCKS.map((_, i) => i / BLOCKS.length);
  const mRotationKeys  = M_ROTATION_STOPS;
  const mWheelRotation = useTransform(mProgress, mScrollKeys, mRotationKeys);
  const mCounterRot    = useTransform(mProgress, mScrollKeys, mRotationKeys.map(r => -r));

  return (
    <div
      ref={isMobile ? outerRef : desktopRef}
      style={{
        background: "#050505",
        minHeight: isMobile ? "640vh" : "100vh",
        position: "relative",
        fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif",
      }}
    >
      <div style={{
        position: isMobile ? "sticky" : "relative",
        top: 0,
        height: isMobile ? "100svh" : "auto",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        padding: isMobile ? "20px 0" : "72px 0",
      }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: isMobile
            ? "radial-gradient(ellipse at 50% 35%, rgba(70,130,20,0.22) 0%, transparent 55%)"
            : "radial-gradient(ellipse at 8% 55%, rgba(70,130,20,0.20) 0%, transparent 45%)",
        }}/>

        <div style={{
          position: "relative", zIndex: 10,
          width: "100%", maxWidth: 1060,
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 48px)",
        }}>

          {/* HEADING */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: isMobile ? "clamp(18px, 5vw, 24px)" : "clamp(20px, 2.6vw, 34px)",
              lineHeight: 1.28,
              letterSpacing: "-0.02em",
              marginBottom: isMobile ? 18 : "clamp(32px, 5vw, 52px)",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Families are changing. Seniors are increasingly living alone.
          </motion.h2>

          {/* ── DESKTOP — original flex row layout ── */}
          {!isMobile && (
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0 }}>
              <div
                style={{
                  marginLeft: "calc((100vw - min(1060px, 100vw)) / -2 - clamp(16px, 4vw, 48px))",
                }}
              >
                <DesktopWheel
                  rotation={dWheelRotation}
                  counterRotation={dCounterRot}
                  activeIndex={activeIndex}
                />
              </div>
              <div style={{ flex: 1, paddingLeft: "clamp(20px, 4vw, 56px)" }}>
                <DesktopTextRows activeIndex={activeIndex} />
              </div>
            </div>
          )}

          {/* ── MOBILE ── */}
          {isMobile && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
              <MobileWheel
                rotation={mWheelRotation}
                counterRotation={mCounterRot}
                activeIndex={activeIndex}
              />
              <MobileText activeIndex={activeIndex} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/*
 * ── USAGE ────────────────────────────────────────────────────────
 *
 *  App.jsx:
 *    import SeniorsSection from "./SeniorsSection";
 *    export default function App() {
 *      return (
 *        <main style={{ background: "#050505" }}>
 *          <div style={{ height: "100vh" }} />
 *          <SeniorsSection />
 *          <div style={{ height: "100vh" }} />
 *        </main>
 *      );
 *    }
 *
 *  npm install framer-motion
 *
 *  index.html <head>:
 *    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;700;800&display=swap" rel="stylesheet">
 *
 * ─────────────────────────────────────────────────────────────────
 */
