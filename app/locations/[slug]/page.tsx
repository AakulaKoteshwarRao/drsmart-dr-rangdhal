import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'
import SchemaMarkup from '@/components/SchemaMarkup'
import LocationSpoke from '@/components/location/LocationSpoke'
import { generatePageSchemas } from '@/lib/schema/index.js'
import { buildSchemaConfig } from '@/lib/schema/master.config.js'
import { loadConfig } from '@/lib/config'
import '../../styles/location-spoke.css'

export default async function LocationSpokePage({ params }: { params?: { slug?: string } }) {
  const cfg = await loadConfig()
  const sc = buildSchemaConfig(cfg)
  const _path = `/locations/${params?.slug || ''}`

  const areaName = (params?.slug || '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())

  const area = (cfg.areas || cfg.localAreas || []).find(
    (a: any) => a.slug === params?.slug
  ) || { name: areaName, slug: params?.slug || '', distance: '', duration: '' }

  const pageSchemas = generatePageSchemas(sc, {
    pageType: 'location',
    pageData: { slug: params?.slug },
    meta: {
      path:        _path,
      name:        `${sc.clinic.specialty} in ${areaName} | ${sc.clinic.name}`,
      description: sc.clinic.description,
      image:       sc.clinic.image,
      breadcrumb:  [
        { name: 'Home',      url: sc.site.url,                   path: '/' },
        { name: 'Locations', url: sc.site.url + '/locations',    path: '/locations' },
        { name: areaName,    url: sc.site.url + _path,           path: _path },
      ],
    },
  })

  return (
    <>
      <SchemaMarkup graphs={[pageSchemas]} />
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <LocationSpoke
          props={{
            clinic: cfg.clinic,
            doctor: cfg.doctor,
            area,
          }}
        />
      </main>
      <Footer clinic={cfg.clinic} config={cfg} />
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}
