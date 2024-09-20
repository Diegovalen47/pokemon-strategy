import type { TypeOrmService } from '../orm'

import type { TypeRepository } from '@/repositories/pokeapi'
import { getIdFromUrl } from '@/utils/pokeapi'

export class TypeService {
  constructor(
    private typeRepository: TypeRepository,
    private typeOrmService: TypeOrmService
  ) {}

  async getAllTypesAndSaveInDb(): Promise<void> {
    let { next, types } = await this.typeRepository.getTypesFirstList()

    while (next) {
      await this.typeOrmService.insertTypes(types)
      const response = await this.typeRepository.getTypesNextList(next)
      next = response.next
      types = response.types
    }

    await this.typeOrmService.insertTypes(types)
  }

  async setTypesDamageRelations(): Promise<void> {
    try {
      const types = await this.typeOrmService.getAllTypes()

      for (const originType of types) {
        const originTypeDetails = await this.typeRepository.getTypeByNameOrId(
          originType.id
        )

        for (const relation of originTypeDetails.damage_relations
          .double_damage_to) {
          const destinyTypeId = getIdFromUrl(relation.url)
          await this.typeOrmService.insertDamageRelation(
            originType.id,
            destinyTypeId,
            'double_damage'
          )
        }

        for (const relation of originTypeDetails.damage_relations
          .half_damage_to) {
          const destinyTypeId = getIdFromUrl(relation.url)
          await this.typeOrmService.insertDamageRelation(
            originType.id,
            destinyTypeId,
            'half_damage'
          )
        }

        for (const relation of originTypeDetails.damage_relations
          .no_damage_to) {
          const destinyTypeId = getIdFromUrl(relation.url)
          await this.typeOrmService.insertDamageRelation(
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
}
