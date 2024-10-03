import { count, eq, like } from 'drizzle-orm'
import { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'

import type { PokemonLocal, PokemonLocalRepository } from '../../domain'
import type { InsertOriginAbilityDto, InsertOriginTypeDto } from '../../domain/dtos'

import { CustomGeneralError } from '@/errors/db'
import { originAbility, originType, pokemon } from '@/modules/shared/infrastructure/models/db'

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

  async getPokemonByName(name: string): Promise<PokemonLocal> {
    try {
      const foundPokemon = await this.orm.select().from(pokemon).where(eq(pokemon.name, name))

      if (foundPokemon.length === 0) {
        console.error('No se encontro el pokemon')
        throw new CustomGeneralError('No se encontro el pokemon')
      }

      return foundPokemon[0]
    } catch (error) {
      console.error('Error al obtener pokemon por nombre', error)
      throw new CustomGeneralError('Error al obtener pokemon')
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

  async searchPokemonByLikeName(query: string): Promise<PokemonLocal[] | Error> {
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

  async insertPokemon(pokemonData: PokemonLocal | PokemonLocal[]): Promise<void> {
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

  async getOriginAbilitiesCount(): Promise<number> {
    try {
      return (await this.orm.select({ value: count() }).from(originAbility))[0].value
    } catch (error) {
      console.error('Error al obtener todos los origin abilities', error)
      throw new CustomGeneralError('Error al contar los origin abilities')
    }
  }

  async getOriginTypesCount(): Promise<number> {
    try {
      return (await this.orm.select({ value: count() }).from(originType))[0].value
    } catch (error) {
      console.error('Error al obtener todos los origin types', error)
      throw new CustomGeneralError('Error al contar los origin types')
    }
  }

  async insertOriginAbility(
    abilityData: InsertOriginAbilityDto | InsertOriginAbilityDto[]
  ): Promise<void> {
    try {
      if (Array.isArray(abilityData)) {
        await this.orm.insert(originAbility).values(abilityData)
        console.log('OriginAbility insertado')
        return
      }
      await this.orm.insert(originAbility).values(abilityData)
      console.log('OriginAbility insertado')
    } catch (error) {
      console.warn('Error al insertar OriginAbility', error)
    }
  }

  async insertOriginType(typeData: InsertOriginTypeDto | InsertOriginTypeDto[]): Promise<void> {
    try {
      if (Array.isArray(typeData)) {
        await this.orm.insert(originType).values(typeData)
        console.log('OriginType insertado')
        return
      }
      await this.orm.insert(originType).values(typeData)
      console.log('OriginType insertado')
    } catch (error) {
      console.warn('Error al insertar OriginType', error)
    }
  }

  async deleteAllPokemon(): Promise<void> {
    try {
      // eslint-disable-next-line drizzle/enforce-delete-with-where
      await this.orm.delete(pokemon)
      console.log('Pokemon eliminados')
    } catch (error) {
      console.error('Error al eliminar pokemon', error)
    }
  }
}
