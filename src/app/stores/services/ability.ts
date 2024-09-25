import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useDatabaseStore } from './database'

import { AbilityService } from '@/modules/ability/application'
import { AbilityOrmRepository, AbilityPokeapiRepository } from '@/modules/ability/infrastructure'
import { pokeApi } from '@/modules/shared/infrastructure'

export const useAbilityStore = defineStore('ability', () => {
  const databaseStore = useDatabaseStore()

  const abilityServiceInstance = new AbilityService(
    new AbilityPokeapiRepository(pokeApi),
    new AbilityOrmRepository(databaseStore.ormService as SqliteRemoteDatabase)
  )

  const abilityService = ref(abilityServiceInstance)

  return {
    abilityService
  }
})
