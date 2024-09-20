import type { Type } from '@/models/core'
import type { TypePokeAPI } from '@/models/pokeapi'

export interface TypeRepository {
  getTypesFirstList(): Promise<{ next: string; types: Type[] }>
  getTypesNextList(url: string): Promise<{ next: string; types: Type[] }>
  getTypeByNameOrId(nameOrId: string | number): Promise<TypePokeAPI>
}
