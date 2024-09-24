type PokemonRemoteConstructor = {
  id: number
  sprite: string
  abilities: Ability[]
  types: Type[]
}

type Ability = {
  id: number
  slot: number
}

type Type = {
  slot: number
  id: number
}

export class PokemonRemote {
  public id: number
  public sprite: string
  public abilities: Ability[]
  public types: Type[]

  constructor({ id, sprite, abilities, types }: PokemonRemoteConstructor) {
    this.id = id
    this.sprite = sprite
    this.abilities = abilities
    this.types = types
  }
}
