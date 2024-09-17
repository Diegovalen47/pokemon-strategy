import type { AbilityOrmService } from '../orm'

import type { AbilityRepository } from '@/repositories/pokeapi'

export class AbilityService {
  constructor(
    private abilityRepository: AbilityRepository,
    private abilityOrmService: AbilityOrmService
  ) {}

  async getAllAbilitiesAndSaveInDb(): Promise<void> {
    let { next, abilities } =
      await this.abilityRepository.getAbilitiesFirstList()

    while (next) {
      await this.abilityOrmService.insertAbilities(abilities)
      const response = await this.abilityRepository.getAbilitiesNextList(next)
      next = response.next
      abilities = response.abilities
    }

    await this.abilityOrmService.insertAbilities(abilities)
  }

  async setAbilitiesEffect(): Promise<void> {
    try {
      const abilities = await this.abilityOrmService.getAllAbilities()
      const batchSize = 50

      for (let i = 0; i < abilities.length; i += batchSize) {
        const batch = abilities.slice(i, i + batchSize)
        const abilityDetails = await Promise.all(
          batch.map((ability) =>
            this.abilityRepository.getAbilityByNameOrId(ability.id)
          )
        )
        await Promise.all(
          abilityDetails.map((abilityDetail) =>
            this.abilityOrmService.updateAbility(abilityDetail)
          )
        )
      }
    } catch (error) {
      console.error('Error al actualizar efectos de habilidades', error)
    }
  }
}
