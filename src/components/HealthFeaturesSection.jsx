
import { useState } from "react";

const HealthFeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
        </svg>
      ),
      heading: "Cognitive & Behavioral Insights",
      bullets: [
        "10+ clinical-grade vitals tracked 24/7",
        "AI-driven personalized baselines",
        "Early abnormality detection",
      ],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      heading: "Continuous Health Intelligence",
      bullets: [
        "Speech pattern & volatility analysis",
        "Subtle routine deviation tracking",
        "Sleep hygiene & circadian monitoring",
      ],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      heading: "Safety & Location Awareness",
      bullets: [
        "Precision fall detection algorithms",
        "One-touch SOS emergency bypass",
        "Advanced geofencing & wandering alerts",
      ],
    },
  ];

  return (
    <section className="w-full bg-black py-16 px-6 md:px-12">
            <div className="max-w-5xl mx-auto  py-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col">
              {/* Icon + Divider Row */}
              <div className="flex items-center mb-5">
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-[#6FBE29] flex items-center justify-center z-10">
                  {feature.icon}
                </div>
                <div className="flex-1 h-px bg-gray-600 ml-3" />
              </div>

              {/* Heading */}
              <h3 className="text-white font-semibold text-[22px] leading-tight mb-4">
                {feature.heading}
              </h3>

              {/* Bullet List */}
              <ul className="space-y-2">
                {feature.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 text-gray-400 text-[17px] leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Tagline */}
        <p className="text-center text-gray-400 italic text-[24px] mt-14">
          Not just monitoring — early understanding.
        </p>
      </div>
    </section>
  );
};

export default HealthFeaturesSection;
