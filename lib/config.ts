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
const CONFIG_ID = process.env.NEXT_PUBLIC_CONFIG_ID
const SB_URL    = process.env.NEXT_PUBLIC_SUPABASE_URL
const SB_KEY    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const BUCKET    = 'website-assets'

// Module-level cache — resolved once per build/request cycle
// No module-level cache

async function fetchFromSupabase(): Promise<ClinicConfig> {
  if (!CONFIG_ID || !SB_URL || !SB_KEY) {
    console.log('[config] No CONFIG_ID — using default.json')
    return defaultConfig as unknown as ClinicConfig
  }

  try {
    // Fetch config JSONB by config ID
    const res = await fetch(
      `${SB_URL}/rest/v1/configs?select=data&id=eq.${encodeURIComponent(CONFIG_ID)}&limit=1`,
      {
        headers: {
          apikey:         SB_KEY,
          Authorization:  `Bearer ${SB_KEY}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    )

    if (!res.ok) {
      console.error(`[config] Supabase error ${res.status} for slug: ${SLUG}`)
      return defaultConfig as unknown as ClinicConfig
    }

    const rows = await res.json()
    if (!rows?.length) {
      console.error(`[config] No config found for id: ${CONFIG_ID}`)
      return defaultConfig as unknown as ClinicConfig
    }

    const configJson = rows[0]?.data
    if (!configJson || typeof configJson !== 'object') {
      console.error(`[config] config_json empty for id: ${CONFIG_ID}`)
      return defaultConfig as unknown as ClinicConfig
    }

    console.log(`[config] Loaded Supabase config for id: ${CONFIG_ID}`)
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
          { headers: { apikey: SB_KEY!, Authorization: `Bearer ${SB_KEY}` }, cache: 'no-cache' }
        )
        const wRows = await wRes.json()
        const uploadedPhotos: Record<string, string> = wRows?.[0]?.photos || {}
        transformed.photos = uploadedPhotos
        // Inject into clinic and doctor — spread to avoid frozen object mutation
        transformed.clinic = {
          ...transformed.clinic,
          logo:       uploadedPhotos['logo']       || '',
          heroImage:  uploadedPhotos['hero_image'] || '',
          aboutImage: uploadedPhotos['about']      || '',
        }
        transformed.doctor = {
          ...transformed.doctor,
          photo: uploadedPhotos['doctor_card'] || transformed.doctor.photo || '',
        }
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
  return fetchFromSupabase()
}

/**
 * Synchronous getter — returns cached config after initConfig() resolves.
 * Falls back to default.json if called before cache is warm.
 */
export function getConfig(): ClinicConfig {
  return defaultConfig as unknown as ClinicConfig
}

/** Async convenience: init + get in one call for Server Components. */
export async function loadConfig(): Promise<ClinicConfig> {
  return initConfig()
}
