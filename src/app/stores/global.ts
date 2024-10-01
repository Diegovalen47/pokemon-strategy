import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

import { usePokemonDetailQuery, usePokemonQuery } from '../composables/pokemon'
import { useDatabaseQuery } from '../composables/services'
import { usePokemonStore } from './modules/pokemon'
import { useAbilityQuery } from '../composables/ability'
import { useMovementQuery } from '../composables/movement'
import { useDamageRelationsQuery, useTypeQuery } from '../composables/type'

export const useGlobalStore = defineStore('global', () => {
  const pokemonStore = usePokemonStore()

  const { createTables, isSuccessTables } = useDatabaseQuery()
  const { getPokemon, errorPokemon, isLoadingPokemon, isSuccessPokemon } = usePokemonQuery()
  const { getTypes, isSuccessType } = useTypeQuery()
  const { getAbilities, isSuccessAbility } = useAbilityQuery()
  const { getPokemonDetails } = usePokemonDetailQuery()
  const { getMovements } = useMovementQuery()
  const { getDamageRelations } = useDamageRelationsQuery()

  const initializeData = () => {
    createTables()
  }

  watch(isSuccessTables, () => {
    getPokemon()
  })

  watch(isSuccessPokemon, async (value) => {
    if (value) {
      await pokemonStore.getAllPokemon()
      getTypes()
      getAbilities()
    }
  })

  watch([isSuccessType, isSuccessAbility], async ([newIsSuccessType, newIsSuccessAbility]) => {
    if (newIsSuccessType && newIsSuccessAbility) {
      getPokemonDetails()
      getMovements()
      getDamageRelations()
    }
  })

  return {
    initializeData
  }
})
