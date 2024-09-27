import { useQuery } from '@tanstack/vue-query'

import { useTypeProviderStore } from '@/app/stores/modules/type/type-provider'

export const useTypeQuery = () => {
  const typeProviderStore = useTypeProviderStore()

  const {
    isLoading: isLoadingType,
    isError: isErrorType,
    isSuccess: isSuccessType,
    error: errorType,
    refetch: getTypes
  } = useQuery({
    queryKey: ['syncType'],
    queryFn: async () => {
      const typeCacheCount = await typeProviderStore.typeService.getTypesLocalCount()

      if (typeCacheCount === 0) {
        await typeProviderStore.typeService.getAllTypesAndSaveInDb()
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
