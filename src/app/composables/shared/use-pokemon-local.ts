import { useAbilityProviderStore } from '@/app/stores/modules/ability'
import { usePokemonProviderStore } from '@/app/stores/modules/pokemon'
import { useTypeProviderStore } from '@/app/stores/modules/type'
import type { PokemonFullDetails } from '@/modules/shared/infrastructure/models/app'

export const usePokemonLocal = () => {
  const pokemonProviderStore = usePokemonProviderStore()
  const abilityProviderStore = useAbilityProviderStore()
  const typeProviderStore = useTypeProviderStore()

  const getPokemonFullDetails = async (name: string): Promise<PokemonFullDetails> => {
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
    getPokemonFullDetails
  }
}
