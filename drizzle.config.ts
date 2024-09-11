import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/services/db/schema/index.ts',
  out: './drizzle',
  dbCredentials: {
    url: 'pokemondb.sqlite3'
  },
  dialect: 'sqlite'
})
