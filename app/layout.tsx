import type { Metadata } from 'next'
import './globals.css'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generateCoreSchemas } from '@/lib/schema/index.js'
import { schemaConfig } from '@/lib/schema/master.config.js'
import defaultData from '../data/default.json'

const brand = (defaultData as any).brand || {}

// Validate hex -- fallback to defaults if placeholder or malformed
const isHex = (v: any) => typeof v === 'string' && /^#[0-9A-Fa-f]{6}$/.test(v)
const primaryColor   = isHex(brand.primaryColor)   ? brand.primaryColor   : '#F97316'
const secondaryColor = isHex(brand.secondaryColor) ? brand.secondaryColor : '#1E3A8A'

// Derive dark/deep/light shades from brand colors
// These are injected as CSS variables so every page respects the client's brand
function darken(hex: string, amount = 0.15): string {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.max(0, ((n >> 16) & 0xff) - Math.round(255 * amount))
  const g = Math.max(0, ((n >> 8)  & 0xff) - Math.round(255 * amount))
  const b = Math.max(0, ((n)       & 0xff) - Math.round(255 * amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}
function lighten(hex: string, opacity = 0.08): string {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 0xff
  const g = (n >> 8)  & 0xff
  const b = (n)       & 0xff
  return `rgba(${r},${g},${b},${opacity})`
}

const cssVars = {
  '--primary':         primaryColor,
  '--primary-dark':    darken(primaryColor, 0.12),
  '--primary-light':   lighten(primaryColor, 0.08),
  '--primary-pale':    lighten(primaryColor, 0.15),
  '--secondary':       secondaryColor,
  '--secondary-dark':  darken(secondaryColor, 0.12),
  '--secondary-deep':  darken(secondaryColor, 0.25),
  '--secondary-light': lighten(secondaryColor, 0.08),
} as React.CSSProperties

export const metadata: Metadata = {
  title: defaultData.clinic?.name || 'Clinic',
  description: defaultData.clinic?.tagline || 'Healthcare services',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const coreSchemas = generateCoreSchemas(schemaConfig)

  return (
    <html lang="en">
      <head>
        <SchemaMarkup graphs={[coreSchemas]} />
      </head>
      <body style={cssVars}>{children}</body>
    </html>
  )
}
