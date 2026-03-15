import { notFound } from 'next/navigation'
export const dynamic = 'force-dynamic'
import { loadConfig } from '@/lib/config'
import { mapPackage } from '@/lib/transform'
import PackageDetail from '@/components/package/PackageDetail'
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

export default async function PackageDetailPage({ params }: PageParams) {
  const [config, rawConfig] = await Promise.all([loadConfig(), getRawConfig()])
  const pkg = (config.packages ?? []).find((pk: any) => pk.slug === params.slug)
  if (!pkg) notFound()
  const photoUrl = (config.photos as any)?.[`package_${params.slug}`] ?? null
  const mapped = mapPackage(pkg, rawConfig, photoUrl)
  return (
    <>
      <Header />
      <StickyBar />
      <PackageDetail pkg={mapped} config={config} />
      <CTABand cta={config.ctaBand} />
      <Footer />
    </>
  )
}
