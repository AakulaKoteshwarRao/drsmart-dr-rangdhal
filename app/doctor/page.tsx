import Header from '@/components/Header'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generatePageSchemas } from '@/lib/schema/index.js'
import { buildSchemaConfig } from '@/lib/schema/master.config.js'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import DoctorHero from '@/components/doctor/DoctorHero'
import CredentialsGrid from '@/components/doctor/CredentialsGrid'
import DoctorFAQ from '@/components/doctor/DoctorFAQ'
import { loadConfig } from '@/lib/config'
import Footer from '@/components/Footer'
import '../styles/doctor.css'

export default async function DoctorPage() {
  const cfg = await loadConfig()
  const sc = buildSchemaConfig(cfg)
  const pageSchemas = generatePageSchemas(sc, {
    pageType: 'doctor',
    meta: {
      path:        '/doctor',
      name:        `${sc.doctor.name} | ${sc.clinic.name}`,
      description: sc.clinic.description,
      image:       sc.clinic.image,
      breadcrumb:  [
        { name: 'Home', url: sc.site.url, path: '/' },
        { name: sc.doctor.name, url: sc.site.url + '/doctor', path: '/doctor' },
      ],
    },
  })

  return (
    <>
      <SchemaMarkup graphs={[pageSchemas]} />
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <DoctorHero doctor={cfg.doctor} clinic={cfg.clinic} />
        <CredentialsGrid doctor={cfg.doctor} clinic={cfg.clinic} />
        <DoctorFAQ faqs={cfg.doctor.faqs} />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}
