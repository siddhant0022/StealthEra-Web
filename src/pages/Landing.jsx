function ImagePlaceholder({ label, className = '' }) {
  return (
    <div
      className={[
        'flex items-center justify-center rounded-2xl border border-dashed border-white/25 bg-white/5 text-center text-[11px] text-white/70',
        className,
      ].join(' ')}
    >
      <div className="px-4">
        <div className="font-semibold tracking-wide text-white/80">IMAGE</div>
        <div className="mt-1">{label}</div>
      </div>
    </div>
  )
}

function PillButton({ children, variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[12px] font-semibold tracking-wide transition'
  const styles =
    variant === 'primary'
      ? 'bg-[#C7FF4D] text-black hover:bg-[#B7FF21]'
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
    <div className="min-h-screen bg-[#040605] text-white antialiased">
      {/* Background accents */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 size-[520px] rounded-full bg-[#C7FF4D]/25 blur-[80px]" />
        <div className="absolute -right-56 -top-28 size-[620px] rounded-full bg-[#C7FF4D]/20 blur-[110px]" />
        <div className="absolute -left-56 top-[42%] size-[640px] rounded-full bg-[#C7FF4D]/15 blur-[120px]" />
      </div>

      <div className="relative">
        {/* Top nav */}
        <header className="mx-auto max-w-[1120px] px-5 pt-6">
          <div className="rounded-full bg-[#D7FF82] px-4 py-3 text-black shadow-[0_10px_50px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="grid size-8 place-items-center rounded-full bg-black/15">
                  <div className="size-3 rounded-full bg-black/70" />
                </div>
                <div className="text-[14px] font-semibold tracking-tight">StealthEra</div>
              </div>

              <nav className="hidden items-center gap-7 text-[12px] font-semibold tracking-wide text-black/70 md:flex">
                <a href="#" className="hover:text-black">
                  Product
                </a>
                <a href="#" className="hover:text-black">
                  Care Ecosystem
                </a>
                <a href="#" className="hover:text-black">
                  About
                </a>
              </nav>

              <button
                type="button"
                className="rounded-full bg-black px-4 py-2 text-[12px] font-semibold tracking-wide text-white hover:bg-black/85"
              >
                Contact
              </button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto max-w-[1120px] px-5 pb-16 pt-14">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h1 className="text-balance text-[40px] font-semibold leading-[1.06] tracking-[-0.02em] sm:text-[54px]">
                Hospital-grade safety &amp;
                <br />
                health intelligence— on
                <br />
                the wrist.
              </h1>
              <p className="mt-5 max-w-[520px] text-[13px] leading-6 text-white/65">
                Our sensor ecosystem is safe, seamless, action-oriented, and built to elevate
                preventative care—from home to hospital.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PillButton variant="primary">Request Demo</PillButton>
                <PillButton variant="secondary">Buy a Starter Kit</PillButton>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-14 top-10 hidden size-[180px] rounded-full bg-[#C7FF4D]/15 blur-[55px] lg:block" />

              <div className="relative h-[360px] w-full overflow-visible">
                {/* Watch / band placeholder (leave space for your real image) */}
                <div className="absolute right-[-18px] top-[-8px] rotate-18">
                  <ImagePlaceholder
                    label="Hero product render (watch/band)"
                    className="h-[300px] w-[440px] rounded-[44px]"
                  />
                </div>

                <div className="absolute right-3 top-[170px] hidden max-w-[220px] text-right text-[11px] leading-5 text-white/45 lg:block">
                  Add your product render here.
                  <br />
                  Keep transparent background for best match.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted section */}
        <section className="mx-auto max-w-[1120px] px-5 pb-14">
          <Divider />
          <div className="pt-12">
            <h2 className="text-[16px] font-semibold tracking-tight">Trusted Across The Care Ecosystem</h2>
            <p className="mt-2 max-w-[680px] text-[12.5px] leading-6 text-white/60">
              Designed for clinicians, researchers, and innovators. Built to integrate with real
              workflows and deliver actionable, privacy-aware insights.
            </p>

            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'US Hospitals',
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
                    className="text-[13px] font-semibold tracking-tight"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  <div className="mt-2 text-[12px] leading-6 text-white/60">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Changing families section */}
        <section className="relative mx-auto max-w-[1120px] px-5 pb-16 pt-6">
          <div className="absolute -left-10 top-2 hidden size-[220px] rounded-full bg-[#C7FF4D]/10 blur-[65px] lg:block" />

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h2 className="text-balance text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[34px]">
                Family structures are changing. Senior risks are rising
              </h2>

              <div className="mt-7 space-y-4 text-[12.5px] leading-6 text-white/65">
                <p>
                  <span className="font-semibold text-white/85">60%</span> of senior populations
                  live in nuclear family structures with limited daily oversight.
                </p>
                <p>
                  <span className="font-semibold text-white/85">1 in 3</span> seniors experience
                  cognitive decline that goes unnoticed in care settings.
                </p>
                <p>
                  Unnoticed falls are the leading cause of hospitalizations beyond primary illnesses
                  in the elderly.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <SectionKicker>INSIGHTS</SectionKicker>
              <div className="mt-2 text-[15px] font-semibold tracking-tight">
                Continuous signals, fewer blind spots
              </div>
              <div className="mt-4 space-y-3">
                {[
                  'Fall detection with contextual movement patterns',
                  'Cognitive & behavioral baselines over time',
                  'Location + safety alerts when it matters most',
                ].map((t) => (
                  <div key={t} className="flex gap-3">
                    <div className="mt-1 size-5 rounded-md bg-[#C7FF4D]/20 ring-1 ring-white/10" />
                    <div className="text-[12px] leading-6 text-white/65">{t}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <ImagePlaceholder label="Section supporting image / illustration" className="h-[140px] w-full" />
              </div>
            </div>
          </div>

          {/* Feature cards row */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Cognitive & Behavioral',
                desc: 'Detect subtle changes early with baseline-aware insights.',
              },
              {
                title: 'Continuous Health Intelligence',
                desc: 'Vitals + trends that remain useful outside the clinic.',
              },
              {
                title: 'Safety & Location',
                desc: 'Smart alerts designed for caregivers and seniors.',
              },
              {
                title: 'Care Collaboration',
                desc: 'Share the right signal with the right person.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-[#070908] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
              >
                <MiniIcon />
                <div className="mt-4 text-[13px] font-semibold tracking-tight">{card.title}</div>
                <div className="mt-2 text-[12px] leading-6 text-white/60">{card.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Seamless ecosystem band */}
        <section className="relative py-16">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-36 top-1/2 h-[240px] w-[260px] -translate-y-1/2 rounded-[48px] bg-[#C7FF4D]/30 blur-[0px]" />
            <div className="absolute -right-36 top-1/2 h-[240px] w-[260px] -translate-y-1/2 rounded-[48px] bg-[#C7FF4D]/30 blur-[0px]" />
            <div className="absolute left-1/2 top-1/2 h-[260px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C7FF4D]/10 blur-[85px]" />
          </div>

          <div className="relative mx-auto max-w-[1120px] px-5 text-center">
            <h2 className="text-[16px] font-semibold tracking-tight">The Seamless Ecosystem</h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                { title: 'Wearable', desc: 'Signals captured continuously.' },
                { title: 'Home Hub', desc: 'Contextual monitoring & sync.' },
                { title: 'Care Portal', desc: 'Insights for teams & family.' },
              ].map((x) => (
                <div key={x.title} className="flex flex-col items-center">
                  <div className="grid size-12 place-items-center rounded-full border border-white/10 bg-white/5">
                    <div className="size-4 rounded-full bg-[#C7FF4D]/90" />
                  </div>
                  <div className="mt-3 text-[13px] font-semibold">{x.title}</div>
                  <div className="mt-1 text-[12px] text-white/60">{x.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[11px] text-white/45">
              {['Partner Logo', 'Partner Logo', 'Partner Logo', 'Partner Logo', 'Partner Logo'].map((t, idx) => (
                <div
                  key={`${t}-${idx}`}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2"
                >
                  {t}
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

