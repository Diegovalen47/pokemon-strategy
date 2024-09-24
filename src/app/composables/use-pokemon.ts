import { ref } from 'vue'

import { usePokemonStore } from '../stores/pokemon'

import type { PokemonLocal } from '@/modules/pokemon/domain/entities/pokemon-local.entity'

const usePokemon = () => {
  const pokemonStore = usePokemonStore()

  const pokemonList = ref<PokemonLocal[]>([])
  const query = ref('')

  const searchPokemon = async (name: string) => {
    query.value = name
    if (!name || name === '') {
      pokemonList.value = []
      return
    }

    const result =
      await pokemonStore.pokemonService.searchPokemonByLikeName(name)

    if (result instanceof Error) {
      pokemonList.value = []
      return
    }

    pokemonList.value = result
  }

  return { query, pokemonList, searchPokemon }
}

export default usePokemon
