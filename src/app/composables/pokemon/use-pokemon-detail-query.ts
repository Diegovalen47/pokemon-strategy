import { useQuery } from '@tanstack/vue-query'

import { usePokemonStore } from '@/app/stores/services'

export const usePokemonDetailQuery = () => {
  const pokemonStore = usePokemonStore()

  const {
    isLoading: isLoadingPokemonDetail,
    isError: isErrorPokemonDetail,
    isSuccess: isSuccessPokemonDetail,
    error: errorPokemonDetail,
    refetch: getPokemonDetails
  } = useQuery({
    queryKey: ['syncPokemonDetails'],
    queryFn: async () => {
      const originTypesLocalCount = await pokemonStore.pokemonService.getOriginTypesLocalCount()
      const originAbilitiesLocalCount =
        await pokemonStore.pokemonService.getOriginAbilitiesLocalCount()

      if (originTypesLocalCount === 0 || originAbilitiesLocalCount === 0) {
        await pokemonStore.pokemonService.setPokemonExtraData()
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
