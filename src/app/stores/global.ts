import { useQuery } from '@tanstack/vue-query'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { ResourceAlreadyExists } from '@/errors/db'
import { InitializeLocalDbService } from '@/modules/shared/infrastructure/services'

export const useGlobalStore = defineStore('global', () => {
  const initialDataService = new InitializeLocalDbService()

  const databaseService = ref(initialDataService.databaseService)
  const ormService = ref(initialDataService.ormService)

  const {
    data: tablesAlreadyExists,
    isLoading,
    isError,
    error,
    refetch: createTables
  } = useQuery({
    queryKey: ['createLocalDatabase'],
    queryFn: async () => {
      const data = await databaseService.value.createTables()
      if (data instanceof ResourceAlreadyExists) {
        return true
      }
      return false
    },
    enabled: false
  })

  return {
    databaseService,
    ormService,
    isLoading,
    isError,
    error,
    tablesAlreadyExists,
    createTables
  }
})
