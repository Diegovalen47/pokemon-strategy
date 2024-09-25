import { useQuery } from '@tanstack/vue-query'

import { useTypeStore } from '@/app/stores/services/type'

export const useTypeQuery = () => {
  const typeStore = useTypeStore()

  const {
    isLoading: isLoadingType,
    isError: isErrorType,
    isSuccess: isSuccessType,
    error: errorType,
    refetch: getTypes
  } = useQuery({
    queryKey: ['syncType'],
    queryFn: async () => {
      const typeCacheCount = await typeStore.typeService.getTypesLocalCount()

      if (typeCacheCount === 0) {
        await typeStore.typeService.getAllTypesAndSaveInDb()
        console.log('Type obtenidos y cacheados')
        return true
      }
      return false
    },
    enabled: false
  })

  return {
    isLoadingType,
    isErrorType,
    isSuccessType,
    errorType,
    getTypes
  }
}
