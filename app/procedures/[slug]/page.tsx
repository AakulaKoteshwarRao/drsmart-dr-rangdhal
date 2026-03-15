// ═══════════════════════════════════════════════════════════════
// FILE 1: app/procedures/[slug]/page.tsx
// ═══════════════════════════════════════════════════════════════
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { loadConfig } from '@/lib/config'
import ProcedureDetail, { ProcedureDetailProps } from '@/components/procedure/ProcedureDetail'
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
  const procedures: any[] = configRow?.config_data?.s08?.procedures ?? []
  return procedures.map((p: any) => ({ slug: p.slug }))
}

export default async function ProcedureDetailPage({ params }: PageParams) {
  const clinicSlug = process.env.NEXT_PUBLIC_CLINIC_SLUG
  if (!clinicSlug) notFound()

  const supabase = createClient()
  const { data: website } = await supabase.from('websites').select('config_id, photos').eq('slug', clinicSlug).single()
  if (!website?.config_id) notFound()

  const { data: configRow } = await supabase.from('configs').select('config_data').eq('id', website.config_id).single()
  if (!configRow?.config_data) notFound()

  const config = configRow.config_data
  const procedures: any[] = config?.s08?.procedures ?? []
  const procedure = procedures.find((p: any) => p.slug === params.slug)
  if (!procedure) notFound()

  const photos = (website.photos as Record<string, string>) ?? {}
  const heroImage = photos[`procedure_${params.slug}`] ?? null

  const s02 = config?.s02 ?? {}
  const s03 = config?.s03 ?? {}
  const s23 = config?.s23 ?? {}
  const doctorName = [s03.honorificPrefix ?? 'Dr', s03.firstName, s03.lastName].filter(Boolean).join(' ').trim()

  // Cross-link related conditions
  const allConditions: any[] = config?.s07?.conditions ?? []
  const relatedConditionSlugs: string[] = procedure.relatedConditions ?? []
  const relatedConditions = allConditions
    .filter((c: any) => relatedConditionSlugs.some((rs: string) => c.slug === rs || c.name?.toLowerCase().includes(rs.toLowerCase())))
    .map((c: any) => ({ name: c.name, slug: c.slug, shortDescription: c.shortDescription ?? '' }))
    .slice(0, 4)

  const cfg = await loadConfig()

  const props: ProcedureDetailProps = {
    name: procedure.name ?? '',
    slug: procedure.slug ?? params.slug,
    description: procedure.description ?? '',
    shortDescription: procedure.shortDescription ?? '',
    pills: procedure.pills ?? [],
    heroImage,
    anaesthesia: procedure.anaesthesia ?? '',
    duration: procedure.duration ?? '',
    hospitalStay: procedure.hospitalStay ?? '',
    recoveryTime: procedure.recoveryTime ?? '',
    costRange: procedure.costRange ?? '',
    insuranceCoverage: procedure.insuranceCoverage ?? '',
    icd10Code: procedure.icd10Code ?? '',
    whoNeedsIt: procedure.whoNeedsIt ?? '',
    successRate: procedure.successRate ?? '',
    risks: procedure.risks ?? [],
    sideEffects: procedure.sideEffects ?? [],
    preparation: procedure.preparation ?? [],
    howItWorks: procedure.howItWorks ?? [],
    howWeHandle: procedure.howWeHandle ?? [],
    durationMilestones: procedure.durationMilestones ?? [],
    estimatedTimeline: procedure.estimatedTimeline ?? '',
    recoveryPhases: procedure.recoveryPhases ?? [],
    outcomes: procedure.outcomes ?? [],
    misconceptions: procedure.misconceptions ?? [],
    ifNotTreated: procedure.ifNotTreated ?? '',
    whenToSeeDoctor: procedure.whenToSeeDoctor ?? '',
    relatedConditions,
    faqs: procedure.faqs ?? [],
    clinicName: s02.brandName ?? '',
    doctorName,
    phone: s02.phone ?? s02.mobilePhone ?? '',
    city: s02.city ?? '',
    mapUrl: s23.googleDirections ?? null,
  }

  return (
    <>
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <ProcedureDetail {...props} />
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
  const procedures: any[] = config?.s08?.procedures ?? []
  const procedure = procedures.find((p: any) => p.slug === params.slug)
  if (!procedure) return {}
  const clinicName = config?.s02?.brandName ?? ''
  const city = config?.s02?.city ?? ''
  return {
    title: `${procedure.name} in ${city} | ${clinicName}`,
    description: procedure.shortDescription ?? `Expert ${procedure.name} at ${clinicName}, ${city}.`,
  }
}


// ═══════════════════════════════════════════════════════════════