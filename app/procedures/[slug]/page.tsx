import { notFound } from 'next/navigation'
export const dynamic = 'force-dynamic'
import { loadConfig } from '@/lib/config'
import { mapProcedure } from '@/lib/transform'
import ProcedureDetail from '@/components/procedure/ProcedureDetail'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'

interface PageParams { params: { slug: string } }

export default async function ProcedureDetailPage({ params }: PageParams) {
  const config = await loadConfig()
  const procedure = (config.procedures ?? []).find((p: any) => p.slug === params.slug)
  if (!procedure) notFound()
  const mapped = mapProcedure(procedure, config, params.slug)
  return (
    <>
      <Header />
      <StickyBar />
      <ProcedureDetail procedure={mapped} config={config} />
      <CTABand />
      <Footer />
    </>
  )
}
