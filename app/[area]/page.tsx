import Header from '@/components/Header'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import Footer from '@/components/Footer'
import LocationSpoke from '@/components/location/LocationSpoke'
import { loadConfig } from '@/lib/config'
import '../styles/location-spoke.css'

export const dynamic = 'force-dynamic'

export default async function LocationSpokePage({ params }: { params?: { area?: string } }) {
  const cfg = await loadConfig()

  const areaSlug = params?.area || ''
  // Find area from config first (has correct name), fallback to slug conversion
  const areaFromConfig = (cfg.areas || cfg.localAreas || []).find((a: any) => a.slug === areaSlug)
  const areaName = areaFromConfig?.name || areaSlug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())

  const area = areaFromConfig || { name: areaName, slug: areaSlug, distance: '', duration: '' }

  return (
    <>
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <LocationSpoke
          clinic={cfg.clinic}
          doctor={cfg.doctor}
          area={area}
          conditions={cfg.conditions || []}
          areas={cfg.areas || cfg.localAreas || []}
        />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} config={cfg} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}
