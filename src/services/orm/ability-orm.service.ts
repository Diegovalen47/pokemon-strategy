import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'

import type { Ability } from '@/models/core'
import { ability } from '@/models/db'

export class AbilityOrmService {
  constructor(public orm: SqliteRemoteDatabase) {}

  async insertAbilities(abilitiesData: Ability | Ability[]): Promise<void> {
    try {
      if (Array.isArray(abilitiesData)) {
        await this.orm.insert(ability).values(abilitiesData)
        console.log('Lista Abilites insertado')
        return
      }
      await this.orm.insert(ability).values(abilitiesData)
      console.log('Ability insertado')
    } catch (error) {
      console.error('Error al insertar ability', error)
    }
  }
}
