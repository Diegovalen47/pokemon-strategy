import type { TypeDB } from '../db'

import { getIdFromUrl } from '@/utils/pokeapi'

export class Type implements TypeDB {
  constructor(
    public id: number,
    public name: string
  ) {
    this.id = id
    this.name = name
  }

  public static fromJson(json: any): Type {
    return new Type(getIdFromUrl(json.url), json.name)
  }
}
