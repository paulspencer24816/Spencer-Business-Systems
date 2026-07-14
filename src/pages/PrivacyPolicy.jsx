import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary lift-on-hover mb-10">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <h1 className="font-display text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-muted leading-relaxed">
          <p>
            Spencer Business Systems ("we", "us") respects your privacy. This policy explains what
            information we collect through this website and how it's used.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink pt-4">Information we collect</h2>
          <p>
            When you submit the contact form, we collect the name, email, phone number, and message
            you provide. We do not collect this information through any other means on this site.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink pt-4">How we use it</h2>
          <p>
            Information submitted through the contact form is used solely to respond to your inquiry
            and discuss potential work. We do not sell or share your information with third parties.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink pt-4">Contact</h2>
          <p>
            Questions about this policy can be sent to{' '}
            <a href="mailto:support@spencerbusinesssystems.com" className="text-primary lift-on-hover">
              support@spencerbusinesssystems.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}
