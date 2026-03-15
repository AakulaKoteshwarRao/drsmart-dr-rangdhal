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

export default async function PackageDetailPage({ params }: PageParams) {
  const config = await loadConfig()
  const pkg = (config.packages ?? []).find((pk: any) => pk.slug === params.slug)
  if (!pkg) notFound()
  const mapped = mapPackage(pkg, config, params.slug)
  return (
    <>
      <Header />
      <StickyBar />
      <PackageDetail pkg={mapped} config={config} />
      <CTABand />
      <Footer />
    </>
  )
}
