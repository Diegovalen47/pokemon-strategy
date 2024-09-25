import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useDatabaseStore } from './database'

import { pokeApi } from '@/modules/shared/infrastructure'
import { TypeService } from '@/modules/type/application'
import { TypeOrmRepository, TypePokeapiRepository } from '@/modules/type/infrastructure'

export const useTypeStore = defineStore('type', () => {
  const databaseStore = useDatabaseStore()

  const typeServiceInstance = new TypeService(
    new TypePokeapiRepository(pokeApi),
    new TypeOrmRepository(databaseStore.ormService as SqliteRemoteDatabase)
  )

  const typeService = ref(typeServiceInstance)

  return {
    typeService
  }
})
