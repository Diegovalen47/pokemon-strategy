import { defineStore } from 'pinia'
import { ref } from 'vue'

import { usePokemonProviderStore } from './pokemon-provider'

import type { PokemonLocal } from '@/modules/pokemon/domain'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonProviderStore = usePokemonProviderStore()
  const pokemonList = ref<PokemonLocal[]>([])

  const getAllPokemon = async () => {
    pokemonList.value = await pokemonProviderStore.pokemonService.getAllPokemonLocal()
  }

  return {
    pokemonList,
    getAllPokemon
  }
})
