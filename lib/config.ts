/**
 * lib/config.ts
 *
 * HOW IT WORKS
 * ─────────────
 * At build time, Next.js runs this module once per deployment.
 * If NEXT_PUBLIC_CLINIC_SLUG is set, it fetches the clinic's config JSONB
 * from Supabase (configs table), transforms it into ClinicConfig, and caches it.
 * If not set (local dev / template preview), it falls back to data/default.json.
 *
 * All pages call getConfig() synchronously after awaiting initConfig() in layout.
 *
 * ENV VARS REQUIRED (set in Vercel per deployment):
 *   NEXT_PUBLIC_CLINIC_SLUG       e.g. "dr-arjun-neuro-care"
 *   NEXT_PUBLIC_SUPABASE_URL      e.g. "https://xyz.supabase.co"
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY e.g. "eyJ..."
 */

import type { ClinicConfig } from './types'
import { transformConfig }   from './transform'
import defaultConfig         from '../data/default.json'

const SLUG      = process.env.NEXT_PUBLIC_CLINIC_SLUG
const SB_URL    = process.env.NEXT_PUBLIC_SUPABASE_URL
const SB_KEY    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const BUCKET    = 'website-assets'

// Module-level cache — resolved once per build/request cycle
let _config: ClinicConfig | null = null
let _fetchPromise: Promise<ClinicConfig> | null = null

async function fetchFromSupabase(): Promise<ClinicConfig> {
  if (!SLUG || !SB_URL || !SB_KEY) {
    console.log('[config] No CLINIC_SLUG — using default.json')
    return defaultConfig as unknown as ClinicConfig
  }

  try {
    // Fetch config_json for this clinic slug via Supabase REST API
    // configs table has a FK to clients; we filter by clients.slug
    const res = await fetch(
      `${SB_URL}/rest/v1/configs?select=data&slug=eq.${encodeURIComponent(SLUG)}&limit=1`,
      {
        headers: {
          apikey:         SB_KEY,
          Authorization:  `Bearer ${SB_KEY}`,
          'Content-Type': 'application/json',
        },
        cache: 'force-cache', // fresh on every build
      }
    )

    if (!res.ok) {
      console.error(`[config] Supabase error ${res.status} for slug: ${SLUG}`)
      return defaultConfig as unknown as ClinicConfig
    }

    const rows = await res.json()
    if (!rows?.length) {
      console.error(`[config] No config found for slug: ${SLUG}`)
      return defaultConfig as unknown as ClinicConfig
    }

    const configJson = rows[0]?.data
    if (!configJson || typeof configJson !== 'object') {
      console.error(`[config] config_json empty for slug: ${SLUG}`)
      return defaultConfig as unknown as ClinicConfig
    }

    console.log(`[config] Loaded Supabase config for: ${SLUG}`)
    const transformed = transformConfig(configJson)

    // Inject photo URLs from Supabase Storage
    if (CLIENT_ID && SB_URL) {
      const base = `${SB_URL}/storage/v1/object/public/${BUCKET}/${CLIENT_ID}`
      const photoKeys = [
        'logo', 'hero_image', 'doctor_card', 'about',
        ...Array.from({ length: 10 }, (_, i) => `team_member_${i + 1}`),
        ...Array.from({ length: 6 }, (_, i) => `clinic_${i + 1}`),
        ...Array.from({ length: 6 }, (_, i) => `equipment_${i + 1}`),
        ...Array.from({ length: 4 }, (_, i) => `doctor_${i + 1}`),
        ...Array.from({ length: 4 }, (_, i) => `awards_${i + 1}`),
        ...Array.from({ length: 4 }, (_, i) => `conference_${i + 1}`),
        ...Array.from({ length: 4 }, (_, i) => `result_${i + 1}`),
      ]
      // Fetch websites row to get uploaded photo URLs
      try {
        const wRes = await fetch(
          `${SB_URL}/rest/v1/websites?select=photos&client_id=eq.${CLIENT_ID}&limit=1`,
          { headers: { apikey: SB_KEY!, Authorization: `Bearer ${SB_KEY}` }, cache: 'force-cache' }
        )
        const wRows = await wRes.json()
        console.log('[photos] wRes status:', wRes.status, 'CLIENT_ID:', CLIENT_ID)
        console.log('[photos] wRows:', JSON.stringify(wRows).slice(0, 200))
        const uploadedPhotos: Record<string, string> = wRows?.[0]?.photos || {}
        transformed.photos = uploadedPhotos
        // Inject into clinic and doctor
        console.log('[photos] uploadedPhotos keys:', Object.keys(uploadedPhotos))
        console.log('[photos] logo URL:', uploadedPhotos['logo'])
        transformed.clinic.logo       = uploadedPhotos['logo']       || ''
        transformed.clinic.heroImage  = uploadedPhotos['hero_image'] || ''
        transformed.clinic.aboutImage = uploadedPhotos['about']      || ''
        transformed.doctor.photo      = uploadedPhotos['doctor_card'] || transformed.doctor.photo || ''
        // Inject photos into conditions
        transformed.conditions = transformed.conditions.map((c: any) => ({
          ...c,
          image: uploadedPhotos[`condition_${c.href.split('/').pop()}`] || '',
        }))
        // Inject photos into procedures
        transformed.procedures = transformed.procedures.map((p: any) => ({
          ...p,
          image: uploadedPhotos[`procedure_${p.href.split('/').pop()}`] || '',
        }))
        // Inject photos into team
        transformed.team = transformed.team.map((m: any) => ({
          ...m,
          photo: uploadedPhotos[`team_member_${m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`] || '',
        }))
      } catch (e) {
        console.error('[config] Failed to fetch photos:', e)
        transformed.photos = {}
      }
    } else {
      transformed.photos = {}
    }

    return transformed

  } catch (err) {
    console.error('[config] Fetch error:', err)
    return defaultConfig as unknown as ClinicConfig
  }
}

/** Initialise config once. Safe to call multiple times. */
export async function initConfig(): Promise<ClinicConfig> {
  if (_config) return _config
  if (!_fetchPromise) {
    _fetchPromise = fetchFromSupabase().then(cfg => {
      _config = cfg
      return cfg
    })
  }
  return _fetchPromise
}

/**
 * Synchronous getter — returns cached config after initConfig() resolves.
 * Falls back to default.json if called before cache is warm.
 */
export function getConfig(): ClinicConfig {
  return _config ?? (defaultConfig as unknown as ClinicConfig)
}

/** Async convenience: init + get in one call for Server Components. */
export async function loadConfig(): Promise<ClinicConfig> {
  return initConfig()
}
// cache bust Sat Mar 14 16:16:11 IST 2026
