import { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { pokemon } from './schema'
import type Pokemon from '@/models/pokemon'
import { count, ilike } from 'drizzle-orm'
import { CustomGeneralError, NotConnected } from '../errors/db'

export class OrmService {
  constructor(public orm: SqliteRemoteDatabase) {}

  async getPokemonCount(): Promise<number | Error> {
    if (this.orm === null) {
      console.error('No está conectado a la base de datos local')
      return new NotConnected()
    }

    try {
      return (await this.orm.select({ value: count() }).from(pokemon))[0].value
    } catch (error) {
      console.error('Error al obtener todos los pokemon', error)
      return new CustomGeneralError('Error al contar los pokemon')
    }
  }

  async searchPokemonByLikeName(query: string): Promise<Pokemon[] | Error> {
    if (this.orm === null) {
      console.error('No está conectado a la base de datos local')
      return new NotConnected()
    }

    try {
      const pokemonList = await this.orm
        .select()
        .from(pokemon)
        .where(ilike(pokemon.name, `${query}%`))
        .orderBy(pokemon.id)
      return pokemonList
    } catch (error) {
      console.error('Error al obtener todos los pokemon', error)
      return new CustomGeneralError('Error al contar los pokemon')
    }
  }

  async insertPokemon(pokemonData: Pokemon | Pokemon[]): Promise<void> {
    if (this.orm === null) {
      console.error('No está conectado a la base de datos local')
      return
    }

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
