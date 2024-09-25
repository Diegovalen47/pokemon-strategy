import { useQuery } from '@tanstack/vue-query'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { InitializeLocalDbService } from '@/modules/shared/infrastructure/services'

export const useDatabaseStore = defineStore('database', () => {
  const initialDataService = new InitializeLocalDbService()

  const databaseService = ref(initialDataService.databaseService)
  const ormService = ref(initialDataService.ormService)

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
      if (await databaseService.value.allTablesExists()) {
        return true
      }

      await databaseService.value.createTables()
      return false
    },
    enabled: false
  })

  return {
    databaseService,
    ormService,
    isLoadingTables,
    isErrorTables,
    isSuccessTables,
    errorTables,
    tablesAlreadyExists,
    createTables
  }
})
