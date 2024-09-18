import type { TypeDB } from '../db'

import { getIdFromUrl } from '@/utils/pokeapi'

type TypeConstructor = TypeDB

export class Type implements TypeDB {
  public id: number
  public name: string

  constructor({ id, name }: TypeConstructor) {
    this.id = id
    this.name = name
  }

  public static fromJson(json: any): Type {
    return new Type({ id: getIdFromUrl(json.url), name: json.name })
  }
}
