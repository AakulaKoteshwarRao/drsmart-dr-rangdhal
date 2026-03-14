import Header from '@/components/Header'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import Footer from '@/components/Footer'
import LocationSpoke from '@/components/location/LocationSpoke'
import { loadConfig } from '@/lib/config'
import '../styles/location-spoke.css'

export default async function LocationSpokePage() {
  const cfg = await loadConfig()
  return (
    <>
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <LocationSpoke />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} config={cfg} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}
