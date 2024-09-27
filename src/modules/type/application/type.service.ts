import type { TypeLocalRepository, TypeRemoteRepository } from '../domain'
import type { InsertDamageRelationDto } from '../domain/dtos'

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

      const batchSize = 100

      for (let i = 0; i < types.length; i += batchSize) {
        const batch = types.slice(i, i + batchSize)

        const typesDetailsList = await Promise.all(
          batch.map((type) => this.typeRemoteRepository.getTypeByNameOrId(type.id))
        )

        const insertDamageRelations: InsertDamageRelationDto[] = []

        for (const typeDetails of typesDetailsList) {
          for (const relation of typeDetails.damageRelations.doubleDamageTo) {
            insertDamageRelations.push({
              originTypeId: typeDetails.id,
              destinyTypeId: relation.destinyTypeId,
              relation: 'double_damage'
            })
          }

          for (const relation of typeDetails.damageRelations.halfDamageTo) {
            insertDamageRelations.push({
              originTypeId: typeDetails.id,
              destinyTypeId: relation.destinyTypeId,
              relation: 'half_damage'
            })
          }

          for (const relation of typeDetails.damageRelations.noDamageTo) {
            insertDamageRelations.push({
              originTypeId: typeDetails.id,
              destinyTypeId: relation.destinyTypeId,
              relation: 'no_damage'
            })
          }
        }

        await this.typeLocalRepository.insertDamageRelation(insertDamageRelations)
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
