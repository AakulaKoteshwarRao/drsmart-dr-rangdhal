import Header from '@/components/Header'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generatePageSchemas } from '@/lib/schema/index.js'
import { buildSchemaConfig } from '@/lib/schema/master.config.js'
import StickyBar from '@/components/StickyBar'
import CTABand from '@/components/home/CTABand'
import Footer from '@/components/Footer'
import BlogHero from '@/components/blog/BlogHero'
import FeaturedPost from '@/components/blog/FeaturedPost'
import BlogGrid from '@/components/blog/BlogGrid'
import { loadConfig } from '@/lib/config'
import { getBlogs } from '@/lib/blogs'
import '../styles/blog.css'

export default async function BlogPage() {
  const cfg = await loadConfig()
  const sc = buildSchemaConfig(cfg)
  const blogs = await getBlogs()

  const pageSchemas = generatePageSchemas(sc, {
    pageType: 'home',
    meta: {
      path:        '/blog',
      name:        `Blog | ${sc.clinic.name}`,
      description: sc.clinic.description,
      image:       sc.clinic.image,
      breadcrumb:  [
        { name: 'Home', url: sc.site.url, path: '/' },
        { name: 'Blog', url: sc.site.url + '/blog', path: '/blog' },
      ],
    },
  })

  const featured = blogs[0] || null
  const rest     = blogs.slice(1)

  return (
    <>
      <SchemaMarkup graphs={[pageSchemas]} />
      <Header clinic={cfg.clinic} />
      <main style={{ paddingBottom: '64px' }}>
        <BlogHero />
        <FeaturedPost post={featured} />
        <BlogGrid posts={rest} conditions={cfg.conditions} />
        <CTABand cta={cfg.ctaBand} />
        <Footer clinic={cfg.clinic} config={cfg} />
      </main>
      <StickyBar clinic={cfg.clinic} />
    </>
  )
}
