import Header from '@/components/Header'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import Footer from '@/components/Footer'
import PackageDetail from '@/components/package/PackageDetail'
import { loadConfig } from '@/lib/config'
import '../../styles/packages.css'

export default async function PackageDetailPage() {
  const cfg = await loadConfig()
  return (
    <>
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <PackageDetail />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} config={cfg} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}
