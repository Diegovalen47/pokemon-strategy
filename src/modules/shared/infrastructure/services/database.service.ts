import { SQLocalDrizzle } from 'sqlocal/drizzle'

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
    try {
      const rootDirectoryHandle = await navigator.storage.getDirectory()
      await rootDirectoryHandle.removeEntry(this.fileName)
      console.log('Base de datos eliminada')
      this.disconnect()
    } catch (error) {
      console.error('Error al eliminar la base de datos', error)
    }
  }

  public async createTables(): Promise<void> {
    try {
      await this.makeQuery()
      console.log('Tablas creadas')
    } catch (error: any) {
      console.error('Error al crear tablas', error)
      throw new Error('Error al crear tablas')
    }
  }

  public async allTablesExists(): Promise<boolean> {
    try {
      for (const table of [
        'POKEMON',
        'TYPE',
        'ABILITY',
        'ORIGIN_TYPE',
        'ORIGIN_ABILITY',
        'DAMAGE_RELATION',
        'MOVEMENT'
      ]) {
        if (!(await this.tableExists(table))) {
          console.log('No existe la tabla', table)
          return false
        }
      }
      console.log('Todas las tablas existen en cache')
      return true
    } catch (error) {
      console.error('Error al verificar si todas las tablas existen', error)
      throw new Error('Error al verificar si todas las tablas existen')
    }
  }

  public async tableExists(tableName: string): Promise<boolean> {
    try {
      const result = await this.client.sql`
        SELECT name
        FROM sqlite_master
        WHERE type='table' AND name=${tableName}
      `
      return result.length > 0
    } catch (error) {
      console.error('Error al verificar si la tabla existe', error)
      throw new Error('Error al verificar si la tabla existe')
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
        slot integer NOT NULL,
        pokemon_id integer NOT NULL,
        type_id integer NOT NULL,
        PRIMARY KEY(pokemon_id, type_id),
        FOREIGN KEY (pokemon_id) REFERENCES POKEMON(id) ON UPDATE cascade ON DELETE cascade,
        FOREIGN KEY (type_id) REFERENCES TYPE(id) ON UPDATE cascade ON DELETE cascade
      )
    `
    await this.client.sql`
      CREATE TABLE ORIGIN_ABILITY (
        slot integer NOT NULL,
        pokemon_id integer NOT NULL,
        ability_id integer NOT NULL,
        PRIMARY KEY(pokemon_id, ability_id),
        FOREIGN KEY (pokemon_id) REFERENCES POKEMON(id) ON UPDATE cascade ON DELETE cascade,
        FOREIGN KEY (ability_id) REFERENCES ABILITY(id) ON UPDATE cascade ON DELETE cascade
      )
    `
    await this.client.sql`
      CREATE TABLE DAMAGE_RELATION (
        id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        relation text DEFAULT 'normal_damage' NOT NULL,
        origin_type_id integer NOT NULL,
        destiny_type_id integer NOT NULL,
        FOREIGN KEY (origin_type_id) REFERENCES TYPE(id) ON UPDATE cascade ON DELETE cascade,
        FOREIGN KEY (destiny_type_id) REFERENCES TYPE(id) ON UPDATE cascade ON DELETE cascade
      )
    `
    await this.client.sql`
      CREATE TABLE MOVEMENT (
        id integer PRIMARY KEY NOT NULL,
        name text NOT NULL,
        effect text,
        damage_class text,
        accuracy integer,
        power integer,
        pp integer,
        priority integer,
        type_id integer,
        FOREIGN KEY (type_id) REFERENCES TYPE(id) ON UPDATE cascade ON DELETE set null
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
