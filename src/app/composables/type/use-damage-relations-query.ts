import { useQuery } from '@tanstack/vue-query'

import { useTypeStore } from '@/app/stores/services'

export const useDamageRelationsQuery = () => {
  const typeStore = useTypeStore()

  const {
    isLoading: isLoadingDamageRelations,
    isError: isErrorDamageRelations,
    isSuccess: isSuccessDamageRelations,
    error: errorDamageRelations,
    refetch: getDamageRelations
  } = useQuery({
    queryKey: ['syncDamageRelationss'],
    queryFn: async () => {
      const damageRelationsLocalCount = await typeStore.typeService.getTypesDamageRelationsCount()

      if (damageRelationsLocalCount === 0) {
        await typeStore.typeService.setTypesDamageRelations()
        console.log('Damage relations obtenidos y cacheados')
        return true
      }
      return false
    },
    enabled: false
  })

  return {
    isLoadingDamageRelations,
    isErrorDamageRelations,
    isSuccessDamageRelations,
    errorDamageRelations,
    getDamageRelations
  }
}
