import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger);

// ─── Icon Components ────────────────────────────────────────────────────────
const FamilyIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BrainIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.37A3 3 0 0 1 3.34 9a3 3 0 0 1 .29-5.4A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.37A3 3 0 0 0 20.66 9a3 3 0 0 0-.29-5.4A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

const WalkingIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="13" cy="4" r="1.5" />
    <path d="M8 20l1.5-4.5L12 18l2-4 1.5 6" />
    <path d="M9.5 9.5L6 12l2 2" />
    <path d="M14 9.5l2.5 2.5-1 2" />
    <path d="M11 7l-1.5 2.5L12 11l2-4" />
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const AlertIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// ─── Statistical Data ────────────────────────────────────────────────────────
const stats = [
  {
    highlight: "60%",
    text: "of senior populations now live in nuclear family structures with",
    suffix: "limited daily oversight.",
    sub: "Urban migration and changing household dynamics leave millions without consistent support networks.",
  },
  {
    highlight: "1 in 3",
    text: "seniors experience cognitive decline that goes undetected in",
    suffix: "early, treatable stages.",
    sub: "Without passive monitoring, the window for early intervention is consistently missed.",
  },
  {
    highlight: "80%",
    prefix: "Delayed emergency response increases risk by",
    text: "— unnoticed falls remain the",
    suffix: "leading cause of hospitalization.",
    sub: "Every minute matters. Automated detection closes the gap between incident and intervention.",
  },
  {
    highlight: "Silent gaps",
    text: "between calls are where emergencies happen.",
    suffix: "Manual check-ins only capture a moment.",
    sub: "Continuous passive intelligence means care doesn't stop when the call ends.",
  },
];

// ─── Wheel Icon Positions ─────────────────────────────────────────────────────
// Each icon sits on the ring, defined as angle in degrees
const wheelIcons = [
  { angle: 45,  Icon: FamilyIcon,  label: "Family" },
  { angle: 135, Icon: BrainIcon,   label: "Cognition" },
  { angle: 225, Icon: WalkingIcon, label: "Mobility" },
  { angle: 315, Icon: ClockIcon,   label: "Response" },
];

// ─── Main Component ──────────────────────────────────────────────────────────
export default function HealthInsightsSection() {
  const sectionRef   = useRef(null);
  const wheelRef     = useRef(null);
  const textRefs     = useRef([]);
  const isMobile     = useRef(false);

  // Populate textRefs array
  const setTextRef = (el, i) => { textRefs.current[i] = el; };

  useEffect(() => {
    isMobile.current = window.innerWidth < 768;

    // ── MOBILE: simple IntersectionObserver fade-in ─────────────────────────
    if (isMobile.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      textRefs.current.forEach((el) => {
        if (el) {
          gsap.set(el, { opacity: 0, y: 20 });
          observer.observe(el);
        }
      });

      return () => observer.disconnect();
    }

    // ── DESKTOP: GSAP ScrollTrigger ──────────────────────────────────────────

    // Set initial states
    gsap.set(wheelRef.current, { rotation: 0, transformOrigin: "center center" });
    textRefs.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, y: 24 });
    });

    // Master timeline pinned to section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2000",
        pin: true,            // pin the section while scrolling
        scrub: 1.2,           // smooth scrub
        anticipatePin: 1,
      },
    });

    // Wheel rotation: full 360° over entire scroll
    tl.to(
      wheelRef.current,
      { rotation: 360, ease: "none", duration: 4 },
      0
    );

    // Each text segment occupies ~1 unit of the 4-unit timeline
    // Text appears → dimmed when next one appears
    stats.forEach((_, i) => {
      const start = i;          // e.g. 0, 1, 2, 3
      const peak  = i + 0.6;
      const dim   = i + 1.0;

      // Fade in
      tl.to(
        textRefs.current[i],
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        start
      );

      // Dim previous texts when next one arrives (except the last)
      if (i < stats.length - 1) {
        tl.to(
          textRefs.current[i],
          { opacity: 0.18, duration: 0.3, ease: "power1.in" },
          dim
        );
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black w-full min-h-screen overflow-hidden flex flex-col items-center justify-center "
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >
      
   

      {/* ── Max-width wrapper ─────────────────────────────────────────────── */}
      <div className=" max-w-[1120px] relative w-full  px-6 md:px-12 flex flex-col ">

        {/* ── Heading ──────────────────────────────────────────────────────── */}
        <h2
          className="text-white text-center font-semibold leading-tight mb-16 md:mb-20 py-16"
          style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)", letterSpacing: "-0.02em" }}
        >
          Families are changing.{" "}
          <span className="text-[#6FBE29]">Seniors</span> are increasingly
          living alone.
        </h2>

        {/* ── Two-column layout ────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-12 md:gap-6 px-2">

          {/* ══ LEFT: Wheel ═════════════════════════════════════════════════ */}
          <div
            className="relative flex-shrink-0 flex items-center justify-center mx-auto self-center"
            style={{ width: "min(420px, 90vw)", height: "min(420px, 90vw)" }}
          >
            {/* Rotating wheel wrapper */}
            <div
              ref={wheelRef}
              className="absolute inset-0"
              style={{ willChange: "transform" }}
            >
              {/* ── SVG Wheel Rings ─────────────────────────────────────── */}
              <svg
                viewBox="0 0 420 420"
                className="w-full h-full "
                style={{ overflow: "visible" }}
              >
                <defs>
                  {/* Outer ring gradient */}
                  <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6FBE29" />
                    <stop offset="50%" stopColor="#6FBE29" />
                    <stop offset="100%" stopColor="#6FBE29" />
                  </linearGradient>
                  {/* Mid ring gradient */}
                  <linearGradient id="ringGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6FBE29" />
                    <stop offset="60%" stopColor="#6FBE29" />
                    <stop offset="100%" stopColor="#6FBE29" />
                  </linearGradient>
                  {/* Inner glow */}
                  <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#6FBE29" stopOpacity="0.18" />
                    <stop offset="60%" stopColor="#6FBE29" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#6FBE29" stopOpacity="0" />
                  </radialGradient>
                  {/* Glow filter */}
                  <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {/* Clip to semi-circle (right half visible) */}
                  <clipPath id="semiClip">
                    <rect x="210" y="0" width="210" height="420" />
                  </clipPath>
                </defs>

                {/* Outer decorative ring – dashed */}
                <circle
                  cx="210" cy="210" r="195"
                  fill="none"
                  stroke="url(#ringGrad1)"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                  opacity="0.4"
                />

                {/* Main outer ring */}
                <circle
                  cx="210" cy="210" r="180"
                  fill="none"
                  stroke="url(#ringGrad1)"
                  strokeWidth="2.5"
                  filter="url(#glowFilter)"
                />

                {/* Mid ring */}
                <circle
                  cx="210" cy="210" r="140"
                  fill="none"
                  stroke="url(#ringGrad2)"
                  strokeWidth="1.5"
                  opacity="0.7"
                />

                {/* Inner mid ring */}
                <circle
                  cx="210" cy="210" r="100"
                  fill="none"
                  stroke="#6FBE29"
                  strokeWidth="1"
                  opacity="0.35"
                  strokeDasharray="6 6"
                />

                {/* Innermost ring */}
                <circle
                  cx="210" cy="210" r="60"
                  fill="none"
                  stroke="#6FBE29"
                  strokeWidth="0.8"
                  opacity="0.25"
                />

                {/* Radial fill / aura */}
                <circle cx="210" cy="210" r="180" fill="url(#innerGlow)" />

                {/* Spokes at 45° intervals */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  const x2 = 210 + 178 * Math.cos(rad);
                  const y2 = 210 + 178 * Math.sin(rad);
                  return (
                    <line
                      key={deg}
                      x1="210" y1="210"
                      x2={x2} y2={y2}
                      stroke="#16a34a"
                      strokeWidth="0.6"
                      opacity="0.2"
                    />
                  );
                })}

                {/* Icon nodes on outer ring */}
                {wheelIcons.map(({ angle, label }) => {
                  const rad = ((angle - 90) * Math.PI) / 180;
                  const cx = 210 + 180 * Math.cos(rad);
                  const cy = 210 + 180 * Math.sin(rad);
                  return (
                    <g key={label}>
                      {/* Glow dot behind icon */}
                      <circle cx={cx} cy={cy} r="18" fill="#B7FF21" stroke="#6FBE29" strokeWidth="1.5" opacity="0.9" filter="url(#glowFilter)" />
                      <circle cx={cx} cy={cy} r="6" fill="#B7FF21" opacity="0.6" />
                    </g>
                  );
                })}

                {/* Center emblem */}
                <circle cx="210" cy="210" r="28" fill="#B7FF21" stroke="#22c55e" strokeWidth="1.5" />
                <circle cx="210" cy="210" r="10" fill="##B7FF21" opacity="0.8" />
                <circle cx="210" cy="210" r="5"  fill="#B7FF21" />
              </svg>
            </div>

            {/* ── Icon labels (outside rotating wrapper, counter-rotate naturally) */}
            {wheelIcons.map(({ angle, Icon, label }) => {
              const rad = ((angle - 90) * Math.PI) / 180;
              // Position icons relative to center of the 420×420 box
              const cx = 210 + 180 * Math.cos(rad);
              const cy = 210 + 180 * Math.sin(rad);
              return (
                <div
                  key={label}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: cx - 16,
                    top:  cy - 16,
                    width: 32,
                    height: 32,
                    pointerEvents: "none",
                  }}
                >
                  <Icon className="w-5 h-5 text-[#6FBE29] opacity-90" />
                </div>
              );
            })}
          </div>

          {/* ══ RIGHT: Text Blocks ══════════════════════════════════════════ */}
          <div className="flex flex-col gap-10 md:gap-12 md:pl-16 flex-1 max-w-[540px]">
            {stats.map((stat, i) => (
              <div
                key={i}
                ref={(el) => setTextRef(el, i)}
                className="group"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Highlight number */}
                <p
                  className="text-[#6FBE29] font-bold mb-2"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1, letterSpacing: "-0.03em" }}
                >
                  {stat.highlight}
                </p>

                {/* Stat sentence */}
                <p
                  className="text-white leading-snug mb-2"
                  style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", fontWeight: 500, letterSpacing: "-0.01em" }}
                >
                  {stat.prefix && (
                    <span className="text-gray-400">{stat.prefix} </span>
                  )}
                  {stat.text}{" "}
                  <span className="text-[#6FBE29] font-semibold">{stat.suffix}</span>
                </p>

                {/* Sub-text */}
                <p
                  className="text-gray-500 leading-relaxed"
                  style={{ fontSize: "clamp(0.8rem, 1vw, 0.95rem)" }}
                >
                  {stat.sub}
                </p>

                {/* Thin separator line */}
                {i < stats.length - 1 && (
                  <div className="mt-8 h-px bg-gradient-to-r from-green-900/40 via-green-700/20 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll hint (desktop only) ──────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 md:flex hidden-mobile">
        <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-green-600 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
