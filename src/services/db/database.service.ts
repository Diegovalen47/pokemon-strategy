import { SQLocalDrizzle } from 'sqlocal/drizzle'

import { ResourceAlreadyExists } from '@/errors/db'

export type DatabaseClient = Omit<SQLocalDrizzle, 'driver' | 'batchDriver'>

export class DatabaseService {
  constructor(
    public client: DatabaseClient,
    public fileName: string
  ) {}

  public async disconnect() {
    try {
      await this.client.destroy()
      console.log('Desconectado de la base de datos local')
    } catch (error) {
      console.error('Error al desconectarse de la base de datos', error)
    }
  }

  public async deleteDatabase() {
    if (this.client === null) {
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
    try {
      await this.makeQuery()
      console.log('Tablas creadas')
      return 'Tablas creadas con exito'
    } catch (error: any) {
      console.warn('Error al crear tablas', error)
      if (String(error).includes('already exists')) {
        return new ResourceAlreadyExists('La tabla ya existe')
      }
      return new Error(String(error))
    }
  }

  private async makeQuery() {
    await this.client.sql`
      CREATE TABLE POKEMON (
        id integer PRIMARY KEY NOT NULL,
        name text NOT NULL,
        sprite text
      )
    `
    await this.client.sql`
      CREATE TABLE TYPE (
        id integer PRIMARY KEY NOT NULL,
        name text NOT NULL
      )
    `
    await this.client.sql`
      CREATE TABLE ABILITY (
        id integer PRIMARY KEY NOT NULL,
        name text NOT NULL,
        effect text
      )
    `
    await this.client.sql`
      CREATE TABLE ORIGIN_TYPE (
        pokemon_id integer NOT NULL,
        type_id integer NOT NULL,
        PRIMARY KEY(pokemon_id, type_id),
        FOREIGN KEY (pokemon_id) REFERENCES POKEMON(id) ON UPDATE cascade ON DELETE cascade,
        FOREIGN KEY (type_id) REFERENCES TYPE(id) ON UPDATE cascade ON DELETE cascade
      )
    `
    await this.client.sql`
      CREATE TABLE ORIGIN_ABILITY (
        pokemon_id integer NOT NULL,
        ability_id integer NOT NULL,
        PRIMARY KEY(pokemon_id, ability_id),
        FOREIGN KEY (pokemon_id) REFERENCES POKEMON(id) ON UPDATE cascade ON DELETE cascade,
        FOREIGN KEY (ability_id) REFERENCES ABILITY(id) ON UPDATE cascade ON DELETE cascade
      )
    `
    await this.client.sql`
      CREATE TABLE MOVEMENT (
        id integer PRIMARY KEY NOT NULL,
        name text NOT NULL,
        type_id integer NOT NULL,
        FOREIGN KEY (type_id) REFERENCES TYPE(id) ON UPDATE cascade ON DELETE cascade
      )
    `
    await this.client.sql`
      CREATE UNIQUE INDEX POKEMON_name_unique ON POKEMON (name)
    `
    await this.client.sql`
      CREATE UNIQUE INDEX TYPE_name_unique ON TYPE (name)
    `
    await this.client.sql`
      CREATE UNIQUE INDEX ABILITY_name_unique ON ABILITY (name)
    `
    await this.client.sql`
      CREATE UNIQUE INDEX MOVEMENT_name_unique ON MOVEMENT (name)
    `
  }
}
