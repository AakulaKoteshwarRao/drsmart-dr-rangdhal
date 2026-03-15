// ─────────────────────────────────────────────────────────────
// app/conditions/[slug]/page.tsx
// UPDATED: Uses ConditionDetail component (matches template pattern)
// ─────────────────────────────────────────────────────────────
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { loadConfig } from '@/lib/config'
import ConditionDetail, { ConditionDetailProps } from '@/components/condition/ConditionDetail'
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
  const conditions: any[] = configRow?.config_data?.s07?.conditions ?? []
  return conditions.map((c: any) => ({ slug: c.slug }))
}

export default async function ConditionDetailPage({ params }: PageParams) {
  const clinicSlug = process.env.NEXT_PUBLIC_CLINIC_SLUG
  if (!clinicSlug) notFound()

  const supabase = createClient()

  // Get website row for photos + config_id
  const { data: website } = await supabase
    .from('websites')
    .select('config_id, photos, client_id')
    .eq('slug', clinicSlug)
    .single()

  if (!website?.config_id) notFound()

  // Get config
  const { data: configRow } = await supabase
    .from('configs')
    .select('config_data')
    .eq('id', website.config_id)
    .single()

  if (!configRow?.config_data) notFound()

  const config = configRow.config_data

  // Find condition by slug
  const conditions: any[] = config?.s07?.conditions ?? []
  const condition = conditions.find((c: any) => c.slug === params.slug)
  if (!condition) notFound()

  // Photos
  const photos = (website.photos as Record<string, string>) ?? {}
  const heroImage = photos[`condition_${params.slug}`] ?? null

  // Clinic context
  const s02 = config?.s02 ?? {}
  const s03 = config?.s03 ?? {}
  const s23 = config?.s23 ?? {}
  const doctorName = [s03.honorificPrefix ?? 'Dr', s03.firstName, s03.lastName].filter(Boolean).join(' ').trim()

  // Cross-link related procedures
  const allProcedures: any[] = config?.s08?.procedures ?? []
  const relatedProcedureSlugs: string[] = condition.relatedProcedures ?? []
  const relatedProcedures = allProcedures
    .filter((p: any) => relatedProcedureSlugs.some((rs: string) => p.slug === rs || p.name?.toLowerCase().includes(rs.toLowerCase())))
    .map((p: any) => ({ name: p.name, slug: p.slug, shortDescription: p.shortDescription ?? '' }))
    .slice(0, 4)

  // Load full config for Header/Footer
  const cfg = await loadConfig()

  const props: ConditionDetailProps = {
    name: condition.name ?? '',
    slug: condition.slug ?? params.slug,
    description: condition.description ?? '',
    shortDescription: condition.shortDescription ?? '',
    pills: condition.pills ?? [],
    heroStats: condition.heroStats ?? [],
    heroImage,
    icd10Code: condition.icd10Code ?? '',
    prevalence: condition.prevalence ?? '',
    progressionType: condition.progressionType ?? '',
    diagnosisMethod: condition.diagnosisMethod ?? '',
    types: condition.types ?? [],
    causes: condition.causes ?? [],
    symptoms: condition.symptoms,
    treatments: condition.treatments ?? [],
    howWeHandle: condition.howWeHandle ?? [],
    recoveryPhases: condition.recoveryPhases ?? [],
    outcomes: condition.outcomes ?? [],
    ifNotTreated: condition.ifNotTreated ?? '',
    whenToSeeDoctor: condition.whenToSeeDoctor ?? '',
    relatedProcedures,
    faqs: condition.faqs ?? [],
    clinicName: s02.brandName ?? '',
    doctorName,
    phone: s02.phone ?? s02.mobilePhone ?? '',
    city: s02.city ?? '',
    mapUrl: s23.googleDirections ?? s02.googleMapsUrl ?? null,
  }

  return (
    <>
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <ConditionDetail {...props} />
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
  const conditions: any[] = config?.s07?.conditions ?? []
  const condition = conditions.find((c: any) => c.slug === params.slug)
  if (!condition) return {}
  const clinicName = config?.s02?.brandName ?? ''
  const city = config?.s02?.city ?? ''
  return {
    title: `${condition.name} Treatment in ${city} | ${clinicName}`,
    description: condition.shortDescription ?? `Learn about ${condition.name} — causes, symptoms, treatment options and expert care at ${clinicName}, ${city}.`,
  }
}
