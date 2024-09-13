import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ClientDbService } from '@/services/db'
import { ResourceAlreadyExists } from '@/services/errors/db'
import { useQuery } from '@tanstack/vue-query'
import { PokeApiService } from '@/services/poke_api'
import { OrmService } from '@/services/db/orm-service'

export const useStoregeStore = defineStore('storage', () => {
  const clientDbService = ref<ClientDbService>(new ClientDbService())
  const pokeApiService = ref<PokeApiService>(new PokeApiService())
  const dbOrm = ref<OrmService | null>(null)

  const { isLoading, isError, error, refetch } = useQuery({
    queryKey: ['initializePokemonData'],
    queryFn: async () => {
      await initializePokemonData()
      return true
    },
    enabled: false
  })

  const initializePokemonData = async (): Promise<void> => {
    await clientDbService.value.connect()
    dbOrm.value = new OrmService(clientDbService.value.getOrm())

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

    const pokemonRemoteData = await lookForPokemonRemoteData()
    insertPokemonDataInDb(pokemonRemoteData)
  }

  const pokemonQuantityHasChanged = async () => {
    const pokemonCountRemote = await pokeApiService.value.getPokemonCount()
    const pokemonCountLocal = await dbOrm.value?.getPokemonCount()
    console.log('pokemonCountRemote', pokemonCountRemote)
    console.log('pokemonCountLocal', pokemonCountLocal)

    if (pokemonCountRemote === pokemonCountLocal) {
      return false
    }

    return true
  }

  const lookForPokemonRemoteData = async () => {
    const pokemons = await pokeApiService.value.getAllPokemon()
    return pokemons
  }

  const insertPokemonDataInDb = (pokemonRemoteData: any) => {
    console.log(pokemonRemoteData)
  }

  const initialize = () => refetch()

  return { isLoading, isError, error, initialize }
})
