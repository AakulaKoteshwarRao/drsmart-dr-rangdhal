import type { ClinicConfig } from './types'
import defaultConfig from '../data/default.json'

export function getConfig(): ClinicConfig {
  return defaultConfig as unknown as ClinicConfig
}
