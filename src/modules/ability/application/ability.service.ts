import type { AbilityLocalRepository, AbilityRemoteRepository } from '../domain'

export class AbilityService {
  constructor(
    private abilityRemoteRepository: AbilityRemoteRepository,
    private abilityLocalRepository: AbilityLocalRepository
  ) {}

  async getAllAbilitiesAndSaveInDb(): Promise<void> {
    let { next, abilities } =
      await this.abilityRemoteRepository.getAbilitiesFirstList()

    while (next) {
      await this.abilityLocalRepository.insertAbilities(abilities)
      const response =
        await this.abilityRemoteRepository.getAbilitiesNextList(next)
      next = response.next
      abilities = response.abilities
    }

    await this.abilityLocalRepository.insertAbilities(abilities)
  }

  async setAbilitiesEffect(): Promise<void> {
    try {
      const abilities = await this.abilityLocalRepository.getAllAbilities()
      const batchSize = 50

      for (let i = 0; i < abilities.length; i += batchSize) {
        const batch = abilities.slice(i, i + batchSize)
        const abilityDetails = await Promise.all(
          batch.map((ability) =>
            this.abilityRemoteRepository.getAbilityByNameOrId(ability.id)
          )
        )
        await Promise.all(
          abilityDetails.map((abilityDetail) =>
            this.abilityLocalRepository.updateAbility(abilityDetail)
          )
        )
      }
    } catch (error) {
      console.error('Error al actualizar efectos de habilidades', error)
    }
  }
}
