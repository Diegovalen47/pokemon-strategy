import { useQuery } from '@tanstack/vue-query'

import { usePokemonStore } from '@/app/stores/services'

export const usePokemonQuery = () => {
  const pokemonStore = usePokemonStore()

  const {
    isLoading: isLoadingPokemon,
    isError: isErrorPokemon,
    isSuccess: isSuccessPokemon,
    error: errorPokemon,
    refetch: getPokemon
  } = useQuery({
    queryKey: ['syncPokemon'],
    queryFn: async () => {
      const pokemonCacheCount = await pokemonStore.pokemonService.getPokemonLocalCount()

      if (pokemonCacheCount === 0) {
        await pokemonStore.pokemonService.getAllPokemonAndSaveInDb()
        console.log('Pokemon obtenidos y cacheados')
        return true
      }
      return false
    },
    enabled: false
  })

  return {
    isLoadingPokemon,
    isErrorPokemon,
    isSuccessPokemon,
    errorPokemon,
    getPokemon
  }
}
