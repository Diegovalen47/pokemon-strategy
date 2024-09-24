import type { TypeLocal, TypeRemote } from '../entities'

export interface TypeRemoteRepository {
  getTypesFirstList(): Promise<{ next: string; types: TypeLocal[] }>
  getTypesNextList(url: string): Promise<{ next: string; types: TypeLocal[] }>
  getTypeByNameOrId(nameOrId: string | number): Promise<TypeRemote>
}
