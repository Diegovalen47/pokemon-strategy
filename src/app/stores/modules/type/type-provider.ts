import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useDatabaseProviderStore } from '../../services/database'

import { pokeApi } from '@/modules/shared/infrastructure'
import { TypeService } from '@/modules/type/application'
import { TypeOrmRepository, TypePokeapiRepository } from '@/modules/type/infrastructure'

export const useTypeProviderStore = defineStore('type-provider', () => {
  const databaseStore = useDatabaseProviderStore()

  const typeServiceInstance = new TypeService(
    new TypePokeapiRepository(pokeApi),
    new TypeOrmRepository(databaseStore.ormService as SqliteRemoteDatabase)
  )

  const typeService = ref(typeServiceInstance)

  return {
    typeService
  }
})
