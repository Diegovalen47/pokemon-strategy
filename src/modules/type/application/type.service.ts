import type { TypeLocalRepository, TypeRemoteRepository } from '../domain'

export class TypeService {
  constructor(
    private typeRemoteRepository: TypeRemoteRepository,
    private typeLocalRepository: TypeLocalRepository
  ) {}

  async getAllTypesAndSaveInDb(): Promise<void> {
    let { next, types } = await this.typeRemoteRepository.getTypesFirstList()

    while (next) {
      await this.typeLocalRepository.insertTypes(types)
      const response = await this.typeRemoteRepository.getTypesNextList(next)
      next = response.next
      types = response.types
    }

    await this.typeLocalRepository.insertTypes(types)
  }

  async getTypesLocalCount(): Promise<number> {
    return await this.typeLocalRepository.getTypesCount()
  }

  async setTypesDamageRelations(): Promise<void> {
    try {
      const types = await this.typeLocalRepository.getAllTypes()

      for (const originType of types) {
        const originTypeDetails = await this.typeRemoteRepository.getTypeByNameOrId(originType.id)

        for (const relation of originTypeDetails.damageRelations.doubleDamageTo) {
          const destinyTypeId = relation.destinyTypeId
          await this.typeLocalRepository.insertDamageRelation(
            originType.id,
            destinyTypeId,
            'double_damage'
          )
        }

        for (const relation of originTypeDetails.damageRelations.halfDamageTo) {
          const destinyTypeId = relation.destinyTypeId
          await this.typeLocalRepository.insertDamageRelation(
            originType.id,
            destinyTypeId,
            'half_damage'
          )
        }

        for (const relation of originTypeDetails.damageRelations.noDamageTo) {
          const destinyTypeId = relation.destinyTypeId
          await this.typeLocalRepository.insertDamageRelation(
            originType.id,
            destinyTypeId,
            'no_damage'
          )
        }
      }

      return
    } catch (error) {
      console.error('Error al actualizar relaciones de daño de tipos', error)
    }
  }

  async getTypesDamageRelationsCount(): Promise<number> {
    return await this.typeLocalRepository.getDamageRelationsCount()
  }
}
