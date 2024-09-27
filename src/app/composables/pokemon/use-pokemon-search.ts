import { computed, ref } from 'vue'

import { usePokemonStore } from '@/app/stores/modules/pokemon'
import type { PokemonLocal } from '@/modules/pokemon/domain/entities/pokemon-local.entity'

export const usePokemonSearch = () => {
  const pokemonStore = usePokemonStore()

  const query = ref('')
  const filteredPokemonList = computed(() => {
    if (!query.value || query.value === '') {
      return []
    }
    return pokemonStore.pokemonList.filter((pokemon: PokemonLocal) =>
      pokemon.name.toLowerCase().includes(query.value.toLowerCase())
    )
  })

  return { query, filteredPokemonList }
}
