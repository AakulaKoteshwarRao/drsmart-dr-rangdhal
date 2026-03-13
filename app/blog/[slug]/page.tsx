import Header from '@/components/Header'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generatePageSchemas } from '@/lib/schema/index.js'
import { schemaConfig } from '@/lib/schema/master.config.js'
import StickyBar from '@/components/StickyBar'
import { getConfig } from '@/lib/config'
import Footer from '@/components/Footer'
import '../../styles/blog-post.css'

export default function BlogPostPage({ params }: { params?: { slug?: string } }) {
  const _path = `/blog/${params?.slug || ''}`
  const pageSchemas = generatePageSchemas(schemaConfig, {
    pageType: 'blog',
    pageData: { slug: params?.slug },
    meta: {
      path:        _path,
      name:        `${params?.slug?.replace(/-/g,' ')?.replace(/\b\w/g,c=>c.toUpperCase()) || 'Blog Post'} | ${schemaConfig.clinic.name}`,
      description: schemaConfig.clinic.description,
      image:       schemaConfig.clinic.image,
      breadcrumb:  [
        { name: 'Home', url: schemaConfig.site.url, path: '/' },
        { name: 'Blogs', url: schemaConfig.site.url + '/blogs', path: '/blogs' },
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
        dangerouslySetInnerHTML={{__html: `<article class="article-wrap">

  <!-- SECTION 1: POST HEADER -->
  <nav class="post-breadcrumb">
    <a href="/">Home</a>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
    <a href="/blog">Blog</a>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
    <span>Conditions</span>
  </nav>

  <span class="post-tag tag-conditions">Conditions</span>
  <h1 class="post-title">Understanding Knee Arthritis: When to See a Doctor</h1>

  <div class="post-meta">
    <div class="post-meta-avatar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
    <div class="post-meta-info">
      <span class="post-meta-author">{config.doctor.name}</span>
      <span class="post-meta-date">February 15, 2026</span>
    </div>
    <span class="dot"></span>
    <span class="post-meta-read">6 min read</span>
  </div>

  <!-- SECTION 2: FEATURED IMAGE -->
  <div class="post-featured" style="background:linear-gradient(145deg,#0F2259,#1E3A8A,#F97316);">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
  </div>

  <!-- SECTION 3: POST CONTENT -->
  <div class="post-content">
    <p>Knee arthritis is one of the most common conditions, affecting millions of people over the age of 50. But it's also one of the most misunderstood -- many patients either ignore early symptoms or assume surgery is the only option. The truth is somewhere in between.</p>

    <h2>What is knee arthritis?</h2>
    <p>Knee arthritis is a degenerative condition where the cartilage that cushions the joint gradually wears down. As the protective layer thins, bones begin to rub against each other, causing pain, stiffness, and reduced mobility. The most common form is osteoarthritis, which develops over time due to age, wear and tear, or previous injuries.</p>

    <h2>Early warning signs</h2>
    <p>Recognising the early signs can make a significant difference in treatment outcomes. Pay attention to:</p>
    <ul>
      <li>Stiffness in the morning that lasts more than 15-20 minutes</li>
      <li>Pain that worsens after prolonged sitting or climbing stairs</li>
      <li>Swelling around the knee joint, especially after activity</li>
      <li>A grinding or crunching sensation during movement</li>
      <li>Gradual decrease in range of motion</li>
    </ul>

    <blockquote>
      <p>Most patients wait too long to seek help. By the time they come in, the damage is often advanced. Early consultation opens up more treatment options -- and better outcomes.</p>
    </blockquote>

    <h2>When does knee arthritis need surgery?</h2>
    <p>Not every case of knee arthritis requires surgery. In fact, many patients respond well to conservative treatments -- especially when the condition is caught early.</p>

    <h3>Conservative treatments that work</h3>
    <p>For early to moderate arthritis, the following approaches are often effective:</p>
    <ul>
      <li>Physiotherapy and targeted exercises to strengthen muscles around the joint</li>
      <li>Weight management to reduce load on the knee</li>
      <li>Anti-inflammatory medications prescribed by your doctor</li>
      <li><a href="/services/prp-therapy">PRP therapy</a> for cartilage support and pain relief</li>
      <li>Joint injections for temporary symptom relief</li>
    </ul>

    <h3>When surgery becomes the right option</h3>
    <p>Surgery -- typically <a href="/services/knee-replacement">total knee replacement</a> -- is recommended when:</p>
    <ul>
      <li>Pain significantly affects daily life and sleep</li>
      <li>Conservative treatments no longer provide adequate relief</li>
      <li>X-rays show severe cartilage loss (bone-on-bone contact)</li>
      <li>The knee has become deformed or unstable</li>
    </ul>

    <a href="/services" class="post-link-card">
      <div class="post-link-icon" style="background:linear-gradient(135deg,#F97316,#1E3A8A);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
      <div class="post-link-text">
        <h4>View All Treatment Options</h4>
        <span>See our full range of specialist services &rarr;</span>
      </div>
    </a>

    <h2>The importance of early consultation</h2>
    <p>The single most important takeaway is this: early consultation gives you more options. Whether it's physiotherapy, PRP, or a carefully planned surgery -- the sooner you have an accurate diagnosis, the better your outcome will be.</p>
    <p>If you're experiencing any of the symptoms mentioned above, don't wait for the pain to become unbearable. A 20-minute consultation can give you clarity about your condition and a clear path forward.</p>
  </div>

  <!-- SECTION 4: AUTHOR SECTION -->
  <div class="author-section">
    <div class="author-avatar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
    <div class="author-info">
      <h3>{config.doctor.name}</h3>
      <div class="author-role">{config.doctor.experience?.[0]?.role || config.entity?.medicalSpecialty || 'Senior Consultant'}</div>
      <p>{config.doctor.degrees}. {config.doctor.stats?.[0]?.number || '15'}+ years of experience specialising in {(config.doctor.specialties || []).slice(0,3).join(', ') || config.entity?.medicalSpecialty || 'specialist care'}.</p>
      <a href="/doctor" class="author-link">View Full Profile <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
    </div>
  </div>

  <!-- SECTION 5: RELATED POSTS -->
  <div class="related-section">
    <div class="sec-header">
      <div class="sec-label"><span>Related Articles</span></div>
      <h2 class="sec-title" style="font-size:1.35rem;">You might also find these helpful.</h2>
    </div>
    <div class="related-grid">
      <a href="/blog/total-knee-replacement-guide" class="related-card">
        <div class="related-thumb" style="background:linear-gradient(145deg,#1E3A8A,#0F2259);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>
        <div class="related-body">
          <span class="related-tag tag-procedures">Procedures</span>
          <h4>Complete Guide to Total Knee Replacement</h4>
        </div>
      </a>
      <a href="/blog/prp-therapy-explained" class="related-card">
        <div class="related-thumb" style="background:linear-gradient(145deg,#922B21,#C0392B);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>
        <div class="related-body">
          <span class="related-tag tag-procedures">Procedures</span>
          <h4>PRP Therapy: Is It Right for You?</h4>
        </div>
      </a>
      <a href="/blog/first-visit-guide" class="related-card">
        <div class="related-thumb" style="background:linear-gradient(145deg,#6C3483,#5B2C6F);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>
        <div class="related-body">
          <span class="related-tag tag-guides">Patient Guide</span>
          <h4>Your First Consultation: What to Bring</h4>
        </div>
      </a>
    </div>
  </div>

  <!-- SECTION 6: FAQ -->
  <div class="faq-section">
    <div class="sec-header">
      <div class="sec-label"><span>FAQ</span></div>
      <h2 class="sec-title" style="font-size:1.35rem;">About knee arthritis.</h2>
    </div>
    <div class="faq-list">
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-q"><span>Can knee arthritis be cured completely?</span><div class="faq-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div></div>
        <div class="faq-a"><p>Osteoarthritis cannot be reversed, but it can be effectively managed. Early-stage arthritis responds well to conservative treatment. Advanced cases may require joint replacement, which has excellent long-term outcomes.</p></div>
      </div>
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-q"><span>At what age does knee arthritis usually start?</span><div class="faq-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div></div>
        <div class="faq-a"><p>While it's most common after age 50, knee arthritis can develop earlier -- especially in people with previous injuries, obesity, or a family history. Symptoms at any age warrant a consultation.</p></div>
      </div>
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-q"><span>Is walking good or bad for knee arthritis?</span><div class="faq-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div></div>
        <div class="faq-a"><p>Gentle walking is generally beneficial as it keeps the joint mobile and strengthens surrounding muscles. However, if walking causes significant pain, consult your doctor before continuing.</p></div>
      </div>
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-q"><span>How do I know if I need knee replacement?</span><div class="faq-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div></div>
        <div class="faq-a"><p>Knee replacement is considered when pain significantly affects your daily life, conservative treatments are no longer effective, and X-rays confirm severe joint damage. Your doctor will help you make this decision based on a thorough evaluation.</p></div>
      </div>
    </div>
  </div>

</article>

<!-- SECTION 7: CTA BAND -->
<section class="cta-band">
  <div class="cta-band-inner">
    <div class="cta-band-content">
      <h2>Concerned about your knee pain?</h2>
      <p>Don't let uncertainty hold you back. A single consultation can give you the clarity you need to move forward with confidence.</p>
    </div>
    <div class="cta-band-actions">
      <a href="/appointment" class="cta-primary">Book Appointment <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
      <a href="https://wa.me/{config.clinic.whatsapp}" class="cta-secondary">WhatsApp Us <svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg></a>
    </div>
    <div class="cta-band-info">
      <span> {config.clinic.hospital}, {config.clinic.city}</span>
      <span> Mon-Sat: 6:00 PM - 9:00 PM</span>
    </div>
  </div>
</section>

<!-- STICKY ACTION BAR -->`}}
      />
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}
