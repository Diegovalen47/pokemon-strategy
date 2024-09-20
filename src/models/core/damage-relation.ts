import type { DamageRelationDB, Relation } from '../db'

export class DamageRelation implements DamageRelationDB {
  public originTypeId: number
  public destinyTypeId: number
  public id?: number | undefined
  public relation?: Relation | undefined

  constructor({ originTypeId, destinyTypeId, id, relation }: DamageRelationDB) {
    this.originTypeId = originTypeId
    this.destinyTypeId = destinyTypeId
    this.id = id
    this.relation = relation
  }
}
