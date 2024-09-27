import { useQuery } from '@tanstack/vue-query'

import { usePokemonProviderStore } from '@/app/stores/modules/pokemon'

export const usePokemonDetailQuery = () => {
  const pokemonProviderStore = usePokemonProviderStore()

  const {
    isLoading: isLoadingPokemonDetail,
    isError: isErrorPokemonDetail,
    isSuccess: isSuccessPokemonDetail,
    error: errorPokemonDetail,
    refetch: getPokemonDetails
  } = useQuery({
    queryKey: ['syncPokemonDetails'],
    queryFn: async () => {
      const originTypesLocalCount =
        await pokemonProviderStore.pokemonService.getOriginTypesLocalCount()
      const originAbilitiesLocalCount =
        await pokemonProviderStore.pokemonService.getOriginAbilitiesLocalCount()

      if (originTypesLocalCount === 0 || originAbilitiesLocalCount === 0) {
        await pokemonProviderStore.pokemonService.setPokemonExtraData()
        console.log('Datos extra de pokemon actualizados')
        return true
      }
      return false
    },
    enabled: false
  })

  return {
    isLoadingPokemonDetail,
    isErrorPokemonDetail,
    isSuccessPokemonDetail,
    errorPokemonDetail,
    getPokemonDetails
  }
}
