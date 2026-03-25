import { useEffect, useRef } from "react";
import PANEL_IMG from "../assets/panel.png";

// Use the uploaded image as the side panel element


const steps = [
  {
    id: 1,
    title: "Raksha Wearable",
    desc: "Hospital-grade sensors",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 3.5-2 5.5-2 8H7c0-2.5-2-4.5-2-8a7 7 0 0 1 7-7z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Signal Capture",
    desc: "Real-time transmission",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "AI Processing",
    desc: "Edge intelligence engine",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Action Dashboard",
    desc: "Live clinical response",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
];

export default function SignalToActionFlow() {
  const stepRefs = useRef([]);
  const arrowRefs = useRef([]);
  const glowRefs = useRef([]);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const titleRef = useRef(null);
  const seqTlRef = useRef(null);
  const floatTlRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script.onload = () => {
      const gsap = window.gsap;

      /* ── entrance ── */
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -32 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(leftPanelRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1.3, ease: "power3.out", delay: 0.5 }
      );
      gsap.fromTo(rightPanelRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1.3, ease: "power3.out", delay: 0.5 }
      );

      /* ── initial states ── */
      stepRefs.current.forEach(el => el && gsap.set(el, { scale: 0.85, opacity: 0.2 }));
      glowRefs.current.forEach(el => el && gsap.set(el, { opacity: 0, scale: 0.6 }));
      arrowRefs.current.forEach(el => {
        if (!el) return;
        const path = el.querySelector("path");
        if (path) gsap.set(path, { strokeDasharray: 90, strokeDashoffset: 90, opacity: 0.12 });
      });

     

      /* ── signal sequence ── */
      const runSequence = () => {
        if (seqTlRef.current) seqTlRef.current.kill();
        const tl = gsap.timeline({ onComplete: () => setTimeout(runSequence, 600) });
        seqTlRef.current = tl;

        steps.forEach((_, i) => {
          const step  = stepRefs.current[i];
          const glow  = glowRefs.current[i];
          const arrow = arrowRefs.current[i];

          // activate step
          tl.to(step, { scale: 1, opacity: 1, duration: 0.38, ease: "back.out(2)" });
          tl.to(glow, { opacity: 1, scale: 1.5, duration: 0.28, ease: "power2.out" }, "<0.06");
          tl.to(glow, { opacity: 0, scale: 2.1, duration: 0.38, ease: "power2.in" }, ">0.1");

          // draw arrow
          if (i < steps.length - 1 && arrow) {
            const path = arrow.querySelector("path");
            if (path) {
              tl.to(path, { strokeDashoffset: 0, opacity: 1, duration: 0.44, ease: "power2.inOut" }, ">0.04");
            }
          }
        });

        // brief hold
        tl.to({}, { duration: 0.55 });

        // reset steps
        tl.to(stepRefs.current, { scale: 0.85, opacity: 0.2, duration: 0.32, stagger: 0.04, ease: "power2.in" });

        // reset arrows
        arrowRefs.current.forEach(el => {
          if (!el) return;
          const path = el.querySelector("path");
          if (path) tl.to(path, { strokeDashoffset: 90, opacity: 0.12, duration: 0.22 }, "<");
        });
      };

      setTimeout(runSequence, 1000);
    };

    document.head.appendChild(script);
    return () => {
      floatTlRef.current?.kill();
      seqTlRef.current?.kill();
    };
  }, []);

  return (
    <div
      style={{ background: "#000"}}
      className="w-full flex items-center justify-center px-1 py-16 overflow-hidden min-h-screen"
    >
      <div className="w-full  flex flex-col items-center">

        {/* ── Title ── */}
        <h2
          ref={titleRef}
          style={{ opacity: 0 }}
          className="text-center text-white font-semibold text-2xl md:text-3xl lg:text-4xl mb-12 md:mb-16 px-4 leading-snug"
        >
          How Stealthera Works —{" "}
          <span style={{ color: "#85E82D" }}>From Signal to Action</span>
        </h2>

        {/* ── Main row ── */}
        <div className="w-full flex flex-row items-center justify-between gap-2 md:gap-4">

          {/* LEFT PANEL */}
          <div
            ref={leftPanelRef}
            style={{ opacity: 0, flexShrink: 0 }}
            className="hidden sm:block"
          >
            <PanelImage flip={false} />
          </div>

          {/* CENTER PIPELINE */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0">
            {steps.map((step, i) => (
              <div key={step.id} className="flex flex-col md:flex-row items-center">

                {/* Step card */}
                <div
                  ref={el => (stepRefs.current[i] = el)}
                  className="flex flex-col items-center gap-2"
                  style={{ minWidth: 90, maxWidth: 115 }}
                >
                  {/* Icon + glow ring */}
                  <div className="relative flex items-center justify-center">
                    <div
                      ref={el => (glowRefs.current[i] = el)}
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width: 100,
                        height: 100,
                        background: "radial-gradient(circle, #85E82D66 0%, transparent 75%)",
                        filter: "blur(10px)",
                        opacity: 0,
                      }}
                    />
                    <div
                      className="relative z-10 flex items-center justify-center rounded-full"
                      style={{
                        width: 52,
                        height: 52,
                        background: "linear-gradient(135deg, #85E82D 0%, #6FBE29 100%)",
                        boxShadow: "0 0 22px #85E82D55, 0 3px 12px #00000099",
                      }}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* Label */}
                  <div className="text-center px-1">
                    <p className="text-white font-medium leading-tight" style={{ fontSize: "0.72rem" }}>
                      {step.title}
                    </p>
                    <p className="text-gray-400 leading-tight mt-0.5" style={{ fontSize: "0.63rem" }}>
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                {i < steps.length - 1 && (
                  <div
                    ref={el => (arrowRefs.current[i] = el)}
                    className="flex items-center justify-center mx-1 md:mx-2 rotate-90 md:rotate-0"
                    style={{ width: 44, height: 22, flexShrink: 0 }}
                  >
                    <svg
                      viewBox="0 0 56 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: "100%", height: "100%", overflow: "visible" }}
                    >
                      <path
                        d="M0 11 L44 11 M36 4 L50 11 L36 18"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ opacity: 0.12 }}
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT PANEL */}
          <div
            ref={rightPanelRef}
            style={{ opacity: 0, flexShrink: 0 }}
            className="hidden sm:block"
          >
            <PanelImage flip={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Side panel using the uploaded image ── */
function PanelImage({ flip }) {
  return (
    <div
      style={{
        width: "clamp(130px, 15vw, 190px)",
        height: "clamp(180px, 24vw, 260px)",
        position: "relative",
        transform: flip ? "scaleX(-1)" : "none",
        opacity: 0.9,
        filter: [
          "drop-shadow(0 0 12px #6FBE2950)",
          "drop-shadow(0 0 24px #85E82D22)",
        ].join(" "),
      }}
    >
      <img
        src={PANEL_IMG}
        alt="Stealthera panel"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 18,
          display: "block",
        }}
      />
      {/* Edge fade toward pipeline */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          background: flip
            ? "linear-gradient(to right, transparent 45%, #00000066 100%)"
            : "linear-gradient(to left,  transparent 45%, #00000066 100%)",
          pointerEvents: "none",
        }}
      />
      {/* Top fade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          background: "linear-gradient(to bottom, #00000044 0%, transparent 25%, transparent 75%, #00000044 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
