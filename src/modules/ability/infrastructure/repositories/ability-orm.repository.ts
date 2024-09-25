import { count, eq } from 'drizzle-orm'
import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'

import type { Ability, AbilityLocalRepository } from '../../domain'

import { ability } from '@/modules/shared/infrastructure/models/db'

export class AbilityOrmRepository implements AbilityLocalRepository {
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

  async getAbilitiesCount(): Promise<number> {
    try {
      return (await this.orm.select({ value: count() }).from(ability))[0].value
    } catch (error) {
      console.error('Error al obtener todos los abilities', error)
      throw new Error('Error al contar los abilities')
    }
  }

  async updateAbility(abilityData: Ability): Promise<void> {
    try {
      await this.orm.update(ability).set(abilityData).where(eq(ability.id, abilityData.id))
      console.log('Ability actualizado')
    } catch (error) {
      console.error('Error al actualizar ability', error)
    }
  }

  async getAllAbilities(): Promise<Ability[]> {
    try {
      const abilities = await this.orm.select().from(ability)
      return abilities
    } catch (error) {
      console.error('Error al obtener abilities', error)
      return []
    }
  }
}
