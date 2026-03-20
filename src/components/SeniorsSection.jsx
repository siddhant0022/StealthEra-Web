/**
 * SeniorsSection.jsx — FINAL RESPONSIVE
 *
 * DESKTOP (>768px):
 *   - Right half of circle visible on left side
 *   - All 4 text rows always visible, stacked right
 *   - Scroll → wheel rotates CW/CCW, active icon glows + text grows
 *   - Icons on right arc edge, each level with its text row
 *
 * MOBILE (≤768px):
 *   - Full circle wheel centered at top
 *   - Icons orbit around the wheel
 *   - As user scrolls, wheel rotates so each icon passes through
 *     the BOTTOM (6-o'clock) position → that text block appears below
 *   - One text block shown at a time, fades in/out
 *   - Wheel stays sticky while scrolling through all 4 blocks
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
   CONTENT BLOCKS
   ═══════════════════════════════════════════════════════════ */
const BLOCKS = [
  {
    scrollRange: [0.00, 0.28],
    stat: "60%",
    text: "of senior populations now live in nuclear family structures with limited daily oversight.",
    emphasis: null,
  },
  {
    scrollRange: [0.28, 0.52],
    stat: "1 in 3",
    text: " seniors experience cognitive decline that goes undetected in early, treatable stages.",
    emphasis: null,
    indent: true,
  },
  {
    scrollRange: [0.52, 0.76],
    stat: null,
    text: "Unnoticed falls are the leading cause of hospitalizations delayed response",
    emphasis: "increases risk by 80%.",
    indent: true,
  },
  {
    scrollRange: [0.76, 1.00],
    stat: null,
    text: "Manual check-ins only capture a moment. Emergencies happen in the silent gaps between calls.",
    emphasis: null,
  },
];

/* ═══════════════════════════════════════════════════════════
   DESKTOP GEOMETRY
   Right-half visible circle, icons on right arc edge
   ═══════════════════════════════════════════════════════════ */
const D_R      = 230;           // desktop wheel radius
const D_INSET  = 90;            // circle center offset from container left
const D_WRAP_W = D_INSET + D_R; // container width = shows right half + a bit of left

// Desktop: icons spread from -62° to +62° (3-o'clock = 0°, CW positive)
const D_ICON_R      = D_R * 0.88;
const D_ICON_ANGLES = BLOCKS.map((_, i) => -62 + (i / (BLOCKS.length - 1)) * 124);
// → [-62, -20.7, 20.7, 62]

// Rotation to bring icon[i] to 3-o'clock (pointing right at its text)
const D_ROTATION_STOPS = D_ICON_ANGLES.map(a => -a);

/* ═══════════════════════════════════════════════════════════
   MOBILE GEOMETRY
   Full circle, icons spread around the circumference
   Active icon is at 6-o'clock (bottom, 90° in standard math)
   ═══════════════════════════════════════════════════════════ */
const M_R      = 130;           // mobile wheel radius (fits phone screen)
const M_ICON_R = M_R * 0.85;

// On mobile the wheel shows fully. Icons sit at these angles on the wheel at rest.
// We want them evenly spread (90° apart). Starting angles:
const M_BASE_ANGLES = [0, 90, 180, 270]; // degrees, 0=right, CW positive

// To bring icon[i] to 6-o'clock (90°) we rotate by (90 - M_BASE_ANGLES[i])
const M_ROTATION_STOPS = M_BASE_ANGLES.map(a => 90 - a);
// → [90, 0, -90, -180]

/* ═══════════════════════════════════════════════════════════
   RING CONFIG (shared)
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
    <div style={{
      position: "relative",
      width: D_WRAP_W,
      height: CD,
      flexShrink: 0,
      overflow: "hidden",
    }}>
      {/* Spinning disc */}
      <motion.div
        style={{
          position: "absolute",
          left: D_INSET - D_R,
          top: 0,
          width: CD,
          height: CD,
          transformOrigin: "center center",
          rotate: rotation,
          willChange: "transform",
        }}
      >
        {RINGS.map((ring, i) => (
          <div key={i} style={{
            position: "absolute",
            width: D_R * ring.frac * 2,
            height: D_R * ring.frac * 2,
            borderRadius: "50%",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            background: `radial-gradient(circle at center,
              rgba(111,190,41,${ring.alpha}) 0%,
              rgba(55,110,15,${ring.alpha * 0.5}) 52%,
              transparent 100%)`,
          }}/>
        ))}
        {/* Core */}
        <div style={{
          position: "absolute", width: 50, height: 50,
          borderRadius: "50%", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(220,245,180,0.95) 0%, rgba(111,190,41,0.3) 60%, transparent 100%)",
          boxShadow: "0 0 24px 10px rgba(111,190,41,0.4)",
        }}/>

        {/* Icons on disc — counter-rotated to stay upright */}
        {BLOCKS.map((_, i) => {
          const rad = (D_ICON_ANGLES[i] * Math.PI) / 180;
          const lx  = D_R + D_ICON_R * Math.cos(rad) - 12;
          const ly  = D_R + D_ICON_R * Math.sin(rad) - 12;
          const Icon = ICONS[i];
          const isActive = activeIndex === i;
          return (
            <motion.div key={i}
              style={{
                position: "absolute",
                left: lx, top: ly,
                width: 24, height: 24,
                display: "flex", alignItems: "center", justifyContent: "center",
                rotate: counterRotation,
              }}
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
   DESKTOP TEXT ROWS (all visible, size changes on active)
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
            {/* Icon badge */}
            <motion.div
              animate={{
                background: isActive ? "rgba(111,190,41,0.18)" : "rgba(111,190,41,0.05)",
                borderColor: isActive ? "rgba(111,190,41,0.55)" : "rgba(111,190,41,0.15)",
                color: isActive ? "rgba(220,245,180,1)" : "rgba(160,210,100,0.38)",
                boxShadow: isActive ? "0 0 10px 2px rgba(111,190,41,0.22)" : "none",
              }}
              transition={{ duration: 0.35 }}
              style={{
                flexShrink: 0, marginTop: 3,
                width: 32, height: 32, borderRadius: "50%",
                border: "1px solid",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Icon size={15}/>
            </motion.div>

            {/* Text */}
            <div style={{ paddingTop: 2 }}>
              {block.stat && (
                <motion.span
                  animate={{ fontSize: isActive ? "46px" : "28px", color: isActive ? "#fff" : "rgba(255,255,255,0.45)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontWeight: 800, lineHeight: 1, display: "inline", marginRight: 8, verticalAlign: "middle" }}
                >
                  {block.stat}
                </motion.span>
              )}
              <motion.span
                animate={{ fontSize: isActive ? "15px" : "13px", color: isActive ? "rgba(255,255,255,0.86)" : "rgba(255,255,255,0.42)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontWeight: 300, lineHeight: 1.68, verticalAlign: block.stat ? "middle" : "unset" }}
              >
                {block.text}
              </motion.span>
              {block.emphasis && (
                <>
                  {" "}
                  <motion.span
                    animate={{ fontSize: isActive ? "19px" : "13px", color: isActive ? "#fff" : "rgba(255,255,255,0.42)" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontWeight: 700, lineHeight: 1.4 }}
                  >
                    {block.emphasis}
                  </motion.span>
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
   MOBILE WHEEL (full circle, centered)
   ═══════════════════════════════════════════════════════════ */
function MobileWheel({ rotation, counterRotation, activeIndex }) {
  const MD = M_R * 2;
  return (
    <div style={{
      position: "relative",
      width: MD, height: MD,
      margin: "0 auto",
      flexShrink: 0,
    }}>
      {/* Spinning disc */}
      <motion.div
        style={{
          position: "absolute", inset: 0,
          transformOrigin: "center center",
          rotate: rotation,
          willChange: "transform",
        }}
      >
        {RINGS.map((ring, i) => (
          <div key={i} style={{
            position: "absolute",
            width: M_R * ring.frac * 2,
            height: M_R * ring.frac * 2,
            borderRadius: "50%",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            background: `radial-gradient(circle at center,
              rgba(111,190,41,${ring.alpha}) 0%,
              rgba(55,110,15,${ring.alpha * 0.5}) 52%,
              transparent 100%)`,
          }}/>
        ))}
        {/* Core */}
        <div style={{
          position: "absolute", width: 36, height: 36,
          borderRadius: "50%", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(220,245,180,0.95) 0%, rgba(111,190,41,0.3) 60%, transparent 100%)",
          boxShadow: "0 0 18px 8px rgba(111,190,41,0.4)",
        }}/>

        {/* Icons on disc — counter-rotated upright */}
        {BLOCKS.map((_, i) => {
          const angleDeg = M_BASE_ANGLES[i];
          const rad      = (angleDeg * Math.PI) / 180;
          const lx = M_R + M_ICON_R * Math.cos(rad) - 12;
          const ly = M_R + M_ICON_R * Math.sin(rad) - 12;
          const Icon = ICONS[i];
          const isActive = activeIndex === i;
          return (
            <motion.div key={i}
              style={{
                position: "absolute",
                left: lx, top: ly,
                width: 24, height: 24,
                display: "flex", alignItems: "center", justifyContent: "center",
                rotate: counterRotation,
              }}
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

      {/* Active indicator dot at 6-o'clock (bottom center) — shows where icon "activates" */}
      <div style={{
        position: "absolute",
        bottom: -3,
        left: "50%",
        transform: "translateX(-50%)",
        width: 6, height: 6,
        borderRadius: "50%",
        background: "rgba(111,190,41,0.7)",
        boxShadow: "0 0 6px rgba(111,190,41,0.8)",
      }}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MOBILE TEXT (one block at a time, fade in/out)
   ═══════════════════════════════════════════════════════════ */
function MobileText({ activeIndex }) {
  const block = BLOCKS[activeIndex];
  return (
    <div style={{ textAlign: "center", padding: "0 16px", minHeight: 120 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          {block.stat && (
            <p style={{ margin: "0 0 4px", lineHeight: 1 }}>
              <span style={{ fontSize: 40, fontWeight: 800, color: "#fff" }}>
                {block.stat}
              </span>
              {" "}
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", fontWeight: 300 }}>
                {block.text}
              </span>
            </p>
          )}
          {!block.stat && (
            <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.85)", fontWeight: 300, lineHeight: 1.68 }}>
              {block.text}
              {block.emphasis && (
                <>
                  {" "}
                  <span style={{ fontWeight: 700, color: "#fff", fontSize: 18 }}>
                    {block.emphasis}
                  </span>
                </>
              )}
            </p>
          )}
          {block.stat && block.emphasis && (
            <p style={{ margin: "4px 0 0", fontSize: 14, color: "rgba(255,255,255,0.8)", fontWeight: 300 }}>
              {block.emphasis}
            </p>
          )}

          {/* Dot indicators */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
            {BLOCKS.map((_, i) => (
              <div key={i} style={{
                width: i === activeIndex ? 18 : 6,
                height: 6,
                borderRadius: 3,
                background: i === activeIndex ? "rgba(111,190,41,0.9)" : "rgba(255,255,255,0.2)",
                transition: "all 0.35s ease",
              }}/>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function SeniorsSection() {
  const sectionRef  = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile]       = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  // Determine active block
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let found = 0;
    for (let i = BLOCKS.length - 1; i >= 0; i--) {
      if (v >= BLOCKS[i].scrollRange[0]) { found = i; break; }
    }
    setActiveIndex(found);
  });

  // ── Desktop rotation ──
  const dScrollKeys    = [0, ...BLOCKS.map(b => b.scrollRange[0])];
  const dRotationKeys  = [D_ROTATION_STOPS[0], ...D_ROTATION_STOPS];
  const dWheelRotation = useTransform(scrollYProgress, dScrollKeys, dRotationKeys);
  const dCounterRot    = useTransform(scrollYProgress, dScrollKeys, dRotationKeys.map(r => -r));

  // ── Mobile rotation ──
  // As we scroll through blocks, the wheel rotates to bring icon[i] to 6-o'clock
  const mScrollKeys    = [0, ...BLOCKS.map(b => b.scrollRange[0])];
  const mRotationKeys  = [M_ROTATION_STOPS[0], ...M_ROTATION_STOPS];
  const mWheelRotation = useTransform(scrollYProgress, mScrollKeys, mRotationKeys);
  const mCounterRot    = useTransform(scrollYProgress, mScrollKeys, mRotationKeys.map(r => -r));

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#000000",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "72px 0",
        fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isMobile
          ? "radial-gradient(ellipse at 50% 30%, rgba(70,130,20,0.22) 0%, transparent 55%)"
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
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: "clamp(18px, 2.6vw, 34px)",
            lineHeight: 1.28,
            letterSpacing: "-0.02em",
            marginBottom: "clamp(28px, 5vw, 52px)",
            maxWidth: isMobile ? "100%" : 680,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Families are changing. Seniors are increasingly living alone.
        </motion.h2>

        {/* ── DESKTOP LAYOUT ── */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <DesktopWheel
              rotation={dWheelRotation}
              counterRotation={dCounterRot}
              activeIndex={activeIndex}
            />
            <div style={{ flex: 1, paddingLeft: "clamp(20px, 4vw, 56px)" }}>
              <DesktopTextRows activeIndex={activeIndex} />
            </div>
          </div>
        )}

        {/* ── MOBILE LAYOUT ── */}
        {isMobile && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
            <MobileWheel
              rotation={mWheelRotation}
              counterRotation={mCounterRot}
              activeIndex={activeIndex}
            />
            <MobileText activeIndex={activeIndex} />
          </div>
        )}
      </div>
    </section>
  );
}

/*
 * ── USAGE ──────────────────────────────────────────────────────
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
 * ───────────────────────────────────────────────────────────────
 */
