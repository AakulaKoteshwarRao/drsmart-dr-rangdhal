import { notFound } from 'next/navigation'
export const dynamic = 'force-dynamic'
import { loadConfig } from '@/lib/config'
import { mapPackage } from '@/lib/transform'
import PackageDetail from '@/components/package/PackageDetail'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'

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

export default async function PackageDetailPage({ params }: PageParams) {
  const [config, rawConfig] = await Promise.all([loadConfig(), getRawConfig()])
  const fallbackRaw = rawConfig ?? (await import('@/data/default.json')).default
  const rawPackages: any[] = fallbackRaw?.s10?.packages ?? []
  const pkg = rawPackages.find((pk: any) => pk.slug === params.slug)
  if (!pkg) notFound()
  const photoUrl = (config.photos as any)?.[`package_${params.slug}`] ?? null
  const mapped = mapPackage(pkg, rawConfig, photoUrl)
  return (
    <>
      <Header clinic={config.clinic} />
      <StickyBar clinic={config.clinic} />
      <PackageDetail {...mapped} />
      <Footer clinic={config.clinic} config={config} />
    </>
  )
}
