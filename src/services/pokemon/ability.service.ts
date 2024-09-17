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
}
