type PokemonConstructor = { id: number; name: string; sprite?: string }

export class PokemonLocal {
  public id: number
  public name: string
  public sprite: string | null

  constructor({ id, name, sprite }: PokemonConstructor) {
    this.id = id
    this.name = name
    this.sprite = sprite ?? null
  }
}
