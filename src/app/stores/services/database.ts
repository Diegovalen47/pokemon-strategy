import { defineStore } from 'pinia'
import { ref } from 'vue'

import { InitializeLocalDbService } from '@/modules/shared/infrastructure/services'

export const useDatabaseProviderStore = defineStore('database-provider', () => {
  const initialDataService = new InitializeLocalDbService()

  const databaseService = ref(initialDataService.databaseService)
  const ormService = ref(initialDataService.ormService)

  return {
    databaseService,
    ormService
  }
})
