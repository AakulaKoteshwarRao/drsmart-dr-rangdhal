/**
 * lib/transform.ts
 * Transforms raw portal config (s00-s23 JSONB from Supabase) into the full
 * ClinicConfig shape that the website template expects.
 *
 * Section mapping (matches ConfigEditor.tsx exactly):
 *  s00 — Entity Profile (entityType, primaryColor, secondaryColor, kwPrimary, kwSecondary)
 *  s01 — Site (url, blogPath)
 *  s02 — Entity/Clinic (name, telephone, email, city, street, hours, languages, hasMap, mapEmbedUrl, ratingValue, reviewCount, socialGoogle, socialFacebook, socialInstagram, socialPracto, medicalSpecialty)
 *  s03 — Doctor (name, jobTitle, gender, regNumber, degrees[], specialties[], stats[], awards[], experience[], memberships[], certifications[])
 *  s04 — Hero (auto-generated, no user fields)
 *  s05 — Trust Strip (items[])
 *  s06 — Why Choose (items[])
 *  s07 — Conditions (conditions[])
 *  s08 — Procedures (procedures[])
 *  s09 — Services (services[])
 *  s10 — Packages (packages[])
 *  s11 — How We Work (steps[])
 *  s12 — Clinical Info (cards[])
 *  s13 — Reviews (reviews[])
 *  s14 — FAQ (faqs[])
 *  s15 — Pricing (sections[])
 *  s16 — Patient Stories
 *  s17 — Locations/Areas (areas[])
 *  s18 — Blog (posts[])
 *  s19 — HowTo Guides (guides[])
 *  s20 — CTA Band
 *  s21 — Team (members[])
 *  s23 — Digital Presence (customLinks[])
 */

import type { ClinicConfig, ClinicInfo, DoctorInfo, HeroSection } from './types'

// ─── Gradient cycles ──────────────────────────────────────────────────────────
const GRAD_CLASSES  = ['grad-teal', 'grad-blue', 'grad-deep', 'grad-warm']
const GRAD_STRINGS  = [
  'linear-gradient(145deg,var(--secondary-deep),var(--secondary))',
  'linear-gradient(145deg,var(--secondary),var(--primary))',
  'linear-gradient(145deg,var(--primary),var(--primary-dark))',
  'linear-gradient(145deg,var(--secondary-dark),var(--primary-dark))',
  'linear-gradient(145deg,var(--primary-dark),var(--secondary-deep))',
  'linear-gradient(145deg,var(--secondary-deep),var(--primary))',
]
const TEAM_GRADS    = [
  'linear-gradient(160deg,var(--secondary-deep) 0%,var(--secondary) 40%,var(--primary) 100%)',
  'linear-gradient(160deg,var(--secondary) 0%,var(--secondary-dark) 40%,var(--primary) 100%)',
  'linear-gradient(160deg,var(--primary) 0%,var(--primary-dark) 40%,var(--secondary) 100%)',
]
const g  = (i: number) => GRAD_CLASSES[i  % GRAD_CLASSES.length]
const gs = (i: number) => GRAD_STRINGS[i  % GRAD_STRINGS.length]
const gt = (i: number) => TEAM_GRADS[i    % TEAM_GRADS.length]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toWhatsapp(phone: string): string {
  return (phone || '').replace(/\D/g, '')
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function initials(name: string): string {
  const parts = (name || '').trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return (parts[0]?.[0] || 'X').toUpperCase()
}

const s = (v: unknown, fallback = '') => (typeof v === 'string' && v.trim() ? v.trim() : fallback)
const a = (v: unknown): any[] => (Array.isArray(v) ? v : [])

// ─── Main transform ───────────────────────────────────────────────────────────

export function transformConfig(raw: Record<string, any>): ClinicConfig {
  // ── Section destructure (matches ConfigEditor.tsx section IDs) ────────────
  const s00 = raw?.s00 ?? {}   // Entity Profile
  const s01 = raw?.s01 ?? {}   // Site
  const s02 = raw?.s02 ?? {}   // Entity/Clinic info
  const s03 = raw?.s03 ?? {}   // Doctor
  // s04 = Hero (auto-generated)
  const s05 = raw?.s05 ?? {}   // Trust Strip
  const s06 = raw?.s06 ?? {}   // Why Choose
  const s07 = raw?.s07 ?? {}   // Conditions
  const s08 = raw?.s08 ?? {}   // Procedures
  const s09 = raw?.s09 ?? {}   // Services
  const s10 = raw?.s10 ?? {}   // Packages
  const s11 = raw?.s11 ?? {}   // How We Work
  const s12 = raw?.s12 ?? {}   // Clinical Info
  const s13 = raw?.s13 ?? {}   // Reviews
  const s14 = raw?.s14 ?? {}   // FAQ
  const s15 = raw?.s15 ?? {}   // Pricing
  const s16 = raw?.s16 ?? {}   // Patient Stories
  const s17 = raw?.s17 ?? {}   // Areas
  const s18 = raw?.s18 ?? {}   // Blog
  const s21 = raw?.s21 ?? {}   // Team
  const s23 = raw?.s23 ?? {}   // Digital Presence

  // ── Clinic ────────────────────────────────────────────────────────────────
  // s02 = Entity section in ConfigEditor
  const phone    = s(s02.telephone, '+91-0000000000')
  const whatsapp = s(s02.whatsapp, toWhatsapp(phone))
  const mapsUrl  = s(s02.hasMap, '')
  const website  = s(s01.url, '')

  const clinic: ClinicInfo = {
    name:        s(s02.name, 'Clinic'),
    tagline:     s(s02.alternateName, ''),
    type:        s(s00.entityType, ''),
    phone,
    whatsapp,
    email:       s(s02.email, ''),
    address:     [s(s02.buildingName,''), s(s02.street,''), s(s02.city,'')].filter(Boolean).join(', '),
    city:        s(s02.city, ''),
    area:        s(s02.street, ''),
    street:      s(s02.street, ''),
    hospital:    s(s02.buildingName, ''),
    hours:       typeof s02.hours === 'string' ? s02.hours : '',
    languages:   s(s02.languages, ''),
    website,
    mapsUrl,
    mapUrl:      mapsUrl,
    mapEmbedUrl: s(s02.mapEmbedUrl, ''),
    social: {
      google:    s(s02.socialGoogle, ''),
      facebook:  s(s02.socialFacebook, ''),
      instagram: s(s02.socialInstagram, ''),
      youtube:   s(s02.socialYoutube, ''),
    },
  }

  // ── Doctor ────────────────────────────────────────────────────────────────
  // s03 = Doctor section in ConfigEditor
  const doctorName    = s(s03.name, 'Doctor')
  const doctorDegrees = a(s03.degrees).join(', ')

  const statsList = a(s03.stats)
  const findStat = (keywords: string[]) => {
    const found = statsList.find((st: any) =>
      keywords.some(k => s(st.label, '').toLowerCase().includes(k.toLowerCase()))
    )
    return found ? s(found.number, '') : ''
  }
  const yearsExp       = findStat(['year', 'experience', 'exp'])
  const patientCount   = findStat(['patient', 'happy', 'treated'])
  const procedureCount = findStat(['surgery', 'surgeries', 'procedure', 'operation'])
  const googleRating   = s(s02.ratingValue, '5.0')
  const reviewCount    = s(s02.reviewCount, '')

  const doctor: DoctorInfo = {
    name:        doctorName,
    degrees:     doctorDegrees,
    photo:       s(s03.photo, ''),
    gender:      s(s03.gender, 'Male'),
    specialties: a(s03.specialties),
    qualifications: a(s03.degrees).length
      ? a(s03.degrees)
      : doctorDegrees.split(/[,·\-]+/).map((d: string) => d.trim()).filter(Boolean),
    languages:   a(s03.languages),
    nmcNumber:          s(s03.regNumber, ''),
    registrationNumber: s(s03.regNumber, ''),
    ctaLabel:    'Book Appointment',
    stats: a(s03.stats).length ? a(s03.stats).map((st: any) => ({
      number: s(st.number, ''),
      label:  s(st.label, ''),
    })) : [
      { number: yearsExp,       label: 'Years Experience' },
      { number: patientCount,   label: 'Happy Patients'   },
      { number: procedureCount, label: 'Procedures Done'  },
      { number: googleRating + '\u2605', label: 'Google Rating' },
    ],
    details: [
      { icon: 'location', text: `${clinic.name}, ${clinic.area}, ${clinic.city}`, link: mapsUrl },
      { icon: 'clock',    text: clinic.hours },
      { icon: 'language', text: clinic.languages },
    ],
    education:    a(s03.education),
    fellowships:  a(s03.fellowships),
    experience:   a(s03.experience),
    certifications: a(s03.certifications),
    workshops:    a(s03.workshops),
    publications: a(s03.publications),
    awards:       a(s03.awards),
    memberships:  a(s03.memberships),
    faqs:         a(s14.faqs).map((f: any) => ({
      question: s(f.q ?? f.question, ''),
      answer:   s(f.a ?? f.answer,   ''),
    })),
  }

  // ── Hero ──────────────────────────────────────────────────────────────────
  // Hero is auto-generated from s02 + s03 + s00 data
  const specialty = s(s02.medicalSpecialty || s00.entityType, 'Medical')

  const hero: HeroSection = {
    label:       `${clinic.name} · ${clinic.city}`,
    heading:     `Advanced ${specialty} Care in`,
    headingEm:   clinic.city,
    subtext:     `${doctorName} provides expert diagnosis and treatment using the latest technology and a patient-first approach.`,
    tags:        a(s03.degrees).length ? [
      a(s03.degrees)[0],
      yearsExp ? `${yearsExp} Years Experience` : '',
      patientCount ? `${patientCount} Patients Treated` : '',
    ].filter(Boolean) : [],
    ctaLabel:    'Book an Appointment',
    ctaHref:     '/appointment',
    stats: [
      { number: yearsExp,       label: 'Years Experience' },
      { number: patientCount,   label: 'Happy Patients'   },
      { number: procedureCount, label: 'Procedures Done'  },
      { number: googleRating + '\u2605', label: 'Google Rating' },
    ],
    chips: [
      { type: 'rating',     text: `${googleRating} Google Rating`   },
      { type: 'experience', text: yearsExp ? `${yearsExp} Years` : '' },
      { type: 'patients',   text: patientCount ? `${patientCount} Patients` : '' },
    ],
  }

  // ── Trust Strip ───────────────────────────────────────────────────────────
  // s05.items[]
  const trustStrip = a(s05.items).map((t: any) => ({
    icon: s(t.icon, ''),
    text: s(t.text || t.label || t, ''),
  }))

  // ── Why Choose ────────────────────────────────────────────────────────────
  // s06.items[]
  const WHY_COLORS = ['teal', 'blue', 'deep', 'green'] as const
  const WHY_ICONS  = ['pulse', 'clock', 'user', 'check']
  const whyChoose = a(s06.items).map((w: any, i: number) => ({
    iconColor:   WHY_COLORS[i % 4] as 'teal' | 'blue' | 'deep' | 'green',
    iconType:    WHY_ICONS[i % 4],
    title:       s(w.title, ''),
    description: s(w.text ?? w.description, ''),
  }))

  // ── Conditions ────────────────────────────────────────────────────────────
  // s07.conditions[]
  const conditionList = a(s07.conditions)
  const conditions = conditionList.map((c: any, i: number) => {
    const label = s(c.name ?? c.title, `condition-${i}`)
    const slug = s(c.slug, slugify(label))
    return {
      href:        `/conditions/${slug}`,
      gradClass:   g(i),
      iconType:    ['activity', 'shield', 'pulse', 'droplet'][i % 4],
      label,
      title:       label,
      description: s(c.descriptionShort ?? c.description, ''),
      image:       '',
    }
  })

  const servicesConditions = conditionList.map((c: any, i: number) => {
    const label = s(c.name ?? c.title, `condition-${i}`)
    const slug = s(c.slug, slugify(label))
    return {
      title:       label,
      description: s(c.descriptionLong ?? c.description, ''),
      slug,
      gradient:    gs(i),
    }
  })

  // ── Procedures ────────────────────────────────────────────────────────────
  // s08.procedures[]
  const PROC_ICONS = ['briefcase', 'zap', 'search', 'shield', 'tool', 'activity']
  const procedureList = a(s08.procedures)
  const procedures = procedureList.map((p: any, i: number) => {
    const label = s(p.name ?? p.title, `procedure-${i}`)
    const slug = s(p.slug, slugify(label))
    return {
      href:        `/procedures/${slug}`,
      gradClass:   g(i),
      iconType:    PROC_ICONS[i % PROC_ICONS.length],
      label,
      title:       label,
      description: s(p.descriptionShort ?? p.description, ''),
      image:       '',
    }
  })

  const servicesProcedures = procedureList.map((p: any, i: number) => {
    const label = s(p.name ?? p.title, `procedure-${i}`)
    const slug = s(p.slug, slugify(label))
    return {
      title:       label,
      description: s(p.descriptionLong ?? p.description, ''),
      slug,
      gradient:    gs(i),
    }
  })

  // ── Packages ──────────────────────────────────────────────────────────────
  // s10.packages[]
  const PKG_ICONS = ['box', 'tool', 'briefcase', 'zap', 'activity']
  const packageList = a(s10.packages)
  const packages = packageList.map((p: any, i: number) => {
    const label = s(p.name ?? p.title, `package-${i}`)
    const slug = s(p.slug, slugify(label))
    return {
      href:        `/packages/${slug}`,
      gradClass:   g(i),
      iconType:    PKG_ICONS[i % PKG_ICONS.length],
      title:       label,
      description: s(p.description, ''),
      price:       s(p.price, ''),
      tags:        a(p.tags ?? p.features),
    }
  })

  const productPackages = packageList.map((p: any, i: number) => {
    const slug = s(p.slug, slugify(s(p.title, `package-${i}`)))
    return {
      name:        s(p.title, ''),
      description: s(p.description, ''),
      slug,
      gradient:    gs(i),
      price:       s(p.price, ''),
      includes:    a(p.includes ?? p.tags ?? p.features),
    }
  })

  // ── How We Work ───────────────────────────────────────────────────────────
  // s11.steps[]
  const HWW_ICONS = ['message', 'search', 'file', 'check-circle']
  const howWeWork = a(s11.steps).map((step: any, i: number) => ({
    badge:       `Step ${i + 1 < 10 ? '0' + (i + 1) : i + 1}`,
    iconType:    HWW_ICONS[i % HWW_ICONS.length],
    title:       s(step.title, ''),
    description: s(step.text ?? step.description, ''),
  }))

  // ── Clinical Info ─────────────────────────────────────────────────────────
  // s12.cards[]
  const CLI_FIXED = [
    { colorClass: 'cl-green', iconType: 'pulse', title: 'Success Rates' },
    { colorClass: 'cl-amber', iconType: 'alert', title: 'Possible Risks' },
    { colorClass: 'cl-blue',  iconType: 'info',  title: 'Side Effects'  },
  ] as const
  const clinicalCards = a(s12.cards)
  const clinicalInfo = CLI_FIXED.map((fixed, i) => ({
    ...fixed,
    description: s(clinicalCards[i]?.text ?? clinicalCards[i]?.description, ''),
    note:        s(clinicalCards[i]?.note, ''),
  }))

  // ── Patient Stories ───────────────────────────────────────────────────────
  // s16 (patient stories)
  const storyList = a(s16.stories ?? s16.items ?? [])
  const patientStories = storyList.map((story: any, i: number) => ({
    gradClass: g(i),
    duration:  s(story.duration, ''),
    title:     s(story.title, ''),
    tag:       s(story.tag, ''),
    videoUrl:  s(story.videoUrl, ''),
  }))

  const successStories = {
    videoCount:     s(s16.videoCount, `${storyList.length}+`),
    conditionCount: s(s16.conditionCount, ''),
    rating:         googleRating,
    stories: storyList.map((story: any, i: number) => ({
      gradient:    gs(i),
      duration:    s(story.duration, ''),
      tag:         s(story.tag, ''),
      tagType:     (story.tagType === 'condition' ? 'condition' : 'procedure') as 'condition' | 'procedure',
      category:    s(story.category, ''),
      title:       s(story.title, ''),
      description: s(story.description, ''),
    })),
  }

  // ── Pricing ───────────────────────────────────────────────────────────────
  // s15.sections[]
  const PRC_FIXED = [
    { barClass: 'acc-teal',    iconType: 'dollar',      title: 'Upfront Pricing'  },
    { barClass: 'acc-blue',    iconType: 'credit-card', title: 'EMI Available'    },
    { barClass: 'acc-vibrant', iconType: 'shield',      title: 'Insurance Support'},
  ] as const
  const pricingRaw = a(s15.sections)
  const pricing = PRC_FIXED.map((fixed, i) => ({
    ...fixed,
    description: s(pricingRaw[i]?.title ?? pricingRaw[i]?.description, ''),
    points:      typeof pricingRaw[i]?.items === 'string'
      ? pricingRaw[i].items.split('\n').map((l: string) => l.trim()).filter(Boolean)
      : a(pricingRaw[i]?.points ?? pricingRaw[i]?.items),
  }))

  // ── Reviews ───────────────────────────────────────────────────────────────
  // s13.reviews[]
  const reviewList = a(s13.reviews)
  const reviews = reviewList.map((r: any, i: number) => ({
    initials: s(r.initials, initials(s(r.name, ''))),
    name:     s(r.name, ''),
    date:     s(r.date, ''),
    text:     s(r.text ?? r.review, ''),
    gradient: gs(i),
  }))

  const reviewSummary = {
    score:     googleRating,
    count:     reviewCount ? `Based on ${reviewCount} Google Reviews` : '',
    googleUrl: s(s02.socialGoogle, ''),
  }

  const testimonials = {
    rating:      googleRating,
    reviewCount,
    googleUrl:   s(s02.socialGoogle, ''),
    reviews,
  }

  // ── Local Areas ───────────────────────────────────────────────────────────
  // s17.areas[]
  const areaList = a(s17.areas)
  const localAreas = areaList.map((ar: any) => {
    const name = s(ar.area ?? ar.name, '')
    const slug = s(ar.slug, slugify(name))
    return {
      name,
      slug,
      distance: s(ar.distance, ''),
      duration: s(ar.duration, ''),
      label:    name,
      href:     `/location/${slug}`,
    }
  })

  // ── FAQ ───────────────────────────────────────────────────────────────────
  // s14.faqs[] — ConfigEditor saves q/a, fallback to question/answer
  const faq = a(s14.faqs).map((f: any) => ({
    question: s(f.q ?? f.question, ''),
    answer:   s(f.a ?? f.answer,   ''),
  }))

  // ── Blog ──────────────────────────────────────────────────────────────────
  // s18.posts[]
  const blog = a(s18.posts).map((b: any, i: number) => ({
    href:      `/blog/${s(b.slug, slugify(s(b.title, `post-${i}`)))}`,
    gradStyle: gs(i),
    date:      s(b.date, ''),
    title:     s(b.title, ''),
    excerpt:   s(b.excerpt, ''),
  }))

  // ── CTA Band ──────────────────────────────────────────────────────────────
  const ctaBand = {
    heading:       'Ready to take the first step?',
    subtext:       `Book an appointment with ${doctorName} today.`,
    primaryLabel:  'Book Appointment',
    primaryHref:   '/appointment',
    secondaryLabel:'WhatsApp Us',
    secondaryHref: `https://wa.me/${whatsapp}`,
    infoItems:     [
      clinic.area ? `${clinic.area}, ${clinic.city}` : clinic.city,
      clinic.hours,
    ].filter(Boolean),
    info: [
      clinic.area ? `${clinic.area}, ${clinic.city}` : clinic.city,
      clinic.hours,
    ].filter(Boolean),
  }

  // ── Team ──────────────────────────────────────────────────────────────────
  // s21.members[]
  const team = a(s21.members).map((m: any, i: number) => ({
    name:           s(m.name, ''),
    designation:    s(m.designation, ''),
    qualifications: a(m.qualifications),
    experience:     s(m.experience, ''),
    schedule:       s(m.schedule, ''),
    gradient:       gt(i),
    isLead:         Boolean(m.isLead),
    photo:          '',
  }))

  // ── Locations ─────────────────────────────────────────────────────────────
  // For solo clinics, build a single location from s02 data
  const locations = [{
    name:        clinic.name,
    slug:        slugify(clinic.name),
    address:     clinic.address,
    phone:       clinic.phone,
    hours:       clinic.hours,
    mapUrl:      mapsUrl,
    mapEmbedUrl: clinic.mapEmbedUrl,
    isPrimary:   true,
  }]

  // ── Optional Pages ────────────────────────────────────────────────────────
  const optionalPages = {
    gallery:      Boolean(s00.galleryEnabled),
    testimonials: true,
  }

  // ── Brand ─────────────────────────────────────────────────────────────────
  const brand = {
    primaryColor:   s(s00.primaryColor,   '#0d7a5f'),
    secondaryColor: s(s00.secondaryColor, '#1a4ea0'),
  }

  // ── Assemble ──────────────────────────────────────────────────────────────
  return {
    brand,
    clinic,
    doctor,
    hero,
    trustStrip,
    whyChoose,
    conditions,
    procedures,
    packages,
    howWeWork,
    clinicalInfo,
    patientStories,
    pricing,
    reviews,
    reviewSummary,
    localAreas,
    faq,
    blog,
    ctaBand,
    services: {
      conditions: servicesConditions,
      procedures: servicesProcedures,
    },
    productPackages,
    testimonials,
    successStories,
    areas:        localAreas,
    team,
    locations,
    optionalPages,
    photos:       {},
  }
}

// Auto-appended by install_final.sh
// ─────────────────────────────────────────────────────────────
// ADDITIONS TO transform.ts  (append after existing exports)
// File: ~/Desktop/drsmart-website-template/lib/transform.ts
// ─────────────────────────────────────────────────────────────
//
// These three functions read from the same `config` object your
// existing transformConfig() already produces.  Call them after
// you have a full config, or call them independently with the
// raw Supabase JSONB.
// ─────────────────────────────────────────────────────────────

// ── Types ────────────────────────────────────────────────────

export interface ConditionPageProps {
  // Hero
  name: string
  slug: string
  description: string
  shortDescription: string
  pills: string[]           // up to 3 keyword pills
  heroStats: { label: string; value: string }[]  // up to 3
  heroImage: string | null

  // Content sections (AI-generated, stored in s07 per item)
  icd10Code: string
  prevalence: string
  progressionType: string
  diagnosisMethod: string
  types: { name: string; description: string }[]       // 3 tabs
  causes: string[]                                      // pill cloud
  symptoms: {
    early: string[]
    moderate: string[]
    advanced: string[]
  }
  treatments: {
    name: string
    description: string
    expanded?: boolean
  }[]                                                   // 3 cards
  howWeHandle: { step: string; title: string; description: string }[] // 4 steps
  recoveryPhases: { phase: string; title: string; description: string }[] // 3 tabs
  outcomes: { title: string; description: string }[]   // 4 cards
  ifNotTreated: string
  whenToSeeDoctor: string
  relatedProcedureSlugs: string[]                      // auto-linked from s08
  faqs: { question: string; answer: string }[]         // 5 items

  // Clinic context (from existing config sections)
  clinicName: string
  doctorName: string
  phone: string
  address: string
  city: string
  mapUrl: string | null
}

export interface ProcedurePageProps {
  // Hero
  name: string
  slug: string
  description: string
  shortDescription: string
  pills: string[]
  heroImage: string | null

  // Quick facts
  anaesthesia: string
  duration: string
  hospitalStay: string
  recoveryTime: string
  costRange: string
  insuranceCoverage: string
  icd10Code: string

  // Content sections
  whoNeedsIt: string
  successRate: string
  risks: string[]
  sideEffects: string[]
  preParation: string[]                                 // pre-procedure steps
  howItWorks: { step: string; title: string; description: string }[]  // 4-5 steps
  howWeHandle: { step: string; title: string; description: string }[] // 4 steps
  durationMilestones: {
    label: string
    duration: string
  }[]                                                   // 6 milestones
  estimatedTimeline: string
  recoveryPhases: { phase: string; title: string; description: string }[]
  outcomes: { title: string; description: string }[]
  misconceptions: { myth: string; reality: string }[]
  ifNotTreated: string
  whenToSeeDoctor: string
  relatedConditionSlugs: string[]
  faqs: { question: string; answer: string }[]

  // Clinic context
  clinicName: string
  doctorName: string
  phone: string
  address: string
  city: string
  mapUrl: string | null
}

export interface PackagePageProps {
  // Hero
  name: string
  slug: string
  description: string
  shortDescription: string
  price: string
  heroImage: string | null

  // Content
  whatsIncluded: {
    category: string
    items: string[]
  }[]                                                   // 4 categories
  howItWorks: { step: string; title: string; description: string }[]
  whoIsItFor: string
  pricingBreakdown: {
    item: string
    price: string
  }[]
  exclusions: string[]
  insuranceCoverage: string
  estimatedTimeline: string
  paymentOptions: string[]
  testimonials: {
    name: string
    text: string
    rating: number
  }[]
  faqs: { question: string; answer: string }[]

  // Clinic context
  clinicName: string
  doctorName: string
  phone: string
  address: string
  city: string
  mapUrl: string | null
}

// ── Helpers ──────────────────────────────────────────────────

/** Pull clinic context fields shared by all three page types */
function clinicContext(config: any) {
  const s02 = config?.s02 ?? {}
  const s03 = config?.s03 ?? {}
  const s17 = config?.s17 ?? {}
  const s23 = config?.s23 ?? {}

  const doctor = s03
  const prefix = doctor.honorificPrefix ?? 'Dr'
  const firstName = doctor.firstName ?? ''
  const lastName = doctor.lastName ?? ''
  const doctorName =
    [prefix, firstName, lastName].filter(Boolean).join(' ').trim() ||
    'Our Doctor'

  return {
    clinicName: s02.brandName ?? '',
    doctorName,
    phone: s02.phone ?? s02.mobilePhone ?? '',
    address:
      [s02.addressLine1, s02.addressLine2, s02.city, s02.state]
        .filter(Boolean)
        .join(', '),
    city: s02.city ?? '',
    mapUrl: s23.googleDirections ?? s02.googleMapsUrl ?? null,
  }
}

/** Safely get a string field with a fallback */
function str(val: any, fallback = ''): string {
  return typeof val === 'string' ? val : fallback
}

/** Safely get an array field */
function arr<T>(val: any): T[] {
  return Array.isArray(val) ? val : []
}

// ── mapCondition ─────────────────────────────────────────────

/**
 * Map a single condition item from s07 + full config → ConditionPageProps
 *
 * @param conditionItem   One item from config.s07.conditions[]
 * @param config          Full config JSONB from Supabase
 * @param photoUrl        Optional uploaded photo URL from websites.photos
 */
export function mapCondition(
  conditionItem: any,
  config: any,
  photoUrl: string | null = null
): ConditionPageProps {
  const c = conditionItem ?? {}
  const s08 = config?.s08 ?? {}
  const procedures: any[] = arr(s08.procedures)

  // Auto-link related procedures: match by slug or keyword in name
  const relatedProcedureSlugs = procedures
    .filter((p) => {
      const relatedNames: string[] = arr(c.relatedProcedures)
      return relatedNames.some(
        (rn) =>
          p.slug === rn ||
          p.name?.toLowerCase().includes(rn.toLowerCase())
      )
    })
    .map((p) => p.slug)
    .slice(0, 4)

  return {
    // Hero
    name: str(c.name),
    slug: str(c.slug),
    description: str(c.description),
    shortDescription: str(c.shortDescription),
    pills: arr<string>(c.pills).slice(0, 3),
    heroStats: arr(c.heroStats).slice(0, 3),
    heroImage: photoUrl ?? str(c.heroImage) || null,

    // Quick facts
    icd10Code: str(c.icd10Code),
    prevalence: str(c.prevalence),
    progressionType: str(c.progressionType),
    diagnosisMethod: str(c.diagnosisMethod),

    // Sections
    types: arr(c.types).slice(0, 3),
    causes: arr<string>(c.causes),
    symptoms: {
      early: arr<string>(c.symptoms?.early),
      moderate: arr<string>(c.symptoms?.moderate),
      advanced: arr<string>(c.symptoms?.advanced),
    },
    treatments: arr(c.treatments).slice(0, 3),
    howWeHandle: arr(c.howWeHandle).slice(0, 4),
    recoveryPhases: arr(c.recoveryPhases).slice(0, 3),
    outcomes: arr(c.outcomes).slice(0, 4),
    ifNotTreated: str(c.ifNotTreated),
    whenToSeeDoctor: str(c.whenToSeeDoctor),
    relatedProcedureSlugs,
    faqs: arr(c.faqs).slice(0, 5),

    ...clinicContext(config),
  }
}

// ── mapProcedure ─────────────────────────────────────────────

/**
 * Map a single procedure item from s08 + full config → ProcedurePageProps
 *
 * @param procedureItem   One item from config.s08.procedures[]
 * @param config          Full config JSONB from Supabase
 * @param photoUrl        Optional uploaded photo URL from websites.photos
 */
export function mapProcedure(
  procedureItem: any,
  config: any,
  photoUrl: string | null = null
): ProcedurePageProps {
  const p = procedureItem ?? {}
  const s07 = config?.s07 ?? {}
  const conditions: any[] = arr(s07.conditions)

  // Auto-link related conditions
  const relatedConditionSlugs = conditions
    .filter((c) => {
      const relatedNames: string[] = arr(p.relatedConditions)
      return relatedNames.some(
        (rn) =>
          c.slug === rn ||
          c.name?.toLowerCase().includes(rn.toLowerCase())
      )
    })
    .map((c) => c.slug)
    .slice(0, 4)

  return {
    // Hero
    name: str(p.name),
    slug: str(p.slug),
    description: str(p.description),
    shortDescription: str(p.shortDescription),
    pills: arr<string>(p.pills).slice(0, 3),
    heroImage: photoUrl ?? str(p.heroImage) || null,

    // Quick facts
    anaesthesia: str(p.anaesthesia),
    duration: str(p.duration),
    hospitalStay: str(p.hospitalStay),
    recoveryTime: str(p.recoveryTime),
    costRange: str(p.costRange),
    insuranceCoverage: str(p.insuranceCoverage),
    icd10Code: str(p.icd10Code),

    // Sections
    whoNeedsIt: str(p.whoNeedsIt),
    successRate: str(p.successRate),
    risks: arr<string>(p.risks),
    sideEffects: arr<string>(p.sideEffects),
    preParation: arr<string>(p.preparation),
    howItWorks: arr(p.howItWorks).slice(0, 5),
    howWeHandle: arr(p.howWeHandle).slice(0, 4),
    durationMilestones: arr(p.durationMilestones).slice(0, 6),
    estimatedTimeline: str(p.estimatedTimeline),
    recoveryPhases: arr(p.recoveryPhases).slice(0, 3),
    outcomes: arr(p.outcomes).slice(0, 4),
    misconceptions: arr(p.misconceptions),
    ifNotTreated: str(p.ifNotTreated),
    whenToSeeDoctor: str(p.whenToSeeDoctor),
    relatedConditionSlugs,
    faqs: arr(p.faqs).slice(0, 5),

    ...clinicContext(config),
  }
}

// ── mapPackage ───────────────────────────────────────────────

/**
 * Map a single package/product item from s09 + full config → PackagePageProps
 *
 * @param packageItem   One item from config.s09.products[]
 * @param config        Full config JSONB from Supabase
 * @param photoUrl      Optional uploaded photo URL from websites.photos
 */
export function mapPackage(
  packageItem: any,
  config: any,
  photoUrl: string | null = null
): PackagePageProps {
  const pk = packageItem ?? {}

  return {
    name: str(pk.name),
    slug: str(pk.slug),
    description: str(pk.description),
    shortDescription: str(pk.shortDescription),
    price: str(pk.price),
    heroImage: photoUrl ?? str(pk.heroImage) || null,

    whatsIncluded: arr(pk.whatsIncluded).slice(0, 4),
    howItWorks: arr(pk.howItWorks).slice(0, 4),
    whoIsItFor: str(pk.whoIsItFor),
    pricingBreakdown: arr(pk.pricingBreakdown),
    exclusions: arr<string>(pk.exclusions),
    insuranceCoverage: str(pk.insuranceCoverage),
    estimatedTimeline: str(pk.estimatedTimeline),
    paymentOptions: arr<string>(pk.paymentOptions),
    testimonials: arr(pk.testimonials).slice(0, 3),
    faqs: arr(pk.faqs).slice(0, 5),

    ...clinicContext(config),
  }
}
