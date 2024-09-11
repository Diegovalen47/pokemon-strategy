import { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { pokemon } from './schema'

export class OrmService {
  private retryCount = 0

  constructor(private orm: SqliteRemoteDatabase) {}

  async getAllPokemon() {
    if (this.orm === null) {
      console.error('No está conectado a la base de datos local')
      return
    }

    try {
      return await this.orm.select().from(pokemon)
    } catch (error) {
      console.error('Error al obtener todos los pokemon', error)
      this.retryCount++
      if (this.retryCount >= 3) {
        console.error('No se pudo obtener todos los pokemones')
        this.retryCount = 0
        return
      }
      this.createTables()
      console.log('Intentando de nuevo...')
      await this.getAllPokemon()
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
