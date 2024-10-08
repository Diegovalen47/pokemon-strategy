import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useDatabaseProviderStore } from '../../services/database'

import { PokemonService } from '@/modules/pokemon/application'
import { PokemonOrmRepository, PokemonPokeapiRepository } from '@/modules/pokemon/infrastructure'
import { pokeApi } from '@/modules/shared/infrastructure'

export const usePokemonProviderStore = defineStore('pokemon-provider', () => {
  const databaseStore = useDatabaseProviderStore()

  const pokemonServiceInstance = new PokemonService(
    new PokemonPokeapiRepository(pokeApi),
    new PokemonOrmRepository(databaseStore.ormService as SqliteRemoteDatabase)
  )

  const pokemonService = ref(pokemonServiceInstance)

  return {
    pokemonService
  }
})
