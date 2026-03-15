import wearable from '../assets/wearable.png'
import animation from '../assets/animation.png'
import group20 from '../assets/Group 20.png'
import group23 from '../assets/Group 23 (1).png'

function ImagePlaceholder({ label, className = '' }) {
  return (
    <div
      className={[
        'flex items-center justify-center rounded-2xl border border-dashed border-white/25 bg-white/5 text-center text-[11px] text-white/70',
        className,
      ].join(' ')}
    >
      <div className="px-4">
        <div className="font-semibold tracking-wide text-white/80"></div>
        <div className="mt-1">{label}</div>
      </div>
    </div>
  )
}

function PillButton({ children, variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[15px] font-semibold tracking-wide transition'
  const styles =
    variant === 'primary'
      ? 'bg-[#CBDBE0] text-black hover:bg-[#B7FF21]'
      : 'border border-white/20 bg-transparent text-white hover:border-white/35 hover:bg-white/5'

  return (
    <button type="button" className={[base, styles, className].join(' ')} {...props}>
      {children}
    </button>
  )
}

function MiniIcon({ className = '' }) {
  return (
    <div
      className={[
        'grid size-9 place-items-center rounded-full border border-white/10 bg-white/5',
        className,
      ].join(' ')}
    >
      <div className="size-2 rounded-full bg-[#C7FF4D]" />
    </div>
  )
}

function SectionKicker({ children }) {
  return (
    <div className="text-[12px] font-semibold tracking-[0.12em] text-white/60">
      {children}
    </div>
  )
}

function Divider() {
  return <div className="h-px w-full bg-white/10" />
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#000000] text-white antialiased">

      
     

       
      


      <div className="relative">
        {/* Top nav */}
        <header className="mx-auto max-w-[1120px] px-5 pt-6">
          <div className="rounded-full bg-[#CEFEB7] px-4 py-3 text-black shadow-[0_10px_50px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="grid size-8 place-items-center rounded-full bg-black/15">
                  <div className="size-3 rounded-full bg-black/70" />
                </div>
                <div className="text-[14px] font-semibold tracking-tight">StealthEra</div>
              </div>

              <nav className="hidden items-center gap-7 text-[12px] font-semibold tracking-wide text-black/70 md:flex">
                <a href="#" className="hover:text-black">
                  Solutions
                </a>
                <a href="#" className="hover:text-black">
                  Technology
                </a>
                <a href="#" className="hover:text-black">
                  Institutions
                </a>
              </nav>
              

              <button
                type="button"
                className="rounded-full bg-[#ccdce1] px-4 py-2 text-[12px] font-bold tracking-wide text-black hover:bg-black/85"
              >
                Request Demo
              </button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto max-w-[1120px] px-5 pb-16 pt-14">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h1 className="text-balance text-[44px] font-semibold leading-[1.06] tracking-[-0.02em] sm:text-[54px]">
                Hospital-grade safety &amp;
                <br />
                health intelligence — 
                <br />
                built for seniors living independently.
              </h1>
              <p className="mt-5 max-w-[520px] text-[20px] leading-6 text-white/65">
                Monitor 10+ vitals, movement patterns, location, and cognitive changes — even without a smartphone.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PillButton variant="primary">Request Demo</PillButton>
                <PillButton variant="secondary">Explore Raksha</PillButton>
              </div>
            </div>

            <div className="relative">
              <div className="" />

              <div className="relative h-[400px] w-full overflow-visible">
                <div className="absolute -right-180 -top-25 transform -rotate-[-45deg]">
                  <img
                    src={wearable}
                    alt="Wearable device"
                    className="w-[90vw] max-w-[1220px] rounded-[44px] object-cover"
                  />
                </div>

                <div className="absolute right-20 top-[220px] max-w-[240px] text-right text-[11px] leading-5 text-white/45 lg:block ">
                  10+ biosignals • AI-driven insights • 4G standalone • Caregiver & hospital dashboards
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted section */}
        <section className="mx-auto max-w-[1120px] px-5 pb-14">
          <Divider />
          <div className="pt-12">
            <h2 className="text-[30px] font-semibold tracking-tight">Supported by Healthcare & Research Partners</h2>
            <p className="mt-2 max-w-[680px] text-[18px] leading-6 text-white">
             Deployed, evaluated, and developed in collaboration with leaders in healthcare, research, and innovation.
            </p>

            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: ' Hospitals',
                  desc: 'Clinical-grade insights to support safety, monitoring, and proactive care.',
                },
                {
                  title: 'R&amp;D Research Institutions',
                  desc: 'High-resolution sensing for longitudinal studies and real-world evidence.',
                },
                {
                  title: 'Startups &amp; Innovation Partners',
                  desc: 'Modular ecosystem to accelerate prototypes, pilots, and deployments.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div
                    className="text-[18px] font-semibold tracking-tight"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  <div className="mt-2 text-[15px] leading-6 text-white/60">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Changing families section */}
        <section className="relative mx-auto max-w-[1120px] px-5 pb-16 pt-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] items-center">
            <div className="flex justify-center lg:justify-start">
              <img
                src={animation}
                alt="Illustration of changing families"
                className="w-[280px] max-w-[240px] lg:w-[220px] lg:max-w-[420px]"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-balance text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[34px]">
                Families are changing. Seniors are increasingly living alone.
              </h2>

              <div className="space-y-4 text-[20px] leading-6 text-white">
                <p>
                  <span className="font-semibold text-white/85">60%</span> of senior populations now live in nuclear family structures with limited daily oversight.
                </p>
                <p>
                  <span className="font-semibold text-white/85">1 in 3</span> seniors experience cognitive decline that goes undetected in early, treatable stages.
                </p>
                <p>
                  Unnoticed falls are the leading cause of hospitalizations, delaying response and <span className="font-semibold text-white/85">increasing risk by 80%</span>.
                </p>
                <p>
                  Manual check‑ins only capture a moment. Emergencies happen in the silent gaps between calls.
                </p>
              </div>
            </div>
          </div>

         {/* Solutions Section */}

          <div className="mt-28 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Cognitive & Behavioral Insights',
                items: [
                  '10+ clinical‑grade vitals tracked 24/7',
                  'AI‑driven personalized baselines',
                  'Early abnormality detection',
                ],
              },
              {
                title: 'Continuous Health Intelligence',
                items: [
                  'Speech pattern & volatility analysis',
                  'Subtle routine deviation tracking',
                  'Sleep hygiene & circadian monitoring',
                ],
              },
              {
                title: 'Safety & Location Awareness',
                items: [
                  'Precision fall detection algorithms',
                  'One‑touch SOS emergency bypass',
                  'Advanced geofencing & wandering alerts',
                ],
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
              >
                <div className="flex items-start gap-3">
                  <div className="grid size-10 place-items-center rounded-2xl bg-[#C7FF4D]/10">
                    <div className="size-4 rounded-full bg-[#C7FF4D]/80" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-[18px] font-semibold">{card.title}</div>
                    <div className="h-px w-15 bg-white" />
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-[15px] leading-6 text-white list-disc list-inside">
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center text-[17px] text-white">“Not just monitoring — early understanding.”</div>
        </section>

        {/* Seamless ecosystem band component */}
        <section className="relative py-20 overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <img
              src={group20}
              alt="Left side decoration"
              className="absolute left-0 top-1/2 h-[360px] w-[260px] -translate-y-1/2 object-contain"
            />
            <img
              src={group23}
              alt="Right side decoration"
              className="absolute right-0 top-1/2 h-[360px] w-[260px] -translate-y-1/2 object-contain"
            />
          </div>

          <div className="relative mx-auto max-w-[1120px] px-5 text-center">
            <h2 className="text-[40px] font-semibold tracking-tight">How Stealthera Works — From Signal to Action</h2>

            <div className="mt-32 flex flex-row items-center justify-center gap-5 lg:flex-row lg:items-center lg:gap-15 py-12">
              {[
                {
                  title: 'Raksha Wearable',
                  subtitle: 'Hospital-grade sensor',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white">
                      <path
                        d="M12 4L19 9M12 4L5 9M12 4V20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 9L12 14L19 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  title: 'Raksha Wearable',
                  subtitle: 'Hospital-grade sensor',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white">
                      <path
                        d="M4 12H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 4V20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                },
                {
                  title: 'Raksha Wearable',
                  subtitle: 'Hospital-grade sensor',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white">
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 6v6l4 2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  title: 'Raksha Wearable',
                  subtitle: 'Hospital-grade sensor',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white">
                      <path
                        d="M4 4h16v16H4V4z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 8h8v8H8V8z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
              ].map((step, idx) => (
                <div key={`${step.title}-${idx}`} className="flex flex-col items-center gap-5">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-[#C7FF4D]/10 ring-1 ring-white/10">
                    {step.icon}
                  </div>

                  <div className="text-left">
                    <div className="text-[15px] font-semibold">{step.title}</div>
                    <div className="mt-1 text-[12px] text-white/60">{step.subtitle}</div>
                  </div>

                  {idx < 3 ? (
                    <div className="hidden lg:flex">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white/40"
                      >
                        <path
                          d="M4 12H20"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M16 8L20 12L16 16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

           
          </div>
        </section>

        {/* Final section */}
        <section className="mx-auto max-w-[1120px] px-5 pb-20 pt-12">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h2 className="text-balance text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[34px]">
                Continuous Health, Safety, And
                <br />
                Cognitive Intelligence— In One System.
              </h2>
              <p className="mt-4 max-w-[560px] text-[12.5px] leading-6 text-white/65">
                Combine continuous sensing with privacy-first insights. Designed to be usable at
                home and meaningful in clinical workflows.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    title: 'Insights that stay actionable',
                    desc: 'Signal quality and context to reduce noise and false alarms.',
                  },
                  {
                    title: 'Built for real-world adoption',
                    desc: 'Low-friction setup across seniors, caregivers, and clinicians.',
                  },
                  {
                    title: 'Secure by design',
                    desc: 'Data minimization and access control across the ecosystem.',
                  },
                ].map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="mt-1 size-10 shrink-0 rounded-2xl bg-[#C7FF4D]/15 ring-1 ring-white/10" />
                    <div>
                      <div className="text-[13px] font-semibold tracking-tight">{f.title}</div>
                      <div className="mt-1 text-[12px] leading-6 text-white/60">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-14 -top-12 hidden size-[200px] rounded-full bg-[#C7FF4D]/10 blur-[70px] lg:block" />
              <ImagePlaceholder
                label="App UI / phone mock image"
                className="ml-auto aspect-9/16 w-full max-w-[360px] rounded-[28px]"
              />
            </div>
          </div>
        </section>

        <footer className="mx-auto max-w-[1120px] px-5 pb-10">
          <Divider />
          <div className="flex flex-col items-start justify-between gap-4 pt-6 text-[12px] text-white/45 sm:flex-row sm:items-center">
            <div>© {new Date().getFullYear()} StealthEra</div>
            <div className="flex gap-5">
              <a className="hover:text-white" href="#">
                Privacy
              </a>
              <a className="hover:text-white" href="#">
                Terms
              </a>
              <a className="hover:text-white" href="#">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

