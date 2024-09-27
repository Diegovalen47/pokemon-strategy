import { useQuery } from '@tanstack/vue-query'

import { useTypeProviderStore } from '@/app/stores/modules/type'

export const useDamageRelationsQuery = () => {
  const typeProviderStore = useTypeProviderStore()

  const {
    isLoading: isLoadingDamageRelations,
    isError: isErrorDamageRelations,
    isSuccess: isSuccessDamageRelations,
    error: errorDamageRelations,
    refetch: getDamageRelations
  } = useQuery({
    queryKey: ['syncDamageRelationss'],
    queryFn: async () => {
      const damageRelationsLocalCount =
        await typeProviderStore.typeService.getTypesDamageRelationsCount()

      if (damageRelationsLocalCount === 0) {
        await typeProviderStore.typeService.setTypesDamageRelations()
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
