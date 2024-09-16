import { count, like } from 'drizzle-orm'
import { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'

import { CustomGeneralError } from '../../errors/db/db'

import type Pokemon from '@/models/core/pokemon'
import { pokemon } from '@/models/db'

export class OrmService {
  constructor(public orm: SqliteRemoteDatabase) {}

  async getPokemonCount(): Promise<number | Error> {
    try {
      return (await this.orm.select({ value: count() }).from(pokemon))[0].value
    } catch (error) {
      console.error('Error al obtener todos los pokemon', error)
      return new CustomGeneralError('Error al contar los pokemon')
    }
  }

  async searchPokemonByLikeName(query: string): Promise<Pokemon[] | Error> {
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

  async insertPokemon(pokemonData: Pokemon | Pokemon[]): Promise<void> {
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
}
