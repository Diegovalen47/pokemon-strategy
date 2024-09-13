import { z } from 'zod'

interface EnvVars {
  VITE_POKE_API_URL: string
}

const envsSchema = z
  .object({
    VITE_POKE_API_URL: z.coerce.string()
  })
  .passthrough()

const envVars = envsSchema.parse({
  ...import.meta.env
})

export const envs: EnvVars = {
  ...envVars
}
