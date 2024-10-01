import { useQuery } from '@tanstack/vue-query'

import { useDatabaseProviderStore } from '@/app/stores/services'

export const useDatabaseQuery = () => {
  const databaseProviderStore = useDatabaseProviderStore()

  const {
    data: tablesAlreadyExists,
    isLoading: isLoadingTables,
    isError: isErrorTables,
    error: errorTables,
    isSuccess: isSuccessTables,
    refetch: createTables
  } = useQuery({
    queryKey: ['createLocalDatabase'],
    queryFn: async () => {
      if (await databaseProviderStore.databaseService.allTablesExists()) {
        return true
      }

      await databaseProviderStore.databaseService.createTables()
      return false
    },
    enabled: false
  })

  return {
    isLoadingTables,
    isErrorTables,
    isSuccessTables,
    errorTables,
    tablesAlreadyExists,
    createTables
  }
}
