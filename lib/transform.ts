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
    name:        s(s02.brandName ?? s02.name, 'Clinic'),
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
    hours: typeof s02.hours === 'string' ? s02.hours : (s02.hours && typeof s02.hours === 'object' ? 'Mon–Sat: 9:00 AM – 8:00 PM' : ''),
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
      slug,
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
      slug,
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
      slug,
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
    primaryHref:   '#',
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

// ─────────────────────────────────────────────────────────────
// REPLACE the three map functions at the bottom of lib/transform.ts
// Replace from the line: "export function mapCondition("
// through to the end of the file
// ─────────────────────────────────────────────────────────────

// ── Helpers ──────────────────────────────────────────────────

/** Pull clinic context fields shared by all three page types */

function stripCite(val: any): string {
  if (typeof val !== "string") return ""
  return val.replace(/<cite[^>]*>(.*?)<\/cite>/gs, "$1").trim()
}

function clinicContext(rawConfig: any) {
  const s02 = rawConfig?.s02 ?? {}
  const s03 = rawConfig?.s03 ?? {}
  const s23 = rawConfig?.s23 ?? {}

  const prefix    = s(s03.honorificPrefix ?? 'Dr')
  const firstName = s(s03.firstName, '')
  const lastName  = s(s03.lastName, '')
  const doctorName = [prefix, firstName, lastName].filter(Boolean).join(' ').trim() || 'Our Doctor'

  const phone      = s(s02.telephone ?? s02.phone ?? s02.mobilePhone, '')
  const whatsapp   = s(s02.whatsapp, phone.replace(/\D/g, ''))
  const clinicName = s(s02.brandName ?? s02.name, '')
  const city       = s(s02.city, '')
  const address    = [s(s02.buildingName,''), s(s02.street,''), city].filter(Boolean).join(', ')
  const hours      = typeof s02.hours === 'string' ? s02.hours
                   : (s02.hours && typeof s02.hours === 'object') ? 'Mon–Sat: 9:00 AM – 8:00 PM'
                   : ''

  return {
    clinicName,
    clinicAddress: address,
    clinicHours:   hours,
    whatsappNumber: whatsapp || phone.replace(/\D/g, ''),
    appointmentUrl: '/appointment',
  }
}

/** Safely get string */

/** Safely get array */

/** Strip <cite ...>...</cite> tags from AI-generated content */

// ── mapCondition ─────────────────────────────────────────────
/**
 * Maps one item from s07.conditions[] + full rawConfig
 * → props for ConditionDetail component
 */
export function mapCondition(
  conditionItem: any,
  rawConfig: any,
  photoUrl: string | null = null
) {
  const c    = conditionItem ?? {}
  const s08  = rawConfig?.s08 ?? {}
  const procs: any[] = a(s08.procedures)

  // Auto-link related procedures by slug or name match
  const relatedProcedures = procs
    .filter(p => {
      const related: string[] = a(c.relatedProcedures)
      return related.some(rn => p.slug === rn || p.name?.toLowerCase().includes(rn.toLowerCase()))
    })
    .map(p => ({ name: s(p.name), slug: s(p.slug) }))
    .slice(0, 4)

  // treatments: map to new shape {name, description, invasiveness, invasivenessStyle, items}
  const treatments = a(c.treatments).slice(0, 4).map((t: any) => ({
    name:        s(t.name),
    shortDescription: stripCite(t.shortDescription ?? t.description),
    description: stripCite(t.description),
    invasiveness: s(t.invasiveness ?? t.type),
    invasivenessStyle: (() => {
      const inv = s(t.invasiveness ?? t.type).toUpperCase()
      if (inv.includes('SURGICAL')) return { background: '#FEF2F2', color: '#DC2626' }
      if (inv.includes('MODERATE')) return { background: '#FEF3C7', color: '#D68910' }
      return { background: '#F0FDFA', color: '#3CB8AF' }
    })(),
    items: a<string>(t.items ?? t.bullets ?? t.details),
  }))

  // howWeHandle: map to {title, description}
  const howWeHandle = a(c.howWeHandle).slice(0, 4).map((h: any) => ({
    title:       s(h.title ?? h.step),
    description: s(h.description),
  }))

  // recoveryPhases: map to {label, title, description, timeline[], warnings[]}
  const recoveryPhases = a(c.recoveryPhases ?? c.recovery).slice(0, 3).map((r: any) => ({
    label:       s(r.label ?? r.phase),
    title:       s(r.title ?? r.phase),
    description: stripCite(r.description),
    timeline: a(r.timeline).map((row: any) => ({
      badge: s(row.badge ?? row.label),
      text:  s(row.text),
    })),
    warnings: a<string>(r.warnings),
  }))

  // whenToSeeDoctor: old shape was string, new shape is {intro?, items?[]}
  const wtsRaw = c.whenToSeeDoctor
  const whenToSeeDoctor = typeof wtsRaw === 'string'
    ? { intro: stripCite(wtsRaw), items: [] }
    : wtsRaw && typeof wtsRaw === 'object'
    ? { intro: stripCite(wtsRaw.intro), items: a<string>(wtsRaw.items) }
    : undefined

  return {
    name:        s(c.name),
    icd10Code:       s(c.icd10 ?? c.icd10Code),
    prevalence:      stripCite(c.prevalence),
    progressionType: stripCite(c.progressionType),
    diagnosisMethod: stripCite(c.diagnosisMethod),
    slug:        s(c.slug),
    description: stripCite(c.description ?? c.descriptionLong ?? c.shortDescription),
    heroImage:   photoUrl ?? s(c.heroImage) ?? null,
    pills:       a<string>(c.pills).slice(0, 3),
    heroStats:   a(c.heroStats).slice(0, 3).map((st: any) => ({
      label: s(st.label), value: s(st.value),
    })),
    types: a(c.types).slice(0, 3).map((t: any) => ({
      name:        s(t.name),
      description: stripCite(t.description),
    })),
    causes:      a<string>(c.causes),
    symptoms: {
      early:    a<string>(c.symptoms?.early),
      moderate: a<string>(c.symptoms?.moderate),
      advanced: a<string>(c.symptoms?.advanced),
    },
    treatments,
    howWeHandle,
    recoveryPhases,
    outcomes: a(c.outcomes).slice(0, 4).map((o: any) => ({
      title:       s(o.title),
      description: stripCite(o.description),
    })),
    ifNotTreated:    stripCite(c.ifNotTreated) || undefined,
    whenToSeeDoctor,
    relatedProcedures,
    faqs: a(c.faqs).slice(0, 5).map((f: any) => ({
      question: stripCite(f.question ?? f.q),
      answer:   stripCite(f.answer ?? f.a),
    })),
    ...clinicContext(rawConfig),
  }
}

// ── mapProcedure ─────────────────────────────────────────────
/**
 * Maps one item from s08.procedures[] + full rawConfig
 * → props for ProcedureDetail component
 */
export function mapProcedure(
  procedureItem: any,
  rawConfig: any,
  photoUrl: string | null = null
) {
  const p   = procedureItem ?? {}
  const s07 = rawConfig?.s07 ?? {}
  const conds: any[] = a(s07.conditions)

  // Auto-link related conditions
  const relatedConditions = conds
    .filter(c => {
      const related: string[] = a(p.relatedConditions)
      return related.some(rn => c.slug === rn || c.name?.toLowerCase().includes(rn.toLowerCase()))
    })
    .map(c => ({ name: s(c.name), slug: s(c.slug) }))
    .slice(0, 4)

  // quickFacts: build from individual fields
  const quickFacts = [
    p.anaesthesia   && { label: 'Anaesthesia',      value: stripCite(p.anaesthesia) },
    p.duration      && { label: 'Procedure Duration',value: stripCite(p.duration) },
    p.hospitalStay  && { label: 'Hospital Stay',     value: stripCite(p.hospitalStay) },
    p.recoveryTime  && { label: 'Return to Work',    value: stripCite(p.recoveryTime) },
    p.fullRecovery  && { label: 'Full Recovery',     value: stripCite(p.fullRecovery) },
    p.successRate   && { label: 'Success Rate',      value: stripCite(p.successRate) },
  ].filter(Boolean) as { label: string; value: string }[]

  // candidacy: could be string[] or string
  const candidacy = Array.isArray(p.candidacy)
    ? a<string>(p.candidacy).map(stripCite)
    : typeof p.whoNeedsIt === 'string' && p.whoNeedsIt
    ? stripCite(p.whoNeedsIt).split(/(?<=[.!?])\s+/).map((s: string) => s.trim()).filter((s: string) => s.length > 0)
    : []

  // successRateItems / risksItems / sideEffectsItems
  const successRateItems = Array.isArray(p.successRateItems)
    ? a<string>(p.successRateItems).map(stripCite)
    : typeof p.successRate === 'string' && p.successRate
    ? [stripCite(p.successRate)]
    : []

  const risksItems     = a<string>(p.risks ?? p.risksItems).map(stripCite)
  const sideEffectsItems = a<string>(p.sideEffects ?? p.sideEffectsItems).map(stripCite)

  // steps (How It Works numbered stepper): {title, description}
  const steps = a(p.howItWorks ?? p.steps).slice(0, 5).map((st: any) => ({
    title:       s(st.title ?? st.step),
    description: stripCite(st.description),
  }))

  // timelines (Duration cards): {label, value, description}
  const timelines = a(p.durationMilestones ?? p.timelines).slice(0, 6).map((tl: any) => ({
    label:       stripCite(tl.milestone ?? tl.label),
    value:       stripCite(tl.timeframe ?? tl.duration ?? tl.value),
    description: stripCite(tl.description),
  }))

  // howWeHandle: {title, description}
  const howWeHandle = a(p.howWeHandle).slice(0, 4).map((h: any) => ({
    title:       s(h.title ?? h.step),
    description: stripCite(h.description),
  }))

  // recoveryPhases: {label, title, description, timeline[], warnings[]}
  const recoveryPhases = a(p.recoveryPhases ?? p.recovery).slice(0, 3).map((r: any) => ({
    label:       s(r.label ?? r.phase),
    title:       s(r.title ?? r.phase),
    description: stripCite(r.description),
    timeline: a(r.timeline).map((row: any) => ({
      badge: s(row.badge ?? row.label),
      text:  stripCite(row.text),
    })),
    warnings: a<string>(r.warnings).map(stripCite),
  }))

  // myths: {myth, fact} — old shape was misconceptions: {myth, reality}
  const myths = a(p.misconceptions ?? p.myths).slice(0, 5).map((m: any) => ({
    myth: stripCite(m.myth),
    fact: stripCite(m.fact ?? m.reality),
  }))

  // ifDelayed
  const ifd = p.ifNotTreated ?? p.ifDelayed
  const ifDelayed = ifd
    ? typeof ifd === 'string'
      ? { items: ifd.split('\n').map((l: string) => stripCite(l.trim())).filter(Boolean) }
      : { title: s(ifd.title), intro: stripCite(ifd.intro), items: a<string>(ifd.items).map(stripCite) }
    : undefined

  return {
    name:        s(p.name),
    slug:        s(p.slug),
    description: stripCite(p.shortDescription ?? p.shortdescription ?? p.description ?? p.descriptionLong),
    heroImage:   photoUrl ?? s(p.heroImage) ?? null,
    pills:       a<string>(p.pills).slice(0, 3),
    heroStats:   a(p.heroStats).slice(0, 3).map((st: any) => ({
      label: s(st.label), value: s(st.value),
    })),
    quickFacts,
    candidacy,
    candidacyIntro: s(p.candidacyIntro),
    successRateItems,
    risksItems,
    sideEffectsItems,
    riskNote:    s(p.riskNote),
    steps,
    timelines,
    howWeHandle,
    recoveryPhases,
    outcomes: a(p.outcomes).slice(0, 4).map((o: any) => ({
      title:       s(o.title),
      description: stripCite(o.description),
    })),
    myths,
    ifDelayed,
    relatedConditions,
    faqs: a(p.faqs).slice(0, 5).map((f: any) => ({
      question: stripCite(f.question ?? f.q),
      answer:   stripCite(f.answer ?? f.a),
    })),
    ...clinicContext(rawConfig),
  }
}

// ── mapPackage ───────────────────────────────────────────────
/**
 * Maps one item from s10.packages[] + full rawConfig
 * → props for PackageDetail component
 */
export function mapPackage(
  packageItem: any,
  rawConfig: any,
  photoUrl: string | null = null
) {
  const pk  = packageItem ?? {}
  const s08 = rawConfig?.s08 ?? {}
  const procs: any[] = a(s08.procedures)

  // Related procedures: match by slug or name
  const relatedProcedures = procs
    .filter(p => {
      const related: string[] = a(pk.relatedProcedures)
      return related.some(rn => p.slug === rn || p.name?.toLowerCase().includes(rn.toLowerCase()))
    })
    .map(p => ({ name: s(p.name), slug: s(p.slug) }))
    .slice(0, 4)

  // inclusions: old shape whatsIncluded[{category, items[]}] — same shape, just ensure arrays
  const inclusions = a(pk.whatsIncluded ?? pk.inclusions).slice(0, 4).map((inc: any) => ({
    category: s(inc.category ?? inc.title),
    items:    a<string>(inc.items),
  }))

  // howItWorks: {title, description}
  const howItWorks = a(pk.howItWorks ?? pk.steps).slice(0, 4).map((h: any) => ({
    title:       s(h.title ?? h.step),
    description: s(h.description),
  }))

  // whoIsItFor: old shape was string, new is string[]
  const whoIsItFor = Array.isArray(pk.whoIsItFor)
    ? a<string>(pk.whoIsItFor)
    : typeof pk.whoIsItFor === 'string' && pk.whoIsItFor
    ? pk.whoIsItFor.split(/\n/).map((l: string) => l.trim()).filter(Boolean)
    : []

  // pricingRows: [{label, value}]
  const pricingRows = a(pk.pricingBreakdown).map((row: any) => ({
    label: s(row.item ?? row.label),
    value: s(row.amount ?? row.price ?? row.value),
  }))

  // pricingTotal
  const pricingTotal = pk.totalPrice || pk.price
    ? { label: 'Total Package Range', value: (() => { const v = s(pk.totalPrice ?? pk.price); return v && !v.includes('₹') && /^[0-9,]+$/.test(v.trim()) ? '₹' + v : v; })() }
    : undefined

  // paymentOptions: old shape was string[], new is {title, items[]}[]
  const paymentOptions = Array.isArray(pk.paymentOptions)
    ? a(pk.paymentOptions).map((opt: any) =>
        typeof opt === 'string'
          ? { title: opt, items: [] }
          : { title: s(opt.title), items: a<string>(opt.items) }
      )
    : []

  // testimonials: {name, detail, text, rating}
  const testimonials = a(pk.testimonials).slice(0, 2).map((t: any) => ({
    name:   s(t.name),
    detail: s(t.detail ?? t.subtitle ?? t.procedure ?? ''),
    text:   s(t.text ?? t.review),
    rating: typeof t.rating === 'number' ? t.rating : 5,
  }))

  return {
    name:        s(pk.name ?? pk.title),
    slug:        s(pk.slug),
    description: stripCite(pk.shortDescription ?? pk.shortdescription ?? pk.description),
    heroImage:   photoUrl ?? s(pk.heroImage) ?? null,
    pills:       a<string>(pk.pills).slice(0, 3),
    priceRange:  (() => { const v = s(pk.priceRange ?? pk.price); return v && !v.includes('₹') && /^[0-9,]+$/.test(v.trim()) ? '₹' + v : v; })(),
    priceUnit:   s(pk.priceUnit ?? 'per procedure'),
    inclusions,
    howItWorks,
    whoIsItFor,
    pricingTitle:    s(pk.name ?? pk.title),
    pricingSubtitle: s(pk.pricingSubtitle ?? 'Complete cost structure'),
    pricingRows,
    pricingTotal,
    pricingNote:     s(pk.pricingNote),
    paymentOptions,
    testimonials,
    relatedProcedures,
    faqs: a(pk.faqs).slice(0, 5).map((f: any) => ({
      question: stripCite(f.question ?? f.q),
      answer:   stripCite(f.answer ?? f.a),
    })),
    ...clinicContext(rawConfig),
  }
}
