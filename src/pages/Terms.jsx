import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary lift-on-hover mb-10">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <h1 className="font-display text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
        <div className="space-y-6 text-muted leading-relaxed">
          <p>
            These terms govern your use of the Spencer Business Systems website. By using this site,
            you agree to the terms below.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink pt-4">Scope of work</h2>
          <p>
            Nothing on this website constitutes a binding agreement. Project scope, timelines, and
            pricing for websites, automations, AI agents, and dashboards are agreed separately in
            writing before any work begins.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink pt-4">Content</h2>
          <p>
            All content on this site, including copy, design, and code, is the property of Spencer
            Business Systems unless otherwise noted.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink pt-4">Contact</h2>
          <p>
            Questions about these terms can be sent to{' '}
            <a href="mailto:support@spencerbusinesssystems.com" className="text-primary lift-on-hover">
              support@spencerbusinesssystems.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}
