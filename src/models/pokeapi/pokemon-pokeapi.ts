export type PokemonPokeAPI = {
  readonly abilities: Ability[]
  readonly base_experience: number
  readonly cries: Cries
  readonly forms: Species[]
  readonly game_indices: GameIndex[]
  readonly height: number
  readonly held_items: any[]
  readonly id: number
  readonly is_default: boolean
  readonly location_area_encounters: string
  readonly moves: Move[]
  readonly name: string
  readonly order: number
  readonly past_abilities: any[]
  readonly past_types: any[]
  readonly species: Species
  readonly sprites: Sprites
  readonly stats: Stat[]
  readonly types: Type[]
  readonly weight: number
}

type Ability = {
  readonly ability: Species
  readonly is_hidden: boolean
  readonly slot: number
}

type Species = {
  readonly name: string
  readonly url: string
}

type Cries = {
  readonly latest: string
  readonly legacy: string
}

type GameIndex = {
  readonly game_index: number
  readonly version: Species
}

type Move = {
  readonly move: Species
  readonly version_group_details: VersionGroupDetail[]
}

type VersionGroupDetail = {
  readonly level_learned_at: number
  readonly move_learn_method: Species
  readonly version_group: Species
}

type GenerationV = {
  readonly 'black-white': Sprites
}

type GenerationIv = {
  readonly 'diamond-pearl': Sprites
  readonly 'heartgold-soulsilver': Sprites
  readonly platinum: Sprites
}

type Versions = {
  readonly 'generation-i': GenerationI
  readonly 'generation-ii': GenerationIi
  readonly 'generation-iii': GenerationIii
  readonly 'generation-iv': GenerationIv
  readonly 'generation-v': GenerationV
  readonly 'generation-vi': { [key: string]: Home }
  readonly 'generation-vii': GenerationVii
  readonly 'generation-viii': GenerationViii
}

type Other = {
  readonly dream_world: DreamWorld
  readonly home: Home
  readonly 'official-artwork': OfficialArtwork
  readonly showdown: Sprites
}

type Sprites = {
  readonly back_default: string
  readonly back_female: null
  readonly back_shiny: string
  readonly back_shiny_female: null
  readonly front_default: string
  readonly front_female: null
  readonly front_shiny: string
  readonly front_shiny_female: null
  readonly other?: Other
  readonly versions?: Versions
  readonly animated?: Sprites
}

type GenerationI = {
  readonly 'red-blue': RedBlue
  readonly yellow: RedBlue
}

type RedBlue = {
  readonly back_default: string
  readonly back_gray: string
  readonly back_transparent: string
  readonly front_default: string
  readonly front_gray: string
  readonly front_transparent: string
}

type GenerationIi = {
  readonly crystal: Crystal
  readonly gold: Gold
  readonly silver: Gold
}

type Crystal = {
  readonly back_default: string
  readonly back_shiny: string
  readonly back_shiny_transparent: string
  readonly back_transparent: string
  readonly front_default: string
  readonly front_shiny: string
  readonly front_shiny_transparent: string
  readonly front_transparent: string
}

type Gold = {
  readonly back_default: string
  readonly back_shiny: string
  readonly front_default: string
  readonly front_shiny: string
  readonly front_transparent?: string
}

type GenerationIii = {
  readonly emerald: OfficialArtwork
  readonly 'firered-leafgreen': Gold
  readonly 'ruby-sapphire': Gold
}

type OfficialArtwork = {
  readonly front_default: string
  readonly front_shiny: string
}

type Home = {
  readonly front_default: string
  readonly front_female: null
  readonly front_shiny: string
  readonly front_shiny_female: null
}

type GenerationVii = {
  readonly icons: DreamWorld
  readonly 'ultra-sun-ultra-moon': Home
}

type DreamWorld = {
  readonly front_default: string
  readonly front_female: null
}

type GenerationViii = {
  readonly icons: DreamWorld
}

type Stat = {
  readonly base_stat: number
  readonly effort: number
  readonly stat: Species
}

type Type = {
  readonly slot: number
  readonly type: Species
}
