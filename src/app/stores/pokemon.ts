import { useQuery } from '@tanstack/vue-query'
import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useGlobalStore } from './global'

import { PokemonService } from '@/modules/pokemon/application'
import {
  PokemonOrmRepository,
  PokemonPokeapiRespository
} from '@/modules/pokemon/infrastructure'
import { pokeApi } from '@/modules/shared/infrastructure'

export const usePokemonStore = defineStore('pokemon', () => {
  const globalStore = useGlobalStore()

  const pokemonServiceInstance = new PokemonService(
    new PokemonPokeapiRespository(pokeApi),
    new PokemonOrmRepository(globalStore.ormService as SqliteRemoteDatabase)
  )

  const pokemonService = ref(pokemonServiceInstance)

  const {
    isLoading,
    isError,
    error,
    refetch: checkIfPokemonDataIsCached
  } = useQuery({
    queryKey: ['syncPokemon'],
    queryFn: async () => {
      await syncPokemon()
      return true
    },
    enabled: false
  })

  const syncPokemon = async () => {
    const hasChanges = await pokemonService.value.hasToRefreshData()
    if (hasChanges || !globalStore.tablesAlreadyExists) {
      await pokemonService.value.getAllPokemonAndSaveInDb()
      console.log('Pokemon obtenidos y cacheados')
      return
    }
  }

  return {
    pokemonService,
    isLoading,
    isError,
    error,
    checkIfPokemonDataIsCached
  }
})
