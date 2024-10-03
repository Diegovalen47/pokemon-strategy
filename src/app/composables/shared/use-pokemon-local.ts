import { useQuery } from '@tanstack/vue-query'

import { useAbilityProviderStore } from '@/app/stores/modules/ability'
import { usePokemonProviderStore } from '@/app/stores/modules/pokemon'
import { useTypeProviderStore } from '@/app/stores/modules/type'
import type { PokemonFullDetails } from '@/modules/shared/infrastructure/models/app'

export const usePokemonLocal = (name: string) => {
  const pokemonProviderStore = usePokemonProviderStore()
  const abilityProviderStore = useAbilityProviderStore()
  const typeProviderStore = useTypeProviderStore()

  const {
    isLoading: isLoadingPokemonFullDetails,
    isError: isErrorPokemonFullDetails,
    isSuccess: isSuccessPokemonFullDetails,
    error: errorPokemonFullDetails,
    data: pokemonFullDetails,
    refetch: getPokemonFullDetails
  } = useQuery({
    queryKey: ['pokemonFullDetails'],
    queryFn: async () => getFullDetails(name),
    enabled: false
  })

  const getFullDetails = async (name: string): Promise<PokemonFullDetails> => {
    const pokemon = await pokemonProviderStore.pokemonService.getPokemonByName(name)

    const pokemonAbilites = await abilityProviderStore.abilityService.getAbilitiesForPokemon(
      pokemon.id
    )
    const pokemonTypes = await typeProviderStore.typeService.getTypesForPokemon(pokemon.id)
    const pokemonTypesWithRelations =
      await typeProviderStore.typeService.getRelationsForTypes(pokemonTypes)
    const pokemonDamagesReceived =
      await typeProviderStore.typeService.getDamagesReceivedByPokemon(pokemonTypes)

    return {
      ...pokemon,
      abilities: pokemonAbilites,
      types: pokemonTypesWithRelations,
      damagesReceived: pokemonDamagesReceived
    }
  }

  return {
    isLoadingPokemonFullDetails,
    isErrorPokemonFullDetails,
    isSuccessPokemonFullDetails,
    errorPokemonFullDetails,
    pokemonFullDetails,
    getPokemonFullDetails
  }
}
