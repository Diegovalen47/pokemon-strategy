import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/services/db/schema/index.ts',
  out: './drizzle',
  dialect: 'sqlite'
})
