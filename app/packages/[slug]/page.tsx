// FILE 2: app/packages/[slug]/page.tsx
// ═══════════════════════════════════════════════════════════════
// (Save this as a separate file — split at the === line)

import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { loadConfig } from '@/lib/config'
import PackageDetail, { PackageDetailProps } from '@/components/package/PackageDetail'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'

interface PageParams { params: { slug: string } }

export async function generateStaticParams() {
  const slug = process.env.NEXT_PUBLIC_CLINIC_SLUG
  if (!slug) return []
  const supabase = createClient()
  const { data: website } = await supabase.from('websites').select('config_id').eq('slug', slug).single()
  if (!website?.config_id) return []
  const { data: configRow } = await supabase.from('configs').select('config_data').eq('id', website.config_id).single()
  const products: any[] = configRow?.config_data?.s09?.products ?? configRow?.config_data?.s09?.services ?? []
  return products.map((p: any) => ({ slug: p.slug }))
}

export default async function PackageDetailPage({ params }: PageParams) {
  const clinicSlug = process.env.NEXT_PUBLIC_CLINIC_SLUG
  if (!clinicSlug) notFound()

  const supabase = createClient()
  const { data: website } = await supabase.from('websites').select('config_id, photos').eq('slug', clinicSlug).single()
  if (!website?.config_id) notFound()

  const { data: configRow } = await supabase.from('configs').select('config_data').eq('id', website.config_id).single()
  if (!configRow?.config_data) notFound()

  const config = configRow.config_data
  const products: any[] = config?.s09?.products ?? config?.s09?.services ?? []
  const pkg = products.find((p: any) => p.slug === params.slug)
  if (!pkg) notFound()

  const photos = (website.photos as Record<string, string>) ?? {}
  const heroImage = photos[`product_${params.slug}`] ?? null

  const s02 = config?.s02 ?? {}
  const s03 = config?.s03 ?? {}
  const doctorName = [s03.honorificPrefix ?? 'Dr', s03.firstName, s03.lastName].filter(Boolean).join(' ').trim()

  const cfg = await loadConfig()

  const props: PackageDetailProps = {
    name: pkg.name ?? '',
    slug: pkg.slug ?? params.slug,
    description: pkg.description ?? '',
    shortDescription: pkg.shortDescription ?? '',
    price: pkg.price ?? '',
    heroImage,
    whatsIncluded: pkg.whatsIncluded ?? [],
    howItWorks: pkg.howItWorks ?? [],
    whoIsItFor: pkg.whoIsItFor ?? '',
    pricingBreakdown: pkg.pricingBreakdown ?? [],
    exclusions: pkg.exclusions ?? [],
    insuranceCoverage: pkg.insuranceCoverage ?? '',
    estimatedTimeline: pkg.estimatedTimeline ?? '',
    paymentOptions: pkg.paymentOptions ?? [],
    testimonials: pkg.testimonials ?? [],
    faqs: pkg.faqs ?? [],
    clinicName: s02.brandName ?? '',
    doctorName,
    phone: s02.phone ?? s02.mobilePhone ?? '',
    city: s02.city ?? '',
  }

  return (
    <>
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <PackageDetail {...props} />
        <CTABand cta={cfg.ctaBand} />
      </main>
      <Footer clinic={cfg.clinic} config={cfg} />
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}

export async function generateMetadata({ params }: PageParams) {
  const clinicSlug = process.env.NEXT_PUBLIC_CLINIC_SLUG
  if (!clinicSlug) return {}
  const supabase = createClient()
  const { data: website } = await supabase.from('websites').select('config_id').eq('slug', clinicSlug).single()
  if (!website?.config_id) return {}
  const { data: configRow } = await supabase.from('configs').select('config_data').eq('id', website.config_id).single()
  const config = configRow?.config_data
  const products: any[] = config?.s09?.products ?? config?.s09?.services ?? []
  const pkg = products.find((p: any) => p.slug === params.slug)
  if (!pkg) return {}
  const clinicName = config?.s02?.brandName ?? ''
  const city = config?.s02?.city ?? ''
  return {
    title: `${pkg.name} | ${clinicName}, ${city}`,
    description: pkg.shortDescription ?? `${pkg.name} package at ${clinicName}, ${city}.`,
  }
}