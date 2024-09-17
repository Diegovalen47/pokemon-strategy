import type { AbilityDB } from '../db'

import { getIdFromUrl } from '@/utils/pokeapi'

export class Ability implements AbilityDB {
  constructor(
    public id: number,
    public name: string,
    public effect: string | null = null
  ) {
    this.id = id
    this.name = name
    this.effect
  }

  public static fromJson(json: any): Ability {
    return new Ability(getIdFromUrl(json.url), json.name)
  }
}
