import { SQLocalDrizzle } from 'sqlocal/drizzle'
import { drizzle, SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'

export class ClientDbService {
  private db: SQLocalDrizzle | null = null
  private orm: SqliteRemoteDatabase | null = null

  constructor(private fileName: string = 'pokemondb.sqlite') {}

  public getOrm() {
    if (this.orm === null) {
      throw new Error('No está conectado a la base de datos local')
    }
    return this.orm
  }

  public async connect() {
    // Singleton
    if (this.db !== null) {
      console.log('Ya está conectado a la base de datos local')
      return
    }

    try {
      this.db = new SQLocalDrizzle(this.fileName)
      this.orm = drizzle(this.db.driver, this.db.batchDriver)

      console.log('Conectado a la base de datos local')
      console.log('databaseInfo:', await this.db.getDatabaseInfo())
      console.log('databaseFile', await this.db.getDatabaseFile())
    } catch (error) {
      console.error('Error al conectarse a la base de datos', error)
    }
  }

  public async disconnect() {
    if (this.db === null) {
      console.log('No está conectado a la base de datos local')
      return
    }

    try {
      await this.db.destroy()
      this.db = null
      this.orm = null
      console.log('Desconectado de la base de datos local')
    } catch (error) {
      console.error('Error al desconectarse de la base de datos', error)
    }
  }

  public async deleteDatabase() {
    if (this.db === null) {
      console.error('No está conectado a la base de datos local')
      return
    }

    try {
      const rootDirectoryHandle = await navigator.storage.getDirectory()
      await rootDirectoryHandle.removeEntry(this.fileName)
      console.log('Base de datos eliminada')
      this.disconnect()
    } catch (error) {
      console.error('Error al eliminar la base de datos', error)
    }
  }

  public async createTables() {
    if (this.db === null) {
      console.error('No está conectado a la base de datos local')
      return
    }

    try {
      await this.db.sql`
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
}
