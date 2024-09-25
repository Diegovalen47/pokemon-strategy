import { useQuery } from '@tanstack/vue-query'

import { useMovementStore } from '@/app/stores/services'

export const useMovementQuery = () => {
  const movementStore = useMovementStore()

  const {
    isLoading: isLoadingMovement,
    isError: isErrorMovement,
    isSuccess: isSuccessMovement,
    error: errorMovement,
    refetch: getMovements
  } = useQuery({
    queryKey: ['syncMovement'],
    queryFn: async () => {
      const movementCacheCount = await movementStore.movementService.getMovementsLocalCount()

      if (movementCacheCount === 0) {
        await movementStore.movementService.getAllMovementsAndSaveInDb()
        await movementStore.movementService.setMovementsExtraData()
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
