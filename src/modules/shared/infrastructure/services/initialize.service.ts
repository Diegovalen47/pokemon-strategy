import { drizzle, SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy'
import { SQLocalDrizzle } from 'sqlocal/drizzle'

import { DatabaseService } from './database.service'

const DEFAULT_FILE_NAME = 'pokemondb.sqlite'

export class InitializeLocalDbService {
  private filename: string
  public databaseService: DatabaseService
  public ormService: SqliteRemoteDatabase

  constructor(fileName?: string) {
    console.log('Hostia me construyeron InitializeLocalDbService')
    this.filename = fileName || DEFAULT_FILE_NAME
    // Creacion/Conexion a la base de datos local
    const { driver, batchDriver, ...db } = new SQLocalDrizzle(this.filename)

    // Separacion DB y ORM y guardamos para retornar al final
    const databaseService = new DatabaseService(db, this.filename)
    const ormService = drizzle(driver, batchDriver)

    this.databaseService = databaseService
    this.ormService = ormService
  }
}
