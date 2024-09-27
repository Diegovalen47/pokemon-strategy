import type { AbilityLocalRepository, AbilityRemoteRepository } from '../domain'

export class AbilityService {
  constructor(
    private abilityRemoteRepository: AbilityRemoteRepository,
    private abilityLocalRepository: AbilityLocalRepository
  ) {}

  async getAllAbilitiesAndSaveInDb(): Promise<void> {
    let { next, abilities } = await this.abilityRemoteRepository.getAbilitiesFirstList()

    while (next) {
      const abilityDetails = await Promise.all(
        abilities.map((ability) => this.abilityRemoteRepository.getAbilityByNameOrId(ability.id))
      )
      await this.abilityLocalRepository.insertAbilities(abilityDetails)
      const response = await this.abilityRemoteRepository.getAbilitiesNextList(next)
      next = response.next
      abilities = response.abilities
    }

    await this.abilityLocalRepository.insertAbilities(abilities)
  }

  async getAbilitiesLocalCount(): Promise<number> {
    return await this.abilityLocalRepository.getAbilitiesCount()
  }
}
