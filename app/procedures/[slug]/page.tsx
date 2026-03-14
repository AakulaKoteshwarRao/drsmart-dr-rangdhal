import Header from '@/components/Header'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generatePageSchemas } from '@/lib/schema/index.js'
import { buildSchemaConfig } from '@/lib/schema/master.config.js'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import Footer from '@/components/Footer'
import ProcedureDetail from '@/components/procedure/ProcedureDetail'
import { loadConfig } from '@/lib/config'
import '../../styles/procedures.css'

export default async function ProcedureDetailPage({ params }: { params?: { slug?: string } }) {
  const cfg = await loadConfig()
  const sc = buildSchemaConfig(cfg)
  const _path = `/procedures/${params?.slug || ''}`
  const pageSchemas = generatePageSchemas(schemaConfig, {
    pageType: 'procedure',
    pageData: { slug: params?.slug },
    meta: {
      path:        _path,
      name:        `Procedure: ${params?.slug?.replace(/-/g,' ')?.replace(/\b\w/g,c=>c.toUpperCase()) || 'Procedure'} | ${sc.clinic.name}`,
      description: sc.clinic.description,
      image:       sc.clinic.image,
      breadcrumb:  [
        { name: 'Home', url: sc.site.url, path: '/' },
        { name: 'Procedures', url: sc.site.url + '/procedures', path: '/procedures' },
        { name: params?.slug || '', url: sc.site.url + _path, path: _path },
      ],
    },
  })

  return (
    <>
      <SchemaMarkup graphs={[pageSchemas]} />
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <ProcedureDetail />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} config={cfg} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}
