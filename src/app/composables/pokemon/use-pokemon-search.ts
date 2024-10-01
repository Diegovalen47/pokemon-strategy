import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { usePokemonStore } from '@/app/stores/modules/pokemon'
import type { PokemonLocal } from '@/modules/pokemon/domain'

export const usePokemonSearch = () => {
  const pokemonStore = usePokemonStore()
  const router = useRouter()

  const query = ref('')
  const selectedPokemon = ref<PokemonLocal | null>(null)

  const filteredPokemonList = computed(() => {
    if (!query.value || query.value === '') {
      return []
    }
    return pokemonStore.pokemonList.filter((pokemon: PokemonLocal) =>
      pokemon.name.toLowerCase().includes(query.value.toLowerCase())
    )
  })

  const selectPokemon = (pokemon: PokemonLocal) => {
    query.value = pokemon.name
    selectedPokemon.value = pokemon
    goToPokemonDetail(pokemon.name)
  }

  const goToPokemonDetail = (pokemonName: string) => {
    router.push({
      path: `/pokemon/${pokemonName}`
    })
  }

  return { query, filteredPokemonList, selectedPokemon, selectPokemon }
}
