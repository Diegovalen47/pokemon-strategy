import { z } from 'zod'

interface EnvVars {
  VITE_BASE_ALEGRA_URL: string
  VITE_ALEGRA_EMAIL: string
  VITE_ALEGRA_API_TOKEN: string
  VITE_BASE_GOOGLE_CUSTOM_SEARCH_URL: string
  VITE_GOOGLE_CUSTOM_SEARCH_API_KEY: string
  VITE_GOOGLE_CUSTOM_SEARCH_ENGINE_ID: string
}

const envsSchema = z
  .object({
    VITE_BASE_ALEGRA_URL: z.coerce.string(),
    VITE_ALEGRA_EMAIL: z.coerce.string(),
    VITE_ALEGRA_API_TOKEN: z.coerce.string(),
    VITE_BASE_GOOGLE_CUSTOM_SEARCH_URL: z.coerce.string(),
    VITE_GOOGLE_CUSTOM_SEARCH_API_KEY: z.coerce.string(),
    VITE_GOOGLE_CUSTOM_SEARCH_ENGINE_ID: z.coerce.string()
  })
  .passthrough()

const envVars = envsSchema.parse({
  ...import.meta.env
})

export const envs: EnvVars = {
  ...envVars
}
