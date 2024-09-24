type AbilityConstructor = { id: number; name: string; effect?: string }

export class Ability {
  public id: number
  public name: string
  public effect: string | null

  constructor({ id, name, effect }: AbilityConstructor) {
    this.id = id
    this.name = name ?? null
    this.effect = effect ?? null
  }
}
