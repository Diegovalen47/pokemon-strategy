import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'

import { PokemonOrmService } from '@/services/orm'

const usePokemon = (ormService: SqliteRemoteDatabase) => {
  const pokemonOrmService = new PokemonOrmService(ormService)

  return { pokemonOrmService }
}

export default usePokemon
