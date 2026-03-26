import Header from '@/components/Header'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generatePageSchemas } from '@/lib/schema/index.js'
import { buildSchemaConfig } from '@/lib/schema/master.config.js'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import AboutHero from '@/components/about/AboutHero'
import Approach from '@/components/about/Approach'
import Infrastructure from '@/components/about/Infrastructure'
import Credentials from '@/components/about/Credentials'
import Achievements from '@/components/about/Achievements'
import Affiliations from '@/components/about/Affiliations'
import Insurance from '@/components/about/Insurance'
import AboutFAQ from '@/components/about/AboutFAQ'
import LocationStrip from '@/components/about/LocationStrip'
import { loadConfig } from '@/lib/config'
import Footer from '@/components/Footer'

export default async function AboutPage() {
  const cfg = await loadConfig()
  const sc = buildSchemaConfig(cfg)
  const pageSchemas = generatePageSchemas(sc, {
    pageType: 'home',
    meta: {
      path:        '/about',
      name:        `About ${sc.clinic.name}`,
      description: sc.clinic.description,
      image:       sc.clinic.image,
      breadcrumb:  [
        { name: 'Home', url: sc.site.url, path: '/' },
        { name: `About ${sc.clinic.name}`, url: sc.site.url + '/about', path: '/about' },
      ],
    },
  })

  return (
    <>
      <SchemaMarkup graphs={[pageSchemas]} />
      <Header clinic={cfg.clinic} />
      <main>
        <AboutHero clinic={cfg.clinic} />
        <Approach />
        <Infrastructure clinic={cfg.clinic} />
        <Credentials doctor={cfg.doctor} clinic={cfg.clinic} />
        <Achievements doctor={cfg.doctor} clinic={cfg.clinic} />
        <Affiliations doctor={cfg.doctor} clinic={cfg.clinic} />
        <Insurance clinic={cfg.clinic} />
        <AboutFAQ clinic={cfg.clinic} />
        <LocationStrip clinic={cfg.clinic} />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} config={cfg} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}
