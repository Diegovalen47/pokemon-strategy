import { count, eq, like } from 'drizzle-orm'
import { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'

import type { PokemonLocal, PokemonLocalRepository } from '../../domain'

import { CustomGeneralError } from '@/errors/db'
import {
  originAbility,
  originType,
  pokemon
} from '@/modules/shared/infrastructure/models/db'

export class PokemonOrmRepository implements PokemonLocalRepository {
  constructor(public orm: SqliteRemoteDatabase) {}

  async getPokemonCount(): Promise<number> {
    try {
      return (await this.orm.select({ value: count() }).from(pokemon))[0].value
    } catch (error) {
      console.error('Error al obtener todos los pokemon', error)
      throw new CustomGeneralError('Error al contar los pokemon')
    }
  }

  async getAllPokemon(): Promise<PokemonLocal[]> {
    try {
      const pokemonList = await this.orm.select().from(pokemon)
      return pokemonList
    } catch (error) {
      console.error('Error al obtener pokemon', error)
      return []
    }
  }

  async updatePokemonSprite({ id, sprite }: { id: number; sprite: string }) {
    try {
      await this.orm.update(pokemon).set({ sprite }).where(eq(pokemon.id, id))
      console.log('Sprite actualizado')
    } catch (error) {
      console.error('Error al actualizar sprite', error)
    }
  }

  async searchPokemonByLikeName(
    query: string
  ): Promise<PokemonLocal[] | Error> {
    try {
      const pokemonList = await this.orm
        .select()
        .from(pokemon)
        .where(like(pokemon.name, `${query}%`))
        .orderBy(pokemon.id)
      return pokemonList
    } catch (error) {
      console.error('Error al obtener todos los pokemon', error)
      return new CustomGeneralError('Error al contar los pokemon')
    }
  }

  async insertPokemon(
    pokemonData: PokemonLocal | PokemonLocal[]
  ): Promise<void> {
    try {
      if (Array.isArray(pokemonData)) {
        await this.orm.insert(pokemon).values(pokemonData)
        console.log('Lista Pokemon insertado')
        return
      }
      await this.orm.insert(pokemon).values(pokemonData)
      console.log('Pokemon insertado')
    } catch (error) {
      console.error('Error al insertar pokemon', error)
    }
  }

  async insertOriginAbility({
    pokemonId,
    abilityId,
    slot
  }: {
    pokemonId: number
    abilityId: number
    slot: number
  }): Promise<void> {
    try {
      await this.orm
        .insert(originAbility)
        .values({ pokemonId, abilityId, slot })
      console.log('OriginAbility insertado')
    } catch (error) {
      console.error('Error al insertar OriginAbility', error)
    }
  }

  async insertOriginType({
    pokemonId,
    typeId,
    slot
  }: {
    pokemonId: number
    typeId: number
    slot: number
  }): Promise<void> {
    try {
      await this.orm.insert(originType).values({ pokemonId, typeId, slot })
      console.log('OriginType insertado')
    } catch (error) {
      console.error('Error al insertar OriginType', error)
    }
  }
}
