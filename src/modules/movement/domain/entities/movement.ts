type MovementConstructor = {
  id: number
  name: string
  effect?: string
  damageClass?: string
  accuracy?: number
  power?: number
  pp?: number
  priority?: number
  typeId?: number
}

export class Movement {
  public id: number
  public name: string
  public effect: string | null
  public damageClass: string | null
  public accuracy: number | null
  public power: number | null
  public pp: number | null
  public priority: number | null
  public typeId: number | null

  constructor({
    id,
    name,
    effect,
    damageClass,
    accuracy,
    power,
    pp,
    priority,
    typeId
  }: MovementConstructor) {
    this.id = id
    this.name = name ?? null
    this.effect = effect ?? null
    this.damageClass = damageClass ?? null
    this.accuracy = accuracy ?? null
    this.power = power ?? null
    this.pp = pp ?? null
    this.priority = priority ?? null
    this.typeId = typeId ?? null
  }
}
