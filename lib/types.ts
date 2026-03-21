export interface ClinicConfig {
  photos: Record<string, string>
  services: ServicesConfig
  productPackages: ProductPackage[]
  testimonials: TestimonialsConfig
  successStories: SuccessStoriesConfig
  areas: AreaItem[]
  team: TeamMember[]
  optionalPages: OptionalPages
  clinic: ClinicInfo
  doctor: DoctorInfo
  hero: HeroSection
  trustStrip: TrustItem[]
  whyChoose: WhyCard[]
  conditions: CardItem[]
  procedures: CardItem[]
  packages: PackageItem[]
  howWeWork: StepItem[]
  clinicalInfo: ClinicalCard[]
  patientStories: StoryItem[]
  pricing: PricingItem[]
  reviews: ReviewItem[]
  reviewSummary: ReviewSummary
  localAreas: AreaItem[]
  faq: FaqItem[]
  blog: BlogPost[]
  ctaBand: CTABand
  brand?: { primaryColor: string; secondaryColor: string }
  locations?: any[]
}

export interface ClinicInfo {
  name: string
  tagline: string
  phone: string
  whatsapp: string
  logo?: string
  heroImage?: string
  aboutImage?: string
  mapEmbedUrl?: string
  medicalSpecialty?: string
  email: string
  address: string
  city: string
  area: string
  street: string
  hospital: string
  mapsUrl: string
  mapUrl: string
  hours: string
  languages: string
  social?: {
    google?: string
    facebook?: string
    instagram?: string
    youtube?: string
  }
  insurers?: { bg: string; initials: string; name: string }[]
  website?: string
  specialty?: string
  description?: string
  image?: string
  type?: string
  locality?: string
  geo?: { lat: string; lng: string }
  priceRange?: string
  areaServed?: string[]
  aggregateRating?: { ratingValue: string; reviewCount: string }
}

export interface DoctorInfo {
  qualifications: string[]
  languages: string[]
  education: { degree: string; institution: string }[]
  fellowships: { title: string; institution: string }[]
  experience: { role: string; hospital: string }[]
  certifications: string[]
  workshops: { title: string; location: string }[]
  publications: { title: string; journal: string }[]
  awards: { title: string; year: string }[]
  memberships: string[]
  nmcNumber: string
  faqs: FaqItem[]
  name: string
  degrees: string
  photo: string
  specialties: string[]
  stats: DoctorStat[]
  details: DoctorDetail[]
  ctaLabel: string
  gender?: string
  specialty?: string
  description?: string
  image?: string
  profileUrl?: string
  priceRange?: string
  registrationNumber?: string
}

export interface DoctorStat {
  number: string
  label: string
}

export interface DoctorDetail {
  icon: 'location' | 'clock' | 'language'
  text: string
  link?: string
}

export interface HeroSection {
  label: string
  heading: string
  headingEm: string
  subtext: string
  tags: string[]
  ctaLabel: string
  ctaHref: string
  stats: HeroStat[]
  chips: HeroChip[]
}

export interface HeroStat {
  number: string
  label: string
}

export interface HeroChip {
  type: 'rating' | 'experience' | 'patients'
  text: string
}

export interface TrustItem {
  icon: string
  text: string
}

export interface WhyCard {
  iconColor: 'teal' | 'blue' | 'deep' | 'green'
  iconType: string
  title: string
  description: string
}

export interface CardItem {
  href: string
  gradClass: string
  iconType: string
  label: string
  title: string
  description: string
  image?: string
}

export interface PackageItem {
  href: string
  gradClass: string
  iconType: string
  title: string
  description: string
  price: string
  tags: string[]
}

export interface StepItem {
  badge: string
  iconType: string
  title: string
  description: string
}

export interface ClinicalCard {
  colorClass: 'cl-green' | 'cl-amber' | 'cl-blue'
  iconType: string
  title: string
  description: string
  note: string
}

export interface StoryItem {
  gradClass: string
  duration: string
  title: string
  tag: string
  videoUrl?: string
}

export interface PricingItem {
  barClass: 'acc-teal' | 'acc-blue' | 'acc-vibrant'
  iconType: string
  title: string
  description: string
  points: string[]
}

export interface ReviewItem {
  initials: string
  name: string
  date: string
  text: string
}

export interface ReviewSummary {
  score: string
  count: string
  googleUrl: string
}

export interface NavItem {
  label: string
  href: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface BlogPost {
  href: string
  gradStyle: string
  date: string
  title: string
  excerpt: string
}

export interface CTABand {
  heading: string
  subtext: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
  infoItems: string[]
}

export interface ServiceItem {
  title: string
  description: string
  slug: string
  gradient: string
}

export interface ServicesConfig {
  conditions: ServiceItem[]
  procedures: ServiceItem[]
}

export interface ProductPackage {
  name: string
  description: string
  slug: string
  gradient: string
  price: string
  includes: string[]
}

export interface ReviewItem {
  initials: string
  gradient: string
  name: string
  date: string
  text: string
}

export interface TestimonialsConfig {
  rating: string
  reviewCount: string
  googleUrl: string
  reviews: ReviewItem[]
}

export interface OptionalPages {
  gallery: boolean
  testimonials: boolean
}

export interface VideoStory {
  gradient: string
  duration: string
  tag: string
  tagType: 'procedure' | 'condition'
  category: string
  title: string
  description: string
}

export interface SuccessStoriesConfig {
  videoCount: string
  conditionCount: string
  rating: string
  stories: VideoStory[]
}

export interface AreaItem {
  name: string
  slug: string
  distance: string
  duration: string
  label: string
  href: string
}

export interface TeamMember {
  photo?: string
  name: string
  designation: string
  qualifications: string[]
  experience: string
  schedule: string
  gradient: string
  isLead?: boolean
}
