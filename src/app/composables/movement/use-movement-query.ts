import { useQuery } from '@tanstack/vue-query'

import { useMovementProviderStore } from '@/app/stores/modules/movement'

export const useMovementQuery = () => {
  const movementProviderStore = useMovementProviderStore()

  const {
    isLoading: isLoadingMovement,
    isError: isErrorMovement,
    isSuccess: isSuccessMovement,
    error: errorMovement,
    refetch: getMovements
  } = useQuery({
    queryKey: ['syncMovement'],
    queryFn: async () => {
      const movementCacheCount =
        await movementProviderStore.movementService.getMovementsLocalCount()

      if (movementCacheCount === 0) {
        await movementProviderStore.movementService.getAllMovementsAndSaveInDb()
        await movementProviderStore.movementService.setMovementsExtraData()
        console.log('Movement obtenidos y cacheados')
        return true
      }
      return false
    },
    enabled: false
  })

  return {
    isLoadingMovement,
    isErrorMovement,
    isSuccessMovement,
    errorMovement,
    getMovements
  }
}
