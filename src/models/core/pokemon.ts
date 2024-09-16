import type { PokemonDB } from '../db'

import { getIdFromUrl } from '@/utils/pokeapi'

export class Pokemon implements PokemonDB {
  constructor(
    public id: number,
    public name: string,
    public sprite: string | null
  ) {
    this.id = id
    this.name = name
    this.sprite = sprite
  }

  public static fromJson(json: any): Pokemon {
    return new Pokemon(getIdFromUrl(json.url), json.name, null)
  }
}
