import { MetadataRoute } from 'next'
import { loadConfig } from '@/lib/config'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const cfg  = await loadConfig()
  const site = cfg.site as any
  const base = (site?.url || '').replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/api/', '/_next/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
