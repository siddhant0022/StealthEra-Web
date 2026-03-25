import { useState } from 'react'
import wearable from '../assets/wearable.png'
import hero from '../assets/hero.png'
import logo from '../assets/logo.png'
import dashboardMobile from '../assets/dashboardformobile.jpeg'
import dashboardPc from '../assets/dashboardforpc.png'
import HealthInsightsSection from '../components/HealthInsightsSection'
import HealthFeaturesSection from '../components/HealthFeaturesSection'
import SignalToActionFlow from '../components/SignalToActionFlow'
import SeniorsSection from '../components/SeniorsSection'

function DashboardShowcase({ className = '', imageClassName = '' }) {
  return (
    <div
      className={[
        'relative overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(199,255,77,0.12),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-2 shadow-[0_28px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm',
        className,
      ].join(' ')}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-24 rounded-full bg-[#C7FF4D]/10 blur-3xl" />
      <div className="relative h-full w-full overflow-hidden rounded-[24px] border border-white/8 bg-[#0a0f08]">
        <picture>
          <source media="(min-width: 1024px)" srcSet={dashboardPc} />
          <img
            src={dashboardMobile}
            alt="StealthEra dashboard interface"
            className={[
              'h-full w-full object-contain object-center',
              imageClassName,
            ].join(' ')}
          />
        </picture>
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

function Logo({ className = '' }) {
  return (
    <div className={['flex items-center justify-center', className].join(' ')}>
      <img
        src={logo}
        alt="StealthEra logo"
        className="h-4 w-30 sm:h-5 sm:w-20 md:h-[16px] md:w-[125px]"
      />
    </div>
  )
}

function Divider() {
  return <div className="h-px w-full bg-white/10" />
}

function WatchSurfaceOverlay({ className = '', textClassName = '' }) {
  const [position, setPosition] = useState({ x: 50, y: 50, active: false })

  const setFromPoint = (clientX, clientY, target) => {
    const rect = target.getBoundingClientRect()
    const rawX = ((clientX - rect.left) / rect.width) * 100
    const rawY = ((clientY - rect.top) / rect.height) * 100
    const x = Math.max(10, Math.min(90, rawX))
    const y = Math.max(14, Math.min(86, rawY))
    setPosition({ x, y, active: true })
  }

  const handlePointerMove = (event) => {
    setFromPoint(event.clientX, event.clientY, event.currentTarget)
  }

  const handleTouchMove = (event) => {
    const touch = event.touches?.[0]
    if (!touch) return
    setFromPoint(touch.clientX, touch.clientY, event.currentTarget)
  }

  return (
    <div
      className={['absolute z-20 touch-none', className].join(' ')}
      onPointerEnter={handlePointerMove}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPosition((prev) => ({ ...prev, active: false }))}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setPosition((prev) => ({ ...prev, active: false }))}
    >
      <div
        className={[
          'pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/35 bg-white/12 px-3 py-2 text-[10px] font-medium leading-4 text-white/90 backdrop-blur-md shadow-[0_12px_36px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-200',
          textClassName,
        ].join(' ')}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          opacity: position.active ? 1 : 0.9,
        }}
      >
        10+ biosignals • AI-driven insights • 4G standalone • Caregiver & hospital dashboards
      </div>
    </div>
  )
}

export default function Landing() {
  return (
    <div className="w-full min-h-screen bg-[#000000] text-white antialiased">

      
     

       
      


      <div className="w-full relative">
        {/* Top nav */}
        <header className="w-full px-5 pt-6">
          <div className="mx-auto max-w-[1120px]">
            <div className="rounded-full bg-[#CEFEB7] px-4 py-3 text-black shadow-[0_10px_50px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between gap-4">
                <Logo className="text-[12px] md:text-[14px]" />

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
          </div>
        </header>

        {/* Hero - Mobile */}
        <section className="block md:hidden w-full px-5 pb-16 pt-14 min-h-screen flex flex-col justify-center">
          <div className="mx-auto max-w-[1120px] w-full">
            <div className="grid items-center gap-10 grid-cols-1 ">
              <div>
                <h1 className="text-balance text-[32px] font-semibold leading-[1.06] tracking-[-0.02em]">
                  Hospital-grade safety &amp;
                  <br />
                  health intelligence — 
                  <br />
                  built for seniors living independently.
                </h1>
                <p className="mt-5 max-w-[520px] text-[16px] leading-6 text-white/65">
                  Monitor 10+ vitals, movement patterns, location, and cognitive changes — even without a smartphone.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <PillButton variant="primary">Request Demo</PillButton>
                  <PillButton variant="secondary">Explore Raksha</PillButton>
                </div>
              </div>

              <div className="relative w-full h-[300px]">
                <div className="relative w-full h-full rounded-[24px]">
                  <img
                    src={hero}
                    alt="Wearable device"
                    className="w-[150%] h-[100%] object-cover absolute "
                  />
                  <WatchSurfaceOverlay
                    className="left-[42%] top-[32%] h-[130px] w-[160px]"
                    textClassName="max-w-[140px] text-[9px] leading-3.5"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero - Desktop */}
        <section className="hidden md:flex w-full px-5 pb-16 pt-14 min-h-screen flex-col justify-center">
          <div className="mx-auto  w-full">
            <div className="grid items-start gap-4 lg:gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h1 className="text-balance text-[44px] font-bold leading-[1.06] tracking-[-0.02em] sm:text-[52px] px-24">
                  Hospital-grade safety &amp;
                  <br />
                  health intelligence — 
                  <br />
                  built for seniors living independently.
                </h1>
                <p className="mt-5 max-w-[520px] text-[18px] leading-6 text-white/70 px-24">
                  Monitor 10+ vitals, movement patterns, location, and cognitive changes — even without a smartphone.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3 px-24">
                  <PillButton variant="primary">Request Demo</PillButton>
                  <PillButton variant="secondary">Explore Raksha</PillButton>
                </div>
              </div>

              <div className="relative">
                <div className="" />

                <div className="relative h-[500px] w-[100%] overflow-hidden rounded-[44px] ">
                  <div className=" absolute -right-110 -top-25 transform -rotate-[-45deg]  ">
                    <img
                      src={hero}
                      alt="Wearable device"
                      className="w-[90vw] max-w-[1220px] rounded-[44px] object-cover"
                    />
                  </div>

                  <WatchSurfaceOverlay
                    className="right-14 top-[150px] h-[190px] w-[280px]"
                    textClassName="max-w-[250px] text-right text-[11px] leading-5"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted section */}
        <section className="w-full px-5 pb-14 ">
          <div className="mx-auto max-w-[1120px]">
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
          </div>
        </section>

        {/* Changing families section */}
      
       <SeniorsSection/>
     
       <HealthFeaturesSection/>

       <SignalToActionFlow/>

        {/* Seamless ecosystem band component */}
       

        {/* Final section - Mobile */}
        <section className="block md:hidden w-full px-5 pb-20 pt-12">
          <div className="mx-auto max-w-[1120px]">
            <div className="grid items-center gap-10 grid-cols-1">
              <div>
                <h2 className="text-balance text-[24px] font-semibold leading-[1.12] tracking-[-0.02em]">
                  Continuous Health, Safety, And
                  <br />
                  Cognitive Intelligence— In One System.
                </h2>
                <p className="mt-4 max-w-[560px] text-[14px] leading-6 text-white/65">
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
                      <div className="mt-1 size-10 shrink-0 rounded-2xl bg-[#85E82D] ring-1 ring-white/10" />
                      <div>
                        <div className="text-[13px] font-semibold tracking-tight">{f.title}</div>
                        <div className="mt-1 text-[12px] leading-6 text-white/60">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex justify-center w-full">
                <DashboardShowcase
                  className="aspect-[10/16] w-full max-w-[320px]"
                  imageClassName="object-contain object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Final section - Desktop */}
        <section className="hidden md:block w-full px-5 pb-20 pt-12">
          <div className="mx-auto max-w-[1120px]">
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
                      <div className="mt-1 size-10 shrink-0 rounded-2xl bg-[#85E82D] ring-1 ring-white/10" />
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
                <DashboardShowcase
                  className="mx-auto aspect-[4/5] max-w-[340px] md:max-w-[380px] lg:hidden"
                  imageClassName="object-contain object-center"
                />
                <DashboardShowcase
                  className="ml-auto hidden aspect-[16/11] w-full max-w-[620px] lg:block"
                  imageClassName="object-contain object-center"
                />
              </div>
            </div>
          </div>
        </section>

        <footer className="w-full px-5 pb-10">
          <div className="mx-auto max-w-[1120px]">
          <Divider />
          <div className="flex flex-col items-start justify-between gap-4 pt-6 text-[12px] text-white/45 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-white/80">
              <Logo className="h-5 w-30 sm:h-5 sm:w-20 md:h-[16px] md:w-[125px]" />
            </div>
            <div className="flex  item-center justify-center gap-5">
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
          </div>
        </footer>
      </div>
    </div>
  )
}

