export type TypeRemoteConstructor = {
  damageRelations: DamageRelations //
  id: number
}

type DamageRelations = {
  doubleDamageTo: Relation[]
  halfDamageTo: Relation[]
  noDamageTo: Relation[]
}

type Relation = {
  destinyTypeId: number
}

export class TypeRemote {
  public damageRelations: DamageRelations
  public id: number

  constructor({ damageRelations, id }: TypeRemoteConstructor) {
    this.damageRelations = damageRelations
    this.id = id
  }
}
