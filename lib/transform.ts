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
  const localAreas = areaList.map((ar: any) => ({
    name:     s(ar.area ?? ar.name, ''),
    slug:     s(ar.slug, slugify(s(ar.area ?? ar.name, ''))),
    distance: s(ar.distance, ''),
    duration: s(ar.duration, ''),
  }))

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
  }
}
