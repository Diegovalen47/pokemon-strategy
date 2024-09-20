export type TypePokeAPI = {
  readonly damage_relations: DamageRelations
  readonly game_indices: GameIndex[]
  readonly generation: Generation
  readonly id: number
  readonly move_damage_class: Generation
  readonly moves: Generation[]
  readonly name: string
  readonly names: Name[]
  readonly past_damage_relations: any[]
  readonly pokemon: Pokemon[]
  readonly sprites: Sprites
}

type DamageRelations = {
  readonly double_damage_from: Generation[]
  readonly double_damage_to: Generation[]
  readonly half_damage_from: Generation[]
  readonly half_damage_to: Generation[]
  readonly no_damage_from: any[]
  readonly no_damage_to: Generation[]
}

type Generation = {
  readonly name: string
  readonly url: string
}

type GameIndex = {
  readonly game_index: number
  readonly generation: Generation
}

type Name = {
  readonly language: Generation
  readonly name: string
}

type Pokemon = {
  readonly pokemon: Generation
  readonly slot: number
}

type Sprites = {
  readonly 'generation-iii': GenerationIii
  readonly 'generation-iv': GenerationIv
  readonly 'generation-ix': GenerationIx
  readonly 'generation-v': GenerationV
  readonly 'generation-vi': { [key: string]: Colosseum }
  readonly 'generation-vii': GenerationVii
  readonly 'generation-viii': GenerationViii
}

type GenerationIii = {
  readonly colosseum: Colosseum
  readonly emerald: Colosseum
  readonly 'firered-leafgreen': Colosseum
  readonly 'ruby-saphire': Colosseum
  readonly xd: Colosseum
}

type Colosseum = {
  readonly name_icon: string
}

type GenerationIv = {
  readonly 'diamond-pearl': Colosseum
  readonly 'heartgold-soulsilver': Colosseum
  readonly platinum: Colosseum
}

type GenerationIx = {
  readonly 'scarlet-violet': Colosseum
}

type GenerationV = {
  readonly 'black-2-white-2': Colosseum
  readonly 'black-white': Colosseum
}

type GenerationVii = {
  readonly 'lets-go-pikachu-lets-go-eevee': Colosseum
  readonly 'sun-moon': Colosseum
  readonly 'ultra-sun-ultra-moon': Colosseum
}

type GenerationViii = {
  readonly 'brilliant-diamond-and-shining-pearl': Colosseum
  readonly 'legends-arceus': Colosseum
  readonly 'sword-shield': Colosseum
}
