import Header from '@/components/Header'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generatePageSchemas } from '@/lib/schema/index.js'
import { buildSchemaConfig } from '@/lib/schema/master.config.js'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import Footer from '@/components/Footer'
import ConditionDetail from '@/components/condition/ConditionDetail'
import { loadConfig } from '@/lib/config'
import '../../styles/conditions.css'

export default async function ConditionDetailPage({ params }: { params?: { slug?: string } }) {
  const cfg = await loadConfig()
  const sc = buildSchemaConfig(cfg)
  const _path = `/conditions/${params?.slug || ''}`
  const pageSchemas = generatePageSchemas(schemaConfig, {
    pageType: 'condition',
    pageData: { slug: params?.slug },
    meta: {
      path:        _path,
      name:        `Condition: ${params?.slug?.replace(/-/g,' ')?.replace(/\b\w/g,c=>c.toUpperCase()) || 'Condition'} | ${sc.clinic.name}`,
      description: sc.clinic.description,
      image:       sc.clinic.image,
      breadcrumb:  [
        { name: 'Home', url: sc.site.url, path: '/' },
        { name: 'Conditions', url: sc.site.url + '/conditions', path: '/conditions' },
        { name: params?.slug || '', url: sc.site.url + _path, path: _path },
      ],
    },
  })

  return (
    <>
      <SchemaMarkup graphs={[pageSchemas]} />
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <ConditionDetail />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} config={cfg} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}
