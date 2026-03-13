import { getConfig } from '@/lib/config'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generatePageSchemas } from '@/lib/schema/index.js'
import { schemaConfig } from '@/lib/schema/master.config.js'
import Header from '@/components/Header'
import StickyBar from '@/components/StickyBar'
import Hero from '@/components/home/Hero'
import TrustStrip from '@/components/home/TrustStrip'
import WhyChoose from '@/components/home/WhyChoose'
import CardGrid from '@/components/home/CardGrid'
import PackagesGrid from '@/components/home/PackagesGrid'
import HowWeWork from '@/components/home/HowWeWork'
import MeetDoctor from '@/components/home/MeetDoctor'
import ClinicalInfo from '@/components/home/ClinicalInfo'
import PatientStories from '@/components/home/PatientStories'
import PricingAccordion from '@/components/home/PricingAccordion'
import Reviews from '@/components/home/Reviews'
import LocalAreas from '@/components/home/LocalAreas'
import FAQ from '@/components/home/FAQ'
import BlogPreview from '@/components/home/BlogPreview'
import CTABand from '@/components/home/CTABand'
import Footer from '@/components/Footer'

export default function HomePage() {
  const cfg = getConfig()

  const pageSchemas = generatePageSchemas(schemaConfig, {
    pageType: 'home',
    meta: {
      path:          '/',
      name:          `${schemaConfig.clinic.name} | ${schemaConfig.clinic.alternateName}`,
      description:   `${schemaConfig.clinic.name} -- ${schemaConfig.clinic.description}`,
      image:         schemaConfig.clinic.image,
      datePublished: '2024-01-01',
      breadcrumb:    [{ name: 'Home', url: schemaConfig.site.url, path: '/' }],
    },
  })

  return (
    <>
      <SchemaMarkup graphs={[pageSchemas]} />
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <Hero hero={cfg.hero} />
        <TrustStrip items={cfg.trustStrip} />
        <WhyChoose cards={cfg.whyChoose} />
        <CardGrid
          label="Conditions We Treat"
          title="What we treat."
          subtitle="From common to complex conditions -- each diagnosis is approached with precision and care."
          items={cfg.conditions}
          viewAllHref="/conditions"
          viewAllLabel="View All Conditions"
        />
        <CardGrid
          label="Procedures"
          title="What we do."
          subtitle="Minimally invasive and surgical procedures performed with modern techniques and premium equipment."
          items={cfg.procedures}
          viewAllHref="/services"
          viewAllLabel="View All Procedures"
          bgClass="section-cool-grey"
          wrapInner={true}
        />
        <PackagesGrid packages={cfg.packages} />
        <HowWeWork steps={cfg.howWeWork} />
        <MeetDoctor doctor={cfg.doctor} clinic={cfg.clinic} />
        <ClinicalInfo cards={cfg.clinicalInfo} />
        <PatientStories stories={cfg.patientStories} />
        <PricingAccordion items={cfg.pricing} />
        <Reviews reviews={cfg.reviews} summary={cfg.reviewSummary} />
        <LocalAreas areas={cfg.localAreas} clinic={cfg.clinic} />
        <FAQ items={cfg.faq} />
        <BlogPreview posts={cfg.blog} />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}
