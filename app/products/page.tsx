import Header from '@/components/Header'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import ProductsHero from '@/components/products/ProductsHero'
import PackagesGrid from '@/components/home/PackagesGrid'
import PricingTransparency from '@/components/products/PricingTransparency'
import PackageTestimonials from '@/components/products/PackageTestimonials'
import GuidanceSection from '@/components/products/GuidanceSection'
import ProductsFAQ from '@/components/products/ProductsFAQ'
import { loadConfig } from '@/lib/config'
import Footer from '@/components/Footer'

export default async function ProductsPage() {
  const cfg = await loadConfig()
  return (
    <>
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <ProductsHero />
        <PackagesGrid packages={cfg.packages} />
        <PricingTransparency />
        <PackageTestimonials />
        <GuidanceSection clinic={cfg.clinic} />
        <ProductsFAQ />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} config={cfg} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}
