import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { ref } from 'vue'

import type { Pokemon } from '@/models/db'
import { PokemonOrmService } from '@/services/orm'

const usePokemon = (ormService: SqliteRemoteDatabase) => {
  const pokemonOrmService = new PokemonOrmService(ormService)

  const pokemonList = ref<Pokemon[]>([])
  const query = ref('')

  const searchPokemon = async (name: string) => {
    query.value = name
    if (!name || name === '') {
      pokemonList.value = []
      return
    }

    const result = await pokemonOrmService.searchPokemonByLikeName(name)

    if (result instanceof Error) {
      pokemonList.value = []
      return
    }

    pokemonList.value = result
  }

  return { query, pokemonList, searchPokemon }
}

export default usePokemon
