import { SQLocalDrizzle } from 'sqlocal/drizzle'
import { drizzle, SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { NotConnected, ResourceAlreadyExists } from '../errors/db'

const DEFAULT_FILE_NAME = 'pokemondb.sqlite'

export class ClientDbService {
  private db: SQLocalDrizzle | null = null
  private orm: SqliteRemoteDatabase | null = null

  constructor(private fileName: string = DEFAULT_FILE_NAME) {}

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

  public async createTables(): Promise<String | Error> {
    if (this.db === null) {
      console.error('No está conectado a la base de datos local')
      return new NotConnected('No está conectado a la base de datos local')
    }

    try {
      await this.makeQuery()
      console.log('Tablas creadas')
      return 'Tablas creadas con exito'
    } catch (error: any) {
      console.error('Error al crear tablas', error)
      if (String(error).includes('already exists')) {
        return new ResourceAlreadyExists('La tabla ya existe')
      }
      return new Error(String(error))
    }
  }

  public async makeQuery() {
    if (this.db === null) {
      return
    }
    await this.db.sql`
      CREATE TABLE POKEMON (
        id integer PRIMARY KEY NOT NULL,
        name text NOT NULL,
        sprite text
      )
    `
    await this.db.sql`
      CREATE TABLE TYPE (
        id integer PRIMARY KEY NOT NULL,
        name text NOT NULL
      )
    `
    await this.db.sql`
      CREATE TABLE ABILITY (
        id integer PRIMARY KEY NOT NULL,
        name text NOT NULL,
        effect text
      )
    `
    await this.db.sql`
      CREATE TABLE ORIGIN_TYPE (
        pokemon_id integer NOT NULL,
        type_id integer NOT NULL,
        PRIMARY KEY(pokemon_id, type_id),
        FOREIGN KEY (pokemon_id) REFERENCES POKEMON(id) ON UPDATE cascade ON DELETE cascade,
        FOREIGN KEY (type_id) REFERENCES TYPE(id) ON UPDATE cascade ON DELETE cascade
      )
    `
    await this.db.sql`
      CREATE TABLE ORIGIN_ABILITY (
        pokemon_id integer NOT NULL,
        ability_id integer NOT NULL,
        PRIMARY KEY(pokemon_id, ability_id),
        FOREIGN KEY (pokemon_id) REFERENCES POKEMON(id) ON UPDATE cascade ON DELETE cascade,
        FOREIGN KEY (ability_id) REFERENCES ABILITY(id) ON UPDATE cascade ON DELETE cascade
      )
    `
    await this.db.sql`
      CREATE TABLE MOVEMENT (
        id integer PRIMARY KEY NOT NULL,
        name text NOT NULL,
        type_id integer NOT NULL,
        FOREIGN KEY (type_id) REFERENCES TYPE(id) ON UPDATE cascade ON DELETE cascade
      )
    `
    await this.db.sql`
      CREATE UNIQUE INDEX POKEMON_name_unique ON POKEMON (name)
    `
    await this.db.sql`
      CREATE UNIQUE INDEX TYPE_name_unique ON TYPE (name)
    `
    await this.db.sql`
      CREATE UNIQUE INDEX ABILITY_name_unique ON ABILITY (name)
    `
    await this.db.sql`
      CREATE UNIQUE INDEX MOVEMENT_name_unique ON MOVEMENT (name)
    `
  }
}
