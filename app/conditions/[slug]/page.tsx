import { notFound } from 'next/navigation'
export const dynamic = 'force-dynamic'
import { loadConfig } from '@/lib/config'
import { mapCondition } from '@/lib/transform'
import ConditionDetail from '@/components/condition/ConditionDetail'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'

interface PageParams { params: { slug: string } }

export default async function ConditionDetailPage({ params }: PageParams) {
  const config = await loadConfig()
  const condition = (config.conditions ?? []).find((c: any) => c.slug === params.slug)
  if (!condition) notFound()
  const mapped = mapCondition(condition, config, params.slug)
  return (
    <>
      <Header />
      <StickyBar />
      <ConditionDetail condition={mapped} config={config} />
      <CTABand />
      <Footer />
    </>
  )
}
