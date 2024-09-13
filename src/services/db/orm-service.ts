import { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { pokemon } from './schema'
import { count } from 'drizzle-orm'
import { CustomGeneralError, NotConnected } from '../errors/db'

export class OrmService {
  constructor(private orm: SqliteRemoteDatabase) {}

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

  async insertPokemon(pokemonData: {
    id: number
    name: string
    sprite: string
  }) {
    if (this.orm === null) {
      console.error('No está conectado a la base de datos local')
      return
    }

    try {
      await this.orm.insert(pokemon).values(pokemonData)
      console.log('Pokemon insertado')
    } catch (error) {
      console.error('Error al insertar pokemon', error)
    }
  }
}
