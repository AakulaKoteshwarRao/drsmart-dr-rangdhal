import { notFound } from 'next/navigation'
export const dynamic = 'force-dynamic'
import { loadConfig } from '@/lib/config'
import { mapProcedure } from '@/lib/transform'
import ProcedureDetail from '@/components/procedure/ProcedureDetail'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'
import '@/app/styles/procedures.css'

interface PageParams { params: { slug: string } }

async function getRawConfig() {
  const configId = process.env.NEXT_PUBLIC_CONFIG_ID
  const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const sbKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!configId || !sbUrl || !sbKey) return null
  const res = await fetch(
    `${sbUrl}/rest/v1/configs?select=data&id=eq.${encodeURIComponent(configId)}&limit=1`,
    { headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}` }, cache: 'no-cache' }
  )
  const rows = await res.json()
  return rows?.[0]?.data ?? null
}

export default async function ProcedureDetailPage({ params }: PageParams) {
  const [config, rawConfig] = await Promise.all([loadConfig(), getRawConfig()])
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const rawJson = require('@/data/raw.json')
  const fallback = rawConfig ?? rawJson
  const rawProcedures: any[] = fallback?.s08?.procedures ?? []
  const procedure = rawProcedures.find((p: any) => p.slug === params.slug)
  if (!procedure) notFound()
  const photoUrl = (config.photos as any)?.[`procedure_${params.slug}`] ?? null
  const mapped = mapProcedure(procedure, fallback, photoUrl)
  return (
    <>
      <Header clinic={config.clinic} />
      <StickyBar clinic={config.clinic} />
      <ProcedureDetail {...mapped} />
      <Footer clinic={config.clinic} config={config} />
    </>
  )
}
