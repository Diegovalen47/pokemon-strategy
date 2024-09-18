import type { PokemonDB } from '../db'

import { getIdFromUrl } from '@/utils/pokeapi'

type PokemonConstructor = Partial<PokemonDB> & { id: number; name: string }

export class Pokemon implements PokemonDB {
  public id: number
  public name: string
  public sprite: string | null

  constructor({ id, name, sprite }: PokemonConstructor) {
    this.id = id
    this.name = name
    this.sprite = sprite ?? null
  }

  public static fromJson(json: any): Pokemon {
    return new Pokemon({ id: getIdFromUrl(json.url), name: json.name })
  }
}
