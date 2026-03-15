import { notFound } from 'next/navigation'
export const dynamic = 'force-dynamic'
import '@/styles/conditions.css'
import { loadConfig } from '@/lib/config'
import { mapCondition } from '@/lib/transform'
import ConditionDetail from '@/components/condition/ConditionDetail'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'

interface PageParams { params: { slug: string } }

async function getRawConfig() {
  const slug = process.env.NEXT_PUBLIC_CLINIC_SLUG
  const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const sbKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!slug || !sbUrl || !sbKey) return null
  const res = await fetch(
    `${sbUrl}/rest/v1/configs?select=data&slug=eq.${encodeURIComponent(slug)}&limit=1`,
    { headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}` }, cache: 'no-cache' }
  )
  const rows = await res.json()
  return rows?.[0]?.data ?? null
}

export default async function ConditionDetailPage({ params }: PageParams) {
  const [config, rawConfig] = await Promise.all([loadConfig(), getRawConfig()])
  const rawConditions: any[] = rawConfig?.s07?.conditions ?? []
  const condition = rawConditions.find((c: any) => c.slug === params.slug)
  if (!condition) notFound()
  const photoUrl = (config.photos as any)?.[`condition_${params.slug}`] ?? null
  const mapped = mapCondition(condition, rawConfig, photoUrl)
  return (
    <>
      <Header clinic={config.clinic} />
      <StickyBar clinic={config.clinic} />
      <ConditionDetail {...mapped} />
      <CTABand cta={config.ctaBand} />
      <Footer clinic={config.clinic} config={config} />
    </>
  )
}
