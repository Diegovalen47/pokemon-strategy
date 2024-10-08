import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/modules/shared/infrastructure/models/db/index.ts',
  out: './drizzle',
  dialect: 'sqlite'
})
