import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  LayoutGrid,
  Settings,
  Users,
  Inbox,
  BookOpen,
  PanelLeft,
  FileText,
  UserPlus,
  BarChart3,
  CalendarClock,
  Sparkles,
  ChevronRight,
} from 'lucide-react'

const AUTOMATIONS = [
  {
    title: 'Send invoice',
    description: 'Generate a PDF invoice and send it via email.',
    icon: FileText,
    status: 'active',
  },
  {
    title: 'Onboard client',
    description: 'Send a personalized welcome email to a new client.',
    icon: UserPlus,
    status: 'active',
  },
  {
    title: 'Friday report',
    description:
      'Weekly and monthly KPI digest with plain-English summaries and anomaly alerts, emailed automatically.',
    icon: BarChart3,
    status: 'active',
  },
  {
    title: 'Scheduling & reminders',
    description:
      'Appointment confirmations and reschedules, no-show follow-ups, overdue task nudges, and recurring check-ins, all sent automatically.',
    icon: CalendarClock,
    status: 'active',
  },
]

const STATUS_COLOR = {
  active: '#4cb86a',
  draft: '#867f79',
  paused: '#e2a520',
  neutral: '#867f79',
}

function StatusDot({ status }) {
  const color = STATUS_COLOR[status] || STATUS_COLOR.neutral
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      {status === 'active' && (
        <span
          className="absolute inset-0 rounded-full opacity-60 animate-ping"
          style={{ background: color }}
        />
      )}
      <span className="relative h-2 w-2 rounded-full" style={{ background: color }} />
    </span>
  )
}

function Stat({ label, value, dotted }) {
  return (
    <div className="flex flex-col gap-3 bg-white px-6 py-7">
      <div className="flex items-center gap-2">
        {dotted && <StatusDot status={dotted} />}
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6a615c]">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-dash-display text-4xl font-medium tracking-tight text-[#16100d] tabular-nums">
          {value}
        </span>
        <span className="text-xs text-[#6a615c]">total</span>
      </div>
    </div>
  )
}

function NavItem({ icon: Icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm select-none ${
        active
          ? 'border border-[#e2ddd8] bg-[#b95115]/[0.08] text-[#16100d] font-medium'
          : 'text-[#6a615c]'
      }`}
    >
      <Icon className="h-4 w-4" strokeWidth={1.8} />
      {label}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="px-3 pb-1.5 pt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6a615c]">
      {children}
    </div>
  )
}

export default function DashboardDemo() {
  const total = AUTOMATIONS.length
  const active = AUTOMATIONS.filter((a) => a.status === 'active').length
  const draft = AUTOMATIONS.filter((a) => a.status === 'draft').length

  return (
    <div className="font-dash-body min-h-screen bg-[#faf7f3] text-[#16100d]">
      {/* Back-to-site bar */}
      <div className="border-b border-[#e2ddd8] bg-white/80 backdrop-blur px-4 py-2.5">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6a615c] hover:text-[#16100d] transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Spencer Business Systems
          </Link>
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#b95115] font-semibold">
            Sample preview · not live data
          </span>
        </div>
      </div>

      <div className="flex h-[calc(100vh-41px)] w-full overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex h-full w-64 shrink-0 flex-col border-r border-[#e2ddd8] bg-white">
          <div className="flex h-14 items-center border-b border-[#e2ddd8] px-4">
            <span className="flex items-center gap-2.5">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-[#b95115]">
                <span className="block h-2 w-2 rounded-[2px] bg-white" />
              </span>
              <span className="font-dash-display text-[15px] font-medium tracking-tight">
                Acme Co
              </span>
            </span>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-3">
            <SectionLabel>Overview</SectionLabel>
            <NavItem icon={LayoutGrid} label="Dashboard" active />

            <SectionLabel>Automations</SectionLabel>
            {AUTOMATIONS.map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#6a615c]"
              >
                <StatusDot status={a.status} />
                <span className="truncate">{a.title}</span>
              </div>
            ))}
            <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#b95115]">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} />
              <span className="truncate">And much more</span>
            </div>

            <SectionLabel>Support</SectionLabel>
            <NavItem icon={Inbox} label="Support inbox" />
            <NavItem icon={BookOpen} label="Knowledge base" />
          </nav>

          <div className="border-t border-[#e2ddd8] px-3 py-3">
            <NavItem icon={Users} label="Team" />
            <NavItem icon={Settings} label="Settings" />
            <div className="mt-2 flex items-center gap-2.5 rounded-lg px-3 py-2">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#f3e9e2] text-[11px] font-semibold text-[#b95115]">
                A
              </span>
              <span className="text-xs text-[#6a615c]">owner@example.com</span>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <div className="flex h-14 shrink-0 items-center gap-3 border-b border-[#e2ddd8] bg-white/80 px-5 backdrop-blur">
            <PanelLeft className="h-4 w-4 text-[#6a615c] md:hidden" />
            <span className="text-sm text-[#6a615c]">Dashboard</span>
          </div>

          <main
            className="relative min-h-0 flex-1 overflow-y-auto"
            style={{
              background:
                'radial-gradient(ellipse at top left, rgba(185,81,21,0.06), transparent 50%), radial-gradient(ellipse at top right, rgba(185,81,21,0.06), transparent 50%), #faf7f3',
            }}
          >
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 sm:px-8 py-10">
              {/* Hero */}
              <header className="flex flex-col gap-1.5 pt-2">
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6a615c]">
                  Overview
                </div>
                <h1 className="font-dash-display text-3xl font-medium tracking-tight">
                  Welcome back, there
                </h1>
                <p className="text-sm text-[#6a615c]">
                  Here&rsquo;s what&rsquo;s happening with your automations.
                </p>
              </header>

              {/* Stats */}
              <section className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[#e2ddd8] bg-[#e2ddd8] sm:grid-cols-3">
                <Stat label="Total" value={total} />
                <Stat label="Active" value={active} dotted="active" />
                <Stat label="Drafts" value={draft} dotted="draft" />
              </section>

              {/* Automations list */}
              <section className="flex flex-col gap-2">
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6a615c]">
                  Automations
                </div>
                <div className="overflow-hidden rounded-xl border border-[#e2ddd8] bg-white">
                  <ul className="divide-y divide-[#e2ddd8]">
                    {AUTOMATIONS.map((a, i) => {
                      const Icon = a.icon
                      return (
                        <li key={i} className="group flex items-center gap-4 px-6 py-4">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#e2ddd8] bg-[#faf7f3]">
                            <Icon className="h-4 w-4 text-[#b95115]" strokeWidth={1.8} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <StatusDot status={a.status} />
                              <span className="text-sm font-medium">{a.title}</span>
                            </div>
                            <p className="mt-0.5 truncate text-xs text-[#6a615c]">
                              {a.description}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 shrink-0 text-[#c9c3bd] transition-transform group-hover:translate-x-0.5" />
                        </li>
                      )
                    })}

                    {/* And much more */}
                    <li className="group flex items-center gap-4 border-t border-dashed border-[#c9c3bd] bg-[#b95115]/[0.03] px-6 py-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-dashed border-[#b95115]/40 bg-white">
                        <Sparkles className="h-4 w-4 text-[#b95115]" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="text-sm font-medium text-[#b95115]">
                          And much more
                        </span>
                        <p className="mt-0.5 truncate text-xs text-[#6a615c]">
                          Have something specific in mind? Tell me what&rsquo;s eating your time
                          and I&rsquo;ll build it.
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-[#b95115]/50 transition-transform group-hover:translate-x-0.5" />
                    </li>
                  </ul>
                </div>
              </section>

              {/* Recent activity */}
              <section className="flex flex-col gap-2">
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6a615c]">
                  Recent activity
                </div>
                <div className="rounded-xl border border-[#e2ddd8] bg-white">
                  <div className="flex items-center gap-3 px-6 py-14">
                    <StatusDot status="neutral" />
                    <p className="text-sm text-[#6a615c]">
                      No runs recorded yet, automations will report activity here as they fire.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
