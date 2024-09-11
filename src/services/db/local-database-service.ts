import { SQLocalDrizzle } from 'sqlocal/drizzle'
import { drizzle, SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { pokemon } from './schema'

export class LocalDatabaseService {
  public db: null | SqliteRemoteDatabase = null
  private sqlQueryBuilder: <Result extends Record<string, any>>(
    queryTemplate: TemplateStringsArray | string,
    ...params: unknown[]
  ) => Promise<Result[]> = async () => {
    return []
  }
  private retryCount = 0

  constructor(private fileName: string = 'pokemondb.sqlite3') {}

  async connect() {
    // Singleton
    if (this.db !== null) {
      console.log('Ya está conectado a la base de datos local')
      return
    }

    try {
      const {
        driver,
        batchDriver,
        sql,
        getDatabaseInfo,
        getDatabaseFile,
        overwriteDatabaseFile
      } = new SQLocalDrizzle(this.fileName)
      console.log(await getDatabaseInfo())
      console.log(await getDatabaseFile())

      this.db = drizzle(driver, batchDriver)
      this.sqlQueryBuilder = sql
      console.log('Conectado a la base de datos local')
    } catch (error) {
      console.error('Error al conectarse a la base de datos', error)
    }
  }

  disconnect() {
    if (this.db === null) {
      console.log('No está conectado a la base de datos local')
      return
    }

    this.db = null
    console.log('Desconectado de la base de datos local')
  }

  async createTables() {
    if (this.db === null) {
      console.error('No está conectado a la base de datos local')
      return
    }

    try {
      await this.sqlQueryBuilder`
        CREATE TABLE POKEMON (
          id integer PRIMARY KEY NOT NULL,
          name text NOT NULL,
          sprite text
        )
      `
      console.log('Tablas creadas')
    } catch (error) {
      console.error('Error al crear tablas', error)
    }
  }

  async getAllPokemon() {
    if (this.db === null) {
      console.error('No está conectado a la base de datos local')
      return
    }

    try {
      return await this.db.select().from(pokemon)
    } catch (error) {
      console.error('Error al obtener todos los pokemones', error)
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
}
