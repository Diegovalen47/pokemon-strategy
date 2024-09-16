import type { Type } from '@/models/core'

export interface TypeRepository {
  getTypesFirstList(): Promise<{ next: string; types: Type[] }>
  getTypesNextList(url: string): Promise<{ next: string; types: Type[] }>
}
