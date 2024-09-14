import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ClientDbService } from '@/services/db'
import { ResourceAlreadyExists } from '@/services/errors/db'
import { useQuery } from '@tanstack/vue-query'
import { PokeApiService } from '@/services/poke_api'
import { OrmService } from '@/services/db/orm-service'

export const useStoregeStore = defineStore('storage', () => {
  const { isLoading, isError, error, refetch } = useQuery({
    queryKey: ['initializePokemonData'],
    queryFn: async () => {
      await initializePokemonData()
      return true
    },
    enabled: false
  })

  const clientDbService = ref<ClientDbService | null>(null)
  const pokeApiService = ref<PokeApiService | null>()
  const dbOrm = ref<OrmService | null>(null)

  const initializePokemonData = async (): Promise<void> => {
    clientDbService.value = new ClientDbService()
    await clientDbService.value?.connect()

    dbOrm.value = new OrmService(clientDbService.value.getOrm())
    pokeApiService.value = new PokeApiService(
      new OrmService(clientDbService.value.getOrm())
    )

    const response = await clientDbService.value.createTables()

    const tablesAlreadyExists: boolean =
      response instanceof ResourceAlreadyExists

    const pokemonHasChanged = await pokemonQuantityHasChanged()

    if (tablesAlreadyExists && !pokemonHasChanged) {
      console.log(
        'Base de datos local actualizada, no es necesario hacer cambios'
      )
      return
    }

    try {
      await pokeApiService.value.getAllPokemonAndSaveInDb()
    } catch (error) {
      console.error('Error al obtener y guardar los pokemon', error)
    }
  }

  const pokemonQuantityHasChanged = async () => {
    const pokemonCountRemote = await pokeApiService.value?.getPokemonCount()
    const pokemonCountLocal = await dbOrm.value?.getPokemonCount()
    console.log('pokemonCountRemote', pokemonCountRemote)
    console.log('pokemonCountLocal', pokemonCountLocal)

    if (pokemonCountRemote === pokemonCountLocal) {
      return false
    }

    return true
  }

  const initialize = () => refetch()

  const searchForPokemon = async (query: string) => {
    return await dbOrm.value?.searchPokemonByLikeName(query)
  }

  return { isLoading, isError, error, initialize, searchForPokemon }
})
