import { Link } from 'react-router-dom'
import { ArrowLeft, LayoutDashboard } from 'lucide-react'

export default function DashboardDemo() {
  return (
    <div className="min-h-screen bg-background text-ink flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary lift-on-hover mb-10"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <div className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
          <LayoutDashboard className="h-7 w-7 text-primary" />
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight mb-3">
          Dashboard demo coming soon
        </h1>
        <p className="text-muted leading-relaxed">
          This page will hold a live walkthrough of a real client dashboard. In the meantime,
          book a call and I&rsquo;ll show it to you directly.
        </p>
        <a
          href="https://calendly.com/pauljohnsonspencer/30min?back=1&month=2026-07"
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic-btn mt-8 inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full"
        >
          Book a call instead
        </a>
      </div>
    </div>
  )
}
