import { computed, watch } from 'vue'

import { useAbilityQuery } from '../ability'
import { useMovementQuery } from '../movement'
import { usePokemonQuery, usePokemonDetailQuery } from '../pokemon'
import { useTypeQuery, useDamageRelationsQuery } from '../type'
import { useDatabaseQuery } from './use-database-query'

import { usePokemonStore } from '@/app/stores/modules/pokemon'

/**
 * Manejo de datos iniciales de forma ordenada.
 * @property {Function} initializeData - Initialize the chain of promises.
 */
export const useInitialData = () => {
  const pokemonStore = usePokemonStore()

  const { createTables, isSuccessTables, isLoadingTables } = useDatabaseQuery()
  const { getPokemon, isSuccessPokemon, isLoadingPokemon } = usePokemonQuery()
  const { getTypes, isSuccessType, isLoadingType } = useTypeQuery()
  const { getAbilities, isSuccessAbility, isLoadingAbility } = useAbilityQuery()
  const { getPokemonDetails, isSuccessPokemonDetail, isLoadingPokemonDetail } =
    usePokemonDetailQuery()
  const { getMovements, isSuccessMovement, isLoadingMovement } = useMovementQuery()
  const { getDamageRelations, isSuccessDamageRelations, isLoadingDamageRelations } =
    useDamageRelationsQuery()

  /**
   * Inicializa la cadena de promesas.
   * Crea las tablas en la base de datos.
   */
  const initializeData = () => {
    createTables()
  }

  /**
   * Maneja el evento de éxito de la creación de tablas.
   * Obtiene los Pokémones.
   */
  watch(isSuccessTables, () => {
    getPokemon()
  })

  /**
   * Maneja el evento de éxito de la obtención de Pokémones.
   * Obtiene los tipos y habilidades.
   */
  watch(isSuccessPokemon, async (value) => {
    if (value) {
      await pokemonStore.getAllPokemon()
      getTypes()
      getAbilities()
    }
  })

  /**
   * Maneja el evento de éxito de la obtención de tipos y habilidades.
   * Obtiene los detalles de los Pokémones, movimientos y relaciones de daño.
   */
  watch([isSuccessType, isSuccessAbility], async ([newIsSuccessType, newIsSuccessAbility]) => {
    if (newIsSuccessType && newIsSuccessAbility) {
      getPokemonDetails()
      getMovements()
      getDamageRelations()
    }
  })

  const areSomeLoading = computed(
    () =>
      isLoadingPokemonDetail.value ||
      isLoadingMovement.value ||
      isLoadingDamageRelations.value ||
      isLoadingType.value ||
      isLoadingAbility.value ||
      isLoadingTables.value ||
      isLoadingPokemon.value
  )

  const isSuccessAll = computed(
    () =>
      isSuccessPokemonDetail.value &&
      isSuccessMovement.value &&
      isSuccessDamageRelations.value &&
      isSuccessType.value &&
      isSuccessAbility.value &&
      isSuccessTables.value &&
      isSuccessPokemon.value
  )

  return {
    initializeData,
    areSomeLoading,
    isSuccessAll
  }
}
