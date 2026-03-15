import { notFound } from 'next/navigation'
export const dynamic = 'force-dynamic'
import '@/styles/procedures.css'
import { loadConfig } from '@/lib/config'
import { mapProcedure } from '@/lib/transform'
import ProcedureDetail from '@/components/procedure/ProcedureDetail'
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

export default async function ProcedureDetailPage({ params }: PageParams) {
  const [config, rawConfig] = await Promise.all([loadConfig(), getRawConfig()])
  const rawProcedures: any[] = rawConfig?.s08?.procedures ?? []
  const procedure = rawProcedures.find((p: any) => p.slug === params.slug)
  if (!procedure) notFound()
  const photoUrl = (config.photos as any)?.[`procedure_${params.slug}`] ?? null
  const mapped = mapProcedure(procedure, rawConfig, photoUrl)
  return (
    <>
      <Header clinic={config.clinic} />
      <StickyBar clinic={config.clinic} />
      <ProcedureDetail {...mapped} />
      <CTABand cta={config.ctaBand} />
      <Footer clinic={config.clinic} config={config} />
    </>
  )
}
