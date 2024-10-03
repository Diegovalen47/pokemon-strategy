import type { Relation, TypeLocal, TypeLocalRepository, TypeRemoteRepository } from '../domain'
import type {
  DamageRelations,
  InsertDamageRelationDto,
  TypeWithDamageRelations
} from '../domain/dtos'

const relations: Relation[] = ['double_damage', 'half_damage', 'no_damage']
const relationsDamageMapping: Record<Relation, number> = {
  double_damage: 2,
  half_damage: 0.5,
  no_damage: 0,
  normal_damage: 1
}

const damageRelationsMapping: Record<Relation, string> = {
  double_damage: 'doubleDamageTo',
  half_damage: 'halfDamageTo',
  no_damage: 'noDamageTo',
  normal_damage: 'normalDamageTo'
}

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

  async getTypesForPokemon(pokemonId: number): Promise<TypeLocal[]> {
    return await this.typeLocalRepository.getTypesForPokemon(pokemonId)
  }

  async getRelationsForTypes(pokemonTypes: TypeLocal[]): Promise<TypeWithDamageRelations[]> {
    const typesWithRelations = await Promise.all(
      pokemonTypes.map(async (type) => {
        const damageRelations: Record<string, any[]> = {
          doubleDamageTo: [],
          halfDamageTo: [],
          noDamageTo: []
        }

        for (const relation of relations) {
          const affectedTypes = await this.typeLocalRepository.getDamageRelationsForType({
            relation,
            typeId: type.id
          })

          damageRelations[damageRelationsMapping[relation]] = affectedTypes
        }

        return {
          ...type,
          damageRelations: damageRelations as DamageRelations
        }
      })
    )

    return typesWithRelations
  }

  async getTypesDamageRelationsCount(): Promise<number> {
    return await this.typeLocalRepository.getDamageRelationsCount()
  }

  async getDamagesReceivedByPokemon(pokemonTypes: TypeLocal[]): Promise<Map<number, TypeLocal[]>> {
    // key: typeId, value: damageMultiplier Array
    const damageMultipliersByType: Map<number, number[]> = new Map()

    for (const type of pokemonTypes) {
      for (const relation of relations) {
        const typesThatAffectOrigin = await this.typeLocalRepository.getDamageRelationsAgainstType({
          relation,
          typeId: type.id
        })

        for (const affectedType of typesThatAffectOrigin) {
          if (damageMultipliersByType.has(affectedType.id)) {
            damageMultipliersByType.get(affectedType.id)?.push(relationsDamageMapping[relation])
          } else {
            damageMultipliersByType.set(affectedType.id, [relationsDamageMapping[relation]])
          }
        }
      }
    }

    const finalDamageByType: Map<number, number> = new Map()

    for (const [typeId, damageMultipliers] of damageMultipliersByType) {
      const finalDamage = damageMultipliers.reduce((acc, curr) => acc * curr, 1)
      finalDamageByType.set(typeId, finalDamage)
    }

    const damagesReceivedByPokemon: Map<number, TypeLocal[]> = new Map()

    for (const [typeId, damageMultiplier] of finalDamageByType) {
      if (damageMultiplier === 1) {
        continue
      }

      const type = await this.typeLocalRepository.getTypeById(typeId)

      if (damagesReceivedByPokemon.has(damageMultiplier)) {
        damagesReceivedByPokemon.get(damageMultiplier)?.push(type)
      } else {
        damagesReceivedByPokemon.set(damageMultiplier, [type])
      }
    }

    return damagesReceivedByPokemon
  }
}
