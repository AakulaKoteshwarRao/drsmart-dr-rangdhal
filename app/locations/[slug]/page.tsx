import Header from '@/components/Header'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generatePageSchemas } from '@/lib/schema/index.js'
import { schemaConfig } from '@/lib/schema/master.config.js'
import StickyBar from '@/components/StickyBar'
import { getConfig } from '@/lib/config'
import Footer from '@/components/Footer'
import '../../styles/location-spoke.css'

export default function LocationSpokePage({ params }: { params?: { slug?: string } }) {
  const _path = `/locations/${params?.slug || ''}`
  const pageSchemas = generatePageSchemas(schemaConfig, {
    pageType: 'location',
    pageData: { slug: params?.slug },
    meta: {
      path:        _path,
      name:        `${schemaConfig.clinic.specialty} in ${params?.slug?.replace(/-/g,' ')?.replace(/\b\w/g,c=>c.toUpperCase()) || 'Location'} | ${schemaConfig.clinic.name}`,
      description: schemaConfig.clinic.description,
      image:       schemaConfig.clinic.image,
      breadcrumb:  [
        { name: 'Home', url: schemaConfig.site.url, path: '/' },
        { name: 'Locations', url: schemaConfig.site.url + '/locations', path: '/locations' },
        { name: params?.slug || '', url: schemaConfig.site.url + _path, path: _path },
      ],
    },
  })

  const cfg = getConfig()
  return (
    <>
      <SchemaMarkup graphs={[pageSchemas]} />
      <Header clinic={cfg.clinic} />
      <main
        style={{paddingBottom: '64px'}}
        dangerouslySetInnerHTML={{__html: `<header class="header">
  <div class="header-inner">
    <a href="/" class="logo"><div style="width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg,var(--secondary,#1E3A8A),var(--primary,#F97316));display:flex;align-items:center;justify-content:center;margin-right:0.6rem;flex-shrink:0"><svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" style="width:24px;height:24px"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div><span style="font-weight:700;font-size:0.9rem;color:var(--secondary,#1E3A8A);line-height:1.2">Logo<br/><span style="font-weight:400;font-size:0.72rem;color:#9CA3AF">Placeholder</span></span></a>
    <nav class="nav">
      <a href="/">Home</a><a href="/about">About</a><a href="/doctor">Doctor</a><a href="/services">Services</a><a href="/products">Products</a><a href="/testimonials">Testimonials</a><a href="/locations" class="active">Locations</a><a href="/blog">Blog</a>
    </nav>
  </div>
</header>

<nav class="breadcrumb">
  <a href="/">Home</a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
  <a href="/locations">Locations</a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
  <span>{config.clinic.area}</span>
</nav>

<!-- ============================================================
     S1: H1 -- semantic variation
     ============================================================ -->
<section class="spoke-hero">
  <div class="sec-label"><span>Location</span></div>
  <h1>{config.entity?.medicalSpecialty || config.doctor?.experience?.[0]?.role || 'Specialist'} Near <em>{config.clinic.area}</em></h1>
  <p class="spoke-hero-desc">Looking for a trusted specialist near {config.clinic.area}? {config.doctor.name} is available for consultations -- contact us for directions and timing.</p>
  <a href="/appointment" class="spoke-hero-cta">Book Appointment <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
</section>

<!-- ============================================================
     S2: OPENING PARAGRAPH (merged into hero above)
     S3: QUICK FACTS + S4: DIRECTIONS
     ============================================================ -->
<div class="sec-grey">
  <div class="sec-pad">
    <div class="sec-header" style="text-align:center;">
      <div class="sec-label" style="justify-content:center;"><span>Quick Info</span></div>
      <h2 class="sec-title">Getting here from {config.clinic.area}.</h2>
    </div>
    <div class="qf-strip">
      <div class="qf-card">
        <div class="qf-icon" style="background:linear-gradient(135deg,var(--primary),var(--primary-dark));"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
        <h3>Location</h3>
        <div class="qf-val">{config.clinic.name}</div>
      </div>
      <div class="qf-card">
        <div class="qf-icon" style="background:linear-gradient(135deg,var(--secondary),var(--secondary-dark));"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
        <h3>Travel Time</h3>
        <div class="qf-val">5-10 min</div>
      </div>
      <div class="qf-card">
        <div class="qf-icon" style="background:linear-gradient(135deg,var(--secondary-dark),var(--secondary-deep));"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>
        <h3>Distance</h3>
        <div class="qf-val">2-3 km</div>
      </div>
      <div class="qf-card">
        <div class="qf-icon" style="background:linear-gradient(135deg,var(--accent),var(--accent-dark));"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg></div>
        <h3>Parking</h3>
        <div class="qf-val">Available</div>
      </div>
    </div>
    <div class="directions-wrap">
      <a href="{config.clinic.mapsUrl}" target="_blank" class="directions-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        Get Directions on Google Maps
      </a>
    </div>
  </div>
</div>

<!-- ============================================================
     S5: SERVICES FOR AREA PATIENTS
     ============================================================ -->
<div class="sec-white">
  <div class="sec-pad">
    <div class="sec-header" style="text-align:center;">
      <div class="sec-label" style="justify-content:center;"><span>Services</span></div>
      <h2 class="sec-title">Services for {config.clinic.area} patients.</h2>
      <p class="sec-sub" style="margin:0 auto;">The most relevant services for patients from this area.</p>
    </div>
    <div class="spoke-services">
      {config.services?.slice(0,3).map((s,i) => (
        <a href={`/services/${s.slug}`} class="spoke-svc-card">
          <div class="spoke-svc-icon" style={`background:${['linear-gradient(135deg,var(--primary),var(--primary-dark))','linear-gradient(135deg,var(--secondary),var(--secondary-dark))','linear-gradient(135deg,var(--secondary-dark),var(--secondary-deep))'][i]};`}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
          <h3>{s.name}</h3>
          <p>{s.description}</p>
          <span class="spoke-svc-link">Learn more <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>
        </a>
      ))}
    </div>
  </div>
</div>

<!-- ============================================================
     S6: WHY PATIENTS FROM [AREA] VISIT -- unique reasons
     ============================================================ -->
<div class="sec-teal">
  <div class="sec-pad">
    <div class="sec-header" style="text-align:center;">
      <div class="sec-label" style="justify-content:center;"><span>Why Us</span></div>
      <h2 class="sec-title">Why patients from {config.clinic.area} choose us.</h2>
    </div>
    <div class="reasons-list">
      <div class="reason-row"><div class="reason-icon" style="background:linear-gradient(135deg,var(--primary),var(--primary-dark));"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div><span>Located at {config.clinic.address} -- just minutes from {config.clinic.area}</span></div>
      <div class="reason-row"><div class="reason-icon" style="background:linear-gradient(135deg,var(--secondary),var(--secondary-dark));"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><span>5-10 minute drive from most parts of {config.clinic.area} -- convenient for follow-up visits</span></div>
      <div class="reason-row"><div class="reason-icon" style="background:linear-gradient(135deg,var(--secondary-dark),var(--secondary-deep));"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div><span>{config.doctor.name} has extensive experience serving patients from {config.clinic.area} and surrounding areas</span></div>
      <div class="reason-row"><div class="reason-icon" style="background:linear-gradient(135deg,var(--accent),var(--accent-dark));"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><span>Modern diagnostic equipment -- complete workup available in a single visit</span></div>
      <div class="reason-row"><div class="reason-icon" style="background:linear-gradient(135deg,var(--primary),var(--primary-dark));"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div><span>Hundreds of successful outcomes for patients from {config.clinic.area} and neighbouring localities</span></div>
    </div>
  </div>
</div>

<!-- ============================================================
     S7: ABOUT THE DOCTOR -- mini card with link
     ============================================================ -->
<div class="sec-white">
  <div class="sec-pad">
    <div class="sec-header" style="text-align:center;">
      <div class="sec-label" style="justify-content:center;"><span>Your Doctor</span></div>
      <h2 class="sec-title">Meet your specialist.</h2>
    </div>
    <div class="doc-mini">
      <div class="doc-mini-photo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
      <div class="doc-mini-info">
        <h3>{config.doctor.name}</h3>
        <div class="doc-spec">{config.doctor.degrees}</div>
        <p>With over {config.doctor.stats?.[0]?.number || '15'}+ years of experience, {config.doctor.name} consults at {config.clinic.address}.</p>
        <a href="/doctor" class="doc-mini-link">View full profile <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
      </div>
    </div>
  </div>
</div>

<!-- ============================================================
     S8: NEARBY AREAS -- adjacent spoke links
     ============================================================ -->
<div class="sec-grey">
  <div class="sec-pad">
    <div class="sec-header" style="text-align:center;">
      <div class="sec-label" style="justify-content:center;"><span>Nearby</span></div>
      <h2 class="sec-title">Also serving nearby areas.</h2>
      <p class="sec-sub" style="margin:0 auto;">We see patients from across {config.clinic.city}. Here are some nearby areas we serve.</p>
    </div>
    <div class="nearby-pills">
      {config.locations?.map(l => (
        <a href={`/locations/${l.slug}`} class="nearby-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> {l.area}</a>
      ))}
    </div>
  </div>
</div>

<!-- ============================================================
     S9: FAQ -- area-specific unique questions
     ============================================================ -->
<div class="sec-white">
  <div class="sec-pad">
    <div class="sec-header" style="text-align:center;">
      <div class="sec-label" style="justify-content:center;"><span>FAQ</span></div>
      <h2 class="sec-title">Questions from {config.clinic.area} patients.</h2>
    </div>
    <div class="faq-list">
      <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q"><span>How far is {config.clinic.name} from {config.clinic.area}?</span><div class="faq-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div></div><div class="faq-a"><p>{config.clinic.name} is located right on {config.clinic.area}, {config.clinic.area} itself -- just 2-3 km from most parts of the area. Travel time is typically 5-10 minutes by car.</p></div></div>
      <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q"><span>Is parking available at the hospital?</span><div class="faq-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div></div><div class="faq-a"><p>Bike and car parking available on Street No. 1 outside {config.clinic.hospital}.</p></div></div>
      <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q"><span>What services are available for {config.clinic.area} residents?</span><div class="faq-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div></div><div class="faq-a"><p>We offer {config.services?.slice(0,3).map(s=>s.name).join(', ')} and more. All consultations are performed at {config.clinic.address}.</p></div></div>
      <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q"><span>Can I book an appointment online from {config.clinic.area}?</span><div class="faq-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div></div><div class="faq-a"><p>Yes. You can book online through our <a href="/appointment" style="color:var(--secondary);font-weight:600;">appointment page</a> or message us directly on <a href="https://wa.me/{config.clinic.whatsapp}" style="color:var(--secondary);font-weight:600;">WhatsApp</a>. Same-day appointments are often available.</p></div></div>
    </div>
  </div>
</div>

<!-- ============================================================
     S10: INTERNAL LINKS -- hub link, spoke links, service links
     ============================================================ -->
<div class="sec-teal">
  <div class="sec-pad">
    <div class="sec-header" style="text-align:center;">
      <div class="sec-label" style="justify-content:center;"><span>Explore</span></div>
      <h2 class="sec-title">Learn more about our services.</h2>
    </div>
    <div class="int-links">
      <a href="/locations" class="int-link">← All Locations</a>
      <a href="/doctor" class="int-link">Doctor Profile</a>
      <a href="/services" class="int-link">All Services</a>
      {config.services?.slice(0,4).map(s => (
        <a href={`/services/${s.slug}`} class="int-link">{s.name}</a>
      ))}
      <a href="/products" class="int-link">Packages</a>
      <a href="/appointment" class="int-link">Book Appointment</a>
      {config.locations?.map(l => (
        <a href={`/locations/${l.slug}`} class="int-link">{l.area}</a>
      ))}
      <a href="/blog" class="int-link">Blog</a>
    </div>
  </div>
</div>

<!-- CTA BAND -->
<section class="cta-band">
  <div class="cta-band-inner">
    <div class="cta-band-content">
      <h2>Need a specialist? Don't wait.</h2>
      <p>Book a consultation near {config.clinic.area}. Expert diagnosis, honest advice, and a clear treatment plan -- all in your first visit.</p>
    </div>
    <div class="cta-band-actions">
      <a href="/appointment" class="cta-primary">Book Appointment <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
      <a href="https://wa.me/{config.clinic.whatsapp}" class="cta-secondary">WhatsApp Us <svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg></a>
    </div>
    <div class="cta-band-info">
      <span>📍 {config.clinic.address} {config.clinic.area}, {config.clinic.city}</span>
      <span>🕐 {config.clinic.hours || "Mon-Sat: 9:00 AM - 8:00 PM"}</span>
    </div>
  </div>
</section>

<!-- STICKY BAR -->`}}
      />
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}
