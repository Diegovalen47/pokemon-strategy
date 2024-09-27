import { useQuery } from '@tanstack/vue-query'

import { usePokemonProviderStore } from '@/app/stores/modules/pokemon'

export const usePokemonQuery = () => {
  const pokemonProviderStore = usePokemonProviderStore()

  const {
    isLoading: isLoadingPokemon,
    isError: isErrorPokemon,
    isSuccess: isSuccessPokemon,
    error: errorPokemon,
    refetch: getPokemon
  } = useQuery({
    queryKey: ['syncPokemon'],
    queryFn: async () => {
      const pokemonCacheCount = await pokemonProviderStore.pokemonService.getPokemonLocalCount()

      if (pokemonCacheCount === 0) {
        await pokemonProviderStore.pokemonService.getAllPokemonAndSaveInDb()
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
