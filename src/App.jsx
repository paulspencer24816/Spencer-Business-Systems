import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  MessageCircle,
  Menu,
  X,
  Upload,
  Globe,
  Workflow,
  Bot,
  LayoutDashboard,
  LifeBuoy,
  Headset,
  Network,
  Calendar,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ----------------------------------------------------------------
   Constants / Content
---------------------------------------------------------------- */
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Approach', href: '#approach' },
  { label: 'Process', href: '#process' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES = [
  {
    icon: Globe,
    title: 'Website Design',
    text: 'Custom-built sites designed and coded for your business, not a drag-and-drop template.',
  },
  {
    icon: Workflow,
    title: 'Business Automations',
    text: 'Workflows that quietly remove the manual busywork eating your week.',
  },
  {
    icon: Bot,
    title: 'AI Agents',
    text: 'Assistants that handle real tasks like answering, sorting, and following up. Not gimmicks.',
  },
  {
    icon: LayoutDashboard,
    title: 'Custom Dashboards',
    text: 'One place to see and manage your site, automations, and AI agents.',
  },
  {
    icon: LifeBuoy,
    title: 'Ongoing Support',
    text: 'Systems that keep working after launch, with a direct line to the person who built them.',
  },
  {
    icon: Headset,
    title: 'Automated Customer Support',
    text: '24/7 support that answers common questions, routes the rest, and never leaves someone on read.',
  },
]

/* ----------------------------------------------------------------
   Logo — badge (mirrors favicon.svg) + wordmark lockup
---------------------------------------------------------------- */
function LogoBadge({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      className="shrink-0"
      aria-hidden="true"
    >
      <circle cx="18" cy="18" r="18" fill="#1E3A5C" />
      <rect x="8" y="20" width="4" height="7" rx="1" fill="#FFFFFF" />
      <rect x="15" y="15" width="4" height="12" rx="1" fill="#FFFFFF" />
      <rect x="22" y="10" width="4" height="17" rx="1" fill="#F0A23D" />
      <path d="M24 4.5 L28.5 11 L19.5 11 Z" fill="#F0A23D" />
    </svg>
  )
}

function LogoWordmark({ tone = 'light' }) {
  const nameColor = tone === 'dark' ? 'text-white' : 'text-ink'
  const subColor = tone === 'dark' ? 'text-white/50' : 'text-muted'
  return (
    <span className="flex flex-col leading-none">
      <span
        className={`relative inline-block font-serif italic font-semibold text-xl ${nameColor} pb-1`}
      >
        Spencer
        <span className="absolute left-0 bottom-0 h-[2px] w-full bg-accent rounded-full" />
      </span>
      <span
        className={`font-mono uppercase tracking-[0.18em] text-[9px] mt-1.5 ${subColor}`}
      >
        Business Systems
      </span>
    </span>
  )
}

function Logo({ tone = 'light', size = 36, ring = false }) {
  return (
    <span className="flex items-center gap-2.5 group">
      <span className="relative inline-flex">
        <LogoBadge size={size} />
        {ring && (
          <span className="absolute inset-0 rounded-full ring-2 ring-accent/0 group-hover:ring-accent/50 transition" />
        )}
      </span>
      <LogoWordmark tone={tone} />
    </span>
  )
}

/* ----------------------------------------------------------------
   Navbar
---------------------------------------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-primary/10' : 'bg-transparent'
        } rounded-full px-4 sm:px-6 py-2.5 w-[calc(100%-2rem)] max-w-5xl`}
      >
        <div className="flex items-center justify-between gap-6">
          <a href="#home" className="flex items-center">
            <Logo tone={scrolled ? 'light' : 'dark'} size={34} ring />
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-tight lift-on-hover ${
                  scrolled
                    ? 'text-ink/70 hover:text-primary'
                    : 'text-white/90 hover:text-white'
                } transition-colors`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden lg:inline-flex magnetic-btn items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/30"
          >
            Book a call
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>

          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden p-2 rounded-full ${scrolled ? 'text-ink' : 'text-white'}`}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-deep/90 backdrop-blur-2xl"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 right-0 bg-background rounded-b-5xl px-6 pt-8 pb-12 transition-transform duration-500 ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <Logo tone="light" size={34} />
            <button onClick={() => setOpen(false)} className="p-2 rounded-full bg-divider/40">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-semibold text-ink py-3 border-b border-divider"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 magnetic-btn flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-semibold w-full"
          >
            Book a call
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  )
}

/* ----------------------------------------------------------------
   Hero
---------------------------------------------------------------- */
function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' })
      gsap.from('.hero-cta, .hero-meta', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={heroRef} className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=80"
          alt="Abstract circuit board detail"
          className="w-full h-full object-cover brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-deep/85 via-deep/50 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/20 to-transparent" />
      </div>

      {/* Floating tech particles, top-right */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-[18%] h-2.5 w-2.5 rounded-sm bg-accent/70 animate-float"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute top-[42%] right-[27%] font-mono text-xs text-white/50 animate-float"
          style={{ animationDelay: '1.5s' }}
        >
          {'</>'}
        </div>
        <div
          className="absolute top-[58%] right-[11%] h-1.5 w-1.5 rounded-full bg-primary-light/70 animate-float"
          style={{ animationDelay: '3s' }}
        />
        <div
          className="absolute top-[15%] right-[8%] h-1 w-1 rounded-full bg-white/50 animate-float"
          style={{ animationDelay: '2.2s' }}
        />
      </div>

      {/* Top frame */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-20 min-h-[100dvh] flex flex-col justify-end">
        <p className="hero-meta font-mono text-xs uppercase tracking-[0.25em] text-white/70 mb-6">
          Automations · AI Agents · Websites · Dashboards
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.95] max-w-5xl">
          <span className="hero-line-1 block">Automations that save{' '}you</span>
          <span className="hero-line-2 block font-serif italic font-medium">
            real time and real money.
          </span>
        </h1>
        <p className="hero-meta mt-8 max-w-xl text-white/70 text-base sm:text-lg leading-relaxed">
          Spencer Business Systems builds automations that take work off your plate and a
          dashboard to view and control them. Add a website, ongoing support, or anything
          else your business needs.
        </p>
        <div className="hero-cta mt-10 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-primary/30"
          >
            Book a call
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="tel:3044455706"
            className="magnetic-btn inline-flex items-center gap-2 glass-dark text-white px-6 py-3 rounded-full font-semibold border border-white/15"
          >
            <Phone className="h-4 w-4" />
            (304) 445-5706
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-6 sm:right-12 hidden md:flex flex-col items-center gap-2 text-white/50">
          <span className="font-mono uppercase text-[10px] tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Feature Card 1 — Website Shuffler
---------------------------------------------------------------- */
function WebsiteShuffler() {
  const items = [
    { tag: 'Website', label: 'Custom-coded, not a template', Icon: Globe },
    { tag: 'Optional', label: 'Wire it into your dashboard if you want', Icon: LayoutDashboard },
    { tag: 'Built for you', label: 'Designed around your business, not a theme', Icon: CheckCircle2 },
  ]
  const [stack, setStack] = useState(items)

  useEffect(() => {
    const interval = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-32 w-full">
      {stack.map((item, i) => {
        const offset = i
        const total = stack.length
        const Icon = item.Icon
        return (
          <div
            key={item.tag}
            style={{
              transform: `translate(${offset * 10}px, ${offset * 10}px) scale(${1 - offset * 0.045})`,
              zIndex: total - offset,
              transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            className="absolute inset-0 bg-white border border-divider rounded-3xl p-4 shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-1 rounded-full">
                {item.tag}
              </span>
              <Icon className="h-4 w-4 text-primary" strokeWidth={2.2} />
            </div>
            <div className="mt-3 font-display text-base font-semibold text-ink leading-tight">
              {item.label}
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              {Array.from({ length: 24 }).map((_, idx) => (
                <span
                  key={idx}
                  className="h-1 w-1 rounded-full"
                  style={{ background: idx < 24 - offset * 6 ? '#F0A23D' : '#E0E0E0' }}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 2 — NetworkStatus (signature animation)
   Tech/SaaS theme: network-node graph with pulsing traffic,
   live status strip, deploy counter.
---------------------------------------------------------------- */
function NetworkStatus() {
  const [statusIdx, setStatusIdx] = useState(0)
  const [deploys, setDeploys] = useState(12)

  const statuses = [
    { text: 'All systems nominal', label: 'Stable', tone: 'emerald' },
    { text: 'Deploying', label: 'Deploy', tone: 'accent' },
    { text: 'Automations running', label: 'Active', tone: 'primary' },
    { text: 'Live', label: 'Shipped', tone: 'emerald' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((idx) => {
        const next = (idx + 1) % statuses.length
        if (statuses[next].label === 'Shipped') setDeploys((d) => d + 1)
        return next
      })
    }, 2300)
    return () => clearInterval(interval)
  }, [])

  const nodes = [
    { x: 30, y: 70 },
    { x: 95, y: 30 },
    { x: 95, y: 110 },
    { x: 165, y: 18 },
    { x: 165, y: 70 },
    { x: 165, y: 122 },
    { x: 230, y: 70 },
  ]
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 4],
    [2, 5],
    [3, 6],
    [4, 6],
    [5, 6],
  ]

  const status = statuses[statusIdx]
  const toneText =
    status.tone === 'emerald' ? 'text-emerald-600' : status.tone === 'accent' ? 'text-accent-dark' : 'text-primary-dark'
  const toneDot =
    status.tone === 'emerald' ? 'bg-emerald-500' : status.tone === 'accent' ? 'bg-accent' : 'bg-primary'

  return (
    <div
      className="relative h-44 w-full rounded-3xl overflow-hidden border border-primary/15"
      style={{ background: 'linear-gradient(180deg, #EEF3F8 0%, #DCE6F0 70%, #C9D9E8 100%)' }}
    >
      {/* Atmospheric blur blobs */}
      <div className="absolute -top-8 -left-6 h-20 w-32 rounded-full bg-white/50 blur-2xl" />
      <div className="absolute top-2 right-10 h-14 w-24 rounded-full bg-white/40 blur-xl" />

      {/* Header strip */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <Network className="h-3.5 w-3.5 text-primary-dark" strokeWidth={2.2} />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-dark">
            Live status
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display font-bold text-sm text-ink tabular-nums">
            {String(deploys).padStart(2, '0')}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted">deploys</span>
        </div>
      </div>

      {/* Network node graph */}
      <svg
        className="absolute inset-x-3 top-11 bottom-11"
        viewBox="0 0 260 140"
        preserveAspectRatio="xMidYMid meet"
      >
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="#3A5C85"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i === 6 ? 6 : 4.5}
            fill={i === 6 ? '#F0A23D' : '#3A5C85'}
            style={{
              animation: `node-pulse 2.4s ease-in-out ${i * 0.25}s infinite`,
              transformOrigin: `${n.x}px ${n.y}px`,
              transformBox: 'view-box',
            }}
          />
        ))}
      </svg>

      {/* Bottom status */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`relative h-2 w-2 rounded-full ${toneDot}`}>
            {status.tone === 'accent' && (
              <span className={`absolute inset-0 rounded-full ${toneDot} animate-ping`} />
            )}
          </span>
          <span
            key={status.text}
            className={`font-mono text-[10px] truncate ${toneText}`}
            style={{ animation: 'rain-fadein 0.35s ease-out' }}
          >
            {status.text}
          </span>
        </div>
        <span className={`font-mono text-[9px] uppercase tracking-[0.2em] whitespace-nowrap pl-2 ${toneText}`}>
          {status.label}
        </span>
      </div>

      <style>{`
        @keyframes node-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 3 — Booking Scheduler (cursor + calendar)
---------------------------------------------------------------- */
function BookingScheduler() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const [step, setStep] = useState(0) // 0..4
  const activeDay = 2

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 5)
    }, 1400)
    return () => clearInterval(interval)
  }, [])

  const cursorPos = (() => {
    switch (step) {
      case 0:
        return { x: 8, y: 110, opacity: 0 }
      case 1:
        return { x: 60, y: 60, opacity: 1 }
      case 2:
        return { x: 60 + activeDay * 36, y: 60, opacity: 1 }
      case 3:
        return { x: 60 + activeDay * 36, y: 60, opacity: 1 }
      case 4:
        return { x: 130, y: 130, opacity: 1 }
      default:
        return { x: 8, y: 110, opacity: 0 }
    }
  })()

  return (
    <div className="relative h-44 w-full bg-white border border-divider rounded-3xl p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">This week</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-0.5 rounded-full">
          Booking
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((d, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center h-9 rounded-xl text-xs font-medium transition-all duration-300 ${
              step >= 3 && idx === activeDay
                ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30'
                : 'bg-background text-ink'
            }`}
          >
            <span className="font-mono text-[9px] text-muted">{d}</span>
            <span className="font-display font-semibold text-sm">{idx + 10}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full py-2.5 rounded-2xl font-medium text-xs transition-all duration-300 ${
          step === 4
            ? 'bg-accent text-white scale-[1.02] shadow-md shadow-accent/30'
            : 'bg-divider/40 text-muted'
        }`}
      >
        {step >= 3 ? '✓ Call booked · 20 min' : 'Pick a day'}
      </button>

      <div
        className="absolute pointer-events-none transition-all duration-500 ease-out"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          opacity: cursorPos.opacity,
          transform: step === 3 ? 'scale(0.85)' : 'scale(1)',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 3L19 12L12 13L9 20L5 3Z"
            fill="#1A1A1A"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Features Section
---------------------------------------------------------------- */
function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      })
      gsap.from('.feature-heading > *', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 95%', once: true },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const cards = [
    {
      eyebrow: '01 / Website',
      heading: 'The Website',
      sub: 'Custom-coded, wired into your dashboard',
      text: 'Built custom for your business and wired straight into your automations and dashboard, so everything shows up in one place.',
      bullets: ['Custom-coded, not a template', 'Wired into your automations and dashboard', 'Pages, forms, and booking, built around what you need'],
      Component: WebsiteShuffler,
      note: "Optional — add one whenever you're ready.",
    },
    {
      eyebrow: '02 / Dashboard — optional',
      heading: 'The Dashboard',
      sub: 'View and control your automations',
      text: "Automations run on their own in the background. If you want one place to see what's happening and switch things on or off, the dashboard shows it all live.",
      bullets: ['See every automation running, live', 'Turn things on or off without touching code', 'Optional — automations work fine without it'],
      Component: NetworkStatus,
      link: { href: '#demo', label: 'See a live dashboard demo' },
    },
    {
      eyebrow: '03 / Get started',
      heading: 'Book a 20-Minute Call',
      sub: 'No sales pitch, just a plan',
      text: "Pick a time, tell me what's slowing you down, and leave with a clear plan for what automations, and a website or dashboard if you want them, would look like for your business.",
      bullets: ['20 minutes, no obligation', 'Straight answers on scope & cost', 'Direct line to the person building it'],
      Component: BookingScheduler,
    },
  ]

  return (
    <section id="approach" ref={sectionRef} className="relative py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="feature-heading max-w-3xl mb-16 sm:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
            ╱ How it comes together
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Pick what you need.
            <span className="block font-serif italic font-medium text-primary-dark mt-1">
              One system.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <article
              key={idx}
              className="feature-card group relative bg-surface border border-divider rounded-5xl p-6 sm:p-8 hover:border-primary/40 transition-colors duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {card.eyebrow}
                </span>
                <ArrowUpRight
                  className="h-5 w-5 text-ink/30 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  strokeWidth={1.8}
                />
              </div>

              <card.Component />

              <div className="mt-6">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-ink leading-tight">
                  {card.heading}
                </h3>
                <p className="font-serif italic text-primary-dark text-sm mt-1">{card.sub}</p>
                <p className="text-muted text-[15px] mt-4 leading-relaxed">{card.text}</p>
                <ul className="mt-5 space-y-2">
                  {card.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                {card.link && (
                  <a
                    href={card.link.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-dark lift-on-hover"
                  >
                    {card.link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </a>
                )}
                {card.note && (
                  <p className="mt-5 text-xs text-muted/80 italic">{card.note}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   CountUp — animated counter (IntersectionObserver + RAF)
---------------------------------------------------------------- */
function CountUp({ end, suffix = '', duration = 2000 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTs = performance.now()
          const tick = (now) => {
            const t = Math.min(1, (now - startTs) / duration)
            const eased = 1 - Math.pow(1 - t, 3)
            setValue(Math.round(end * eased))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  )
}

/* ----------------------------------------------------------------
   Pillars — three honest numbers
---------------------------------------------------------------- */
function Pillars() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const pillars = [
    {
      n: '01',
      title: 'Every project',
      end: 100,
      suffix: '%',
      label: 'Custom-built',
      desc: 'Every site, automation, and agent is built for your business specifically.',
    },
    {
      n: '02',
      title: 'Always running',
      end: 24,
      suffix: '/7',
      label: 'Automations live',
      desc: 'Automations and AI agents keep working around the clock.',
    },
    {
      n: '03',
      title: 'Direct line',
      end: 1,
      suffix: '',
      label: 'Point of contact',
      desc: 'You work directly with the person building your systems.',
    },
  ]

  return (
    <section ref={ref} className="relative py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[44rem] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24 transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="max-w-2xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-primary-dark mb-5">
              ╱ The standard
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
              Built right.
              <span className="block font-serif italic font-medium text-primary-dark">
                Every time.
              </span>
            </h2>
          </div>
          <p className="text-muted text-lg leading-relaxed max-w-md lg:text-right">
            Every system is custom-built, runs around the clock, and comes with direct
            access to the person who built it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-divider rounded-5xl overflow-hidden border border-divider shadow-xl shadow-primary/5">
          {pillars.map((p, i) => (
            <article
              key={i}
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
              className={`pillar-card relative bg-surface p-9 sm:p-12 group overflow-hidden transition-all duration-1000 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  {p.n} / {p.title}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
              </div>

              <div className="flex items-end gap-1 leading-none">
                <span className="font-display font-extrabold text-[5rem] sm:text-[6.5rem] leading-[0.85] text-ink tabular-nums tracking-tight">
                  <CountUp end={p.end} suffix={p.suffix} duration={1800 + i * 200} />
                </span>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-dark mt-5">
                {p.label}
              </p>

              <p className="text-muted text-[15px] mt-6 leading-relaxed max-w-xs">{p.desc}</p>

              <div className="absolute bottom-0 left-9 right-9 sm:left-12 sm:right-12 h-px bg-divider overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{ animation: `pillar-sweep 4s ease-in-out ${i * 0.4}s infinite` }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pillar-sweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}

/* ----------------------------------------------------------------
   Protocol — Sticky Stacking Cards
---------------------------------------------------------------- */
function Protocol() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top top+=100',
            endTrigger: cards[cards.length - 1],
            end: 'top top+=120',
            scrub: 1,
          },
          scale: 0.92,
          filter: 'blur(6px)',
          opacity: 0.5,
          ease: 'none',
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const steps = [
    {
      num: '01',
      title: 'Discover & Map',
      tagline: 'We listen first.',
      text: 'Understand the business, map out what should be automated, and decide what the dashboard needs to show.',
      bullets: [
        'Working session on your current workflow',
        'Identify manual busywork to automate',
        "Define what 'done' looks like",
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      alt: 'Team mapping out a workflow on a laptop',
      meta: 'Step 1 / Discover',
    },
    {
      num: '02',
      title: 'Build',
      tagline: 'We wire it together.',
      text: 'Automations and AI agents get built and wired together as one system, a website is added only if you want one.',
      bullets: [
        'Automations connected to the tools you already use',
        'AI agents trained on your actual processes',
        'A custom-coded website, if you want one',
      ],
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
      alt: 'Code on a dark monitor',
      meta: 'Step 2 / Build',
    },
    {
      num: '03',
      title: 'Launch & Support',
      tagline: "We don't disappear.",
      text: 'Go live, then ongoing support as the business changes.',
      bullets: [
        'Full walkthrough of your new dashboard',
        'Direct line for changes and fixes',
        'Systems evolve as your business does',
      ],
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
      alt: 'Person providing remote support at a laptop',
      meta: 'Step 3 / Launch',
    },
  ]

  return (
    <section id="process" ref={containerRef} className="relative px-4 sm:px-6 py-20">
      <div className="max-w-7xl mx-auto mb-16 px-2 sm:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
          ╱ How we work
        </span>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight max-w-3xl">
          Three steps.
          <span className="block font-serif italic font-medium text-primary-dark">
            No surprises.
          </span>
        </h2>
      </div>

      <div className="space-y-8">
        {steps.map((step, idx) => (
          <article
            key={idx}
            className="protocol-card sticky top-24 sm:top-28 mx-auto max-w-6xl bg-gradient-to-br from-surface to-background border border-divider rounded-6xl overflow-hidden shadow-2xl shadow-primary/5"
          >
            <div className="grid lg:grid-cols-5 gap-0 min-h-[48vh] lg:min-h-[54vh]">
              <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
                    {step.meta}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">
                    Spencer Protocol
                  </span>
                </div>

                <div className="my-12">
                  <span className="font-display font-extrabold text-[7rem] sm:text-[10rem] leading-none text-primary/15 -mb-4 block">
                    {step.num}
                  </span>
                  <h3 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.02] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-serif italic text-primary-dark text-2xl sm:text-3xl mt-3">
                    {step.tagline}
                  </p>
                </div>

                <div>
                  <p className="text-muted text-base sm:text-lg leading-relaxed max-w-lg">
                    {step.text}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {step.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-ink/80">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-2 relative overflow-hidden min-h-[300px] lg:min-h-full bg-deep">
                <img
                  src={step.image}
                  alt={step.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-deep/15" />
                <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full pl-3 pr-4 py-1.5 shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink">
                    Step {step.num}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest text-white/70">
                  {step.num} / Spencer Business Systems
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   All Services Grid
---------------------------------------------------------------- */
function ServicesGrid() {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', {
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.06,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden rounded-t-6xl"
    >
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              ╱ Everything, under one roof
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.05] tracking-tight">
              The full toolkit,
              <span className="block font-serif italic font-medium text-accent">
                one point of contact.
              </span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-base leading-relaxed">
            No agencies, no sub-contracted work. Every service below is built and run by the
            same person you talk to.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-4xl overflow-hidden">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon
            return (
              <div
                key={i}
                className="svc-tile group bg-deep p-7 sm:p-9 hover:bg-white/[0.02] transition-colors duration-500 relative"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <Icon className="h-5 w-5 text-primary group-hover:text-white" strokeWidth={2} />
                  </div>
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl mb-3">{svc.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{svc.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Trust Signals
---------------------------------------------------------------- */
function TrustSignals() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const badges = [
    {
      Icon: ShieldCheck,
      title: 'Custom-built, not templated',
      text: 'Every system is built specifically for how your business actually runs.',
    },
    {
      Icon: Zap,
      title: 'Automations + AI, first',
      text: 'The systems that actually run your business, day-to-day. A website is there too, if you want one.',
    },
    {
      Icon: MessageCircle,
      title: 'Direct line to the builder',
      text: 'No account managers or support tickets. You talk directly to the person who built it.',
    },
  ]

  return (
    <section ref={ref} className="relative py-24 sm:py-32 lg:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
            ╱ Why work with me
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink mt-3 tracking-tight">
            Built different, on purpose.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {badges.map(({ Icon, title, text }, i) => (
            <div
              key={i}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`bg-white border border-divider rounded-4xl p-6 hover:border-primary/40 transition-all duration-700 ease-out shadow-sm ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Icon className="h-6 w-6 text-primary mb-3" strokeWidth={1.8} />
              <h3 className="font-display font-bold text-lg text-ink mb-1.5">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contact"
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full shadow-xl shadow-primary/30"
          >
            Book a call
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Demo + Calendly CTA
---------------------------------------------------------------- */
function DemoCalendlySection() {
  return (
    <section id="demo" className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
            ╱ See it in action
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink mt-3 tracking-tight">
            Explore a real dashboard.
          </h2>
        </div>

        <Link
          to="/dashboard-demo"
          className="group relative block max-w-5xl mx-auto bg-deep text-white rounded-5xl overflow-hidden hover:-translate-y-1 transition-transform duration-500 shadow-2xl shadow-primary/10"
        >
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
          <div className="relative grid md:grid-cols-5 items-center">
            <div className="md:col-span-3 p-10 sm:p-14">
              <div className="h-12 w-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary transition">
                <LayoutDashboard className="h-5 w-5 text-primary group-hover:text-white" />
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl mb-3">
                See a sample dashboard
              </h3>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
                Explore a live preview built from a real client system: automations, AI agents,
                and everything in one view.
              </p>
              <span className="inline-flex items-center gap-2 bg-accent text-deep font-semibold text-sm px-6 py-3 rounded-full">
                View demo
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>

            <div className="hidden md:flex md:col-span-2 h-full items-center justify-center p-10 border-l border-white/10">
              <div className="w-full space-y-2.5">
                <div className="h-3 w-2/3 rounded-full bg-white/15" />
                <div className="h-16 rounded-2xl bg-white/10 border border-white/10" />
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="h-14 rounded-xl bg-primary/25 border border-primary/30" />
                  <div className="h-14 rounded-xl bg-white/10 border border-white/10" />
                </div>
                <div className="h-3 w-1/2 rounded-full bg-white/15" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Contact Form
---------------------------------------------------------------- */
function Field({ label, type = 'text', required, value, onChange }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition font-body"
      />
    </div>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', zip: '', message: '' })
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const dropRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1200)
  }

  const handleFiles = (newFiles) => {
    setFiles((prev) => [...prev, ...Array.from(newFiles)].slice(0, 5))
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: heading + info */}
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
              ╱ Get in touch
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              Let&rsquo;s find
              <span className="block font-serif italic font-medium text-primary-dark">
                time to talk.
              </span>
            </h2>
            <p className="text-muted text-lg mt-6 leading-relaxed max-w-md">
              Book a short call and we&rsquo;ll walk through what a custom site, automations, and
              a dashboard could look like for your business.
            </p>

            <a
              href="https://calendly.com/pauljohnsonspencer/30min?back=1&month=2026-07"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-8 flex items-center gap-5 p-6 rounded-3xl bg-primary text-white overflow-hidden hover:-translate-y-0.5 transition-transform duration-300 shadow-xl shadow-primary/30 ring-pulse"
            >
              <span className="h-14 w-14 shrink-0 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center group-hover:bg-white transition">
                <Calendar className="h-6 w-6 text-white group-hover:text-primary" />
              </span>
              <span className="flex-1">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-white/70 mb-1">
                  Prefer to skip the form?
                </span>
                <span className="block font-display font-bold text-lg leading-snug">
                  Book a 30-minute call directly on Calendly
                </span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 bg-white text-primary font-semibold text-sm px-4 py-2.5 rounded-full shrink-0">
                Open
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>

            <div className="mt-10 space-y-4">
              <a href="tel:3044455706" className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Phone className="h-5 w-5 text-primary group-hover:text-white" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                    Call direct
                  </span>
                  <span className="font-display font-semibold text-ink text-lg">(304) 445-5706</span>
                </span>
              </a>

              <a
                href="mailto:support@spencerbusinesssystems.com"
                className="lift-on-hover flex items-center gap-4 group"
              >
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Mail className="h-5 w-5 text-primary group-hover:text-white" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                    Email
                  </span>
                  <span className="font-display font-semibold text-ink text-lg break-all">
                    support@spencerbusinesssystems.com
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                    Based in
                  </span>
                  <span className="font-display font-semibold text-ink text-lg">
                    Milwaukee to Madison Area, WI
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-10 p-5 rounded-3xl bg-primary/5 border border-primary/15">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary-dark mb-2">
                Scheduling
              </p>
              <p className="text-sm text-muted leading-relaxed">
                Hours vary, book a call and pick a time that works for you.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-surface border border-divider rounded-5xl p-7 sm:p-10 shadow-xl shadow-primary/5"
            >
              {status !== 'sent' ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field
                      label="Name"
                      required
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                    />
                    <Field
                      label="Email address"
                      type="email"
                      required
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                    />
                    <Field
                      label="Phone number"
                      type="tel"
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v })}
                    />
                    <Field
                      label="Zip code"
                      value={form.zip}
                      onChange={(v) => setForm({ ...form, zip: v })}
                    />
                  </div>

                  <div className="mt-5">
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
                      Your message *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      placeholder="Tell me a bit about your business and what you're hoping to automate..."
                      className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition resize-none font-body"
                    />
                  </div>

                  {/* File upload zone */}
                  <div
                    ref={dropRef}
                    onDragOver={(e) => {
                      e.preventDefault()
                      dropRef.current?.classList.add('!border-primary', '!bg-primary/5')
                    }}
                    onDragLeave={() => {
                      dropRef.current?.classList.remove('!border-primary', '!bg-primary/5')
                    }}
                    onDrop={(e) => {
                      e.preventDefault()
                      dropRef.current?.classList.remove('!border-primary', '!bg-primary/5')
                      handleFiles(e.dataTransfer.files)
                    }}
                    className="mt-5 border-2 border-dashed border-divider rounded-3xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <input
                      type="file"
                      multiple
                      id="file-up"
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                      accept="image/*"
                    />
                    <label htmlFor="file-up" className="cursor-pointer block">
                      <Upload className="h-6 w-6 mx-auto text-primary-dark mb-2" />
                      <p className="font-display font-semibold text-ink text-sm">
                        Attach screenshots or reference images
                      </p>
                      <p className="text-xs text-muted mt-1">
                        Click or drag files here (max 5 images)
                      </p>
                      {files.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                          {files.map((f, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 bg-primary/10 text-primary-dark text-xs px-3 py-1.5 rounded-full font-mono"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              {f.name.length > 22 ? f.name.slice(0, 22) + '…' : f.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-xs text-muted">
                      I&rsquo;ll get back to you shortly. Fields marked * are required.
                    </p>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary/30 disabled:opacity-50"
                    >
                      {status === 'sending' ? 'Sending...' : 'Send'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-primary-dark" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-ink mb-3">
                    Thanks, we&rsquo;ll be in touch
                  </h3>
                  <p className="text-muted max-w-md mx-auto">
                    I&rsquo;ll reach out shortly to find a time that works and talk through what
                    you need.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="relative bg-deep text-white rounded-t-6xl mt-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/20 blur-3xl" />

      <div className="relative px-6 sm:px-10 lg:px-16 pt-20 pb-10 max-w-7xl mx-auto">
        {/* Top: big tagline */}
        <div className="border-b border-white/10 pb-12 mb-12">
          <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl leading-[0.92] tracking-tight">
            Systems built
            <span className="font-serif italic font-medium text-accent block">
              to just work.
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <p className="text-white/50 max-w-md">
              One person, one system, built for your business.
            </p>
            <a
              href="#contact"
              className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full self-start sm:self-auto"
            >
              Book a call
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex flex-col gap-3">
              <Logo tone="dark" size={40} />
              <p className="font-serif italic text-white/70 text-lg max-w-xs">
                Custom-built systems, run by one person who answers the phone.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
                  Systems Live
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">
              Services
            </p>
            <ul className="space-y-2.5">
              {SERVICES.map((s, i) => (
                <li key={i}>
                  <a href="#services" className="text-white/65 hover:text-accent transition text-sm">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">
              Company
            </p>
            <ul className="space-y-2.5">
              <li>
                <a href="#approach" className="text-white/65 hover:text-accent transition text-sm">
                  Approach
                </a>
              </li>
              <li>
                <a href="#process" className="text-white/65 hover:text-accent transition text-sm">
                  Process
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/65 hover:text-accent transition text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">
              Contact
            </p>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:3044455706" className="text-white/65 hover:text-accent transition text-sm">
                  (304) 445-5706
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@spencerbusinesssystems.com"
                  className="text-white/65 hover:text-accent transition text-sm break-all"
                >
                  support@spencerbusinesssystems.com
                </a>
              </li>
              <li className="text-white/65 text-sm">Milwaukee to Madison Area, WI</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <span className="font-mono text-xs text-white/40">
            © {new Date().getFullYear()} Spencer Business Systems. All rights reserved.
          </span>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/50 text-xs font-mono">
            <Link to="/privacy" className="hover:text-accent transition">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-accent transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------
   App
---------------------------------------------------------------- */
export default function App() {
  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pillars />
        <Protocol />
        <ServicesGrid />
        <TrustSignals />
        <DemoCalendlySection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
