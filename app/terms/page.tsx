'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'
import LegalPage from '@/components/legal/LegalPage'
import { getConfig } from '@/lib/config'
import '../styles/legal.css'

export default function TermsPage() {
  const cfg = getConfig()
  return (
    <div>
      <Header clinic={cfg.clinic} />
      <main>
        <LegalPage
          badge="Legal"
          title="Terms and Conditions"
          updated="March 1, 2026"
          sections={[
            { title: 'Acceptance', content: 'By using this website you agree to these terms.' },
          ]}
        />
        <Footer clinic={cfg.clinic} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </div>
  )
}
