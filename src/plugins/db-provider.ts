import { LOCAL_DATABASE_SERVICE } from '@/config'
import LocalDatabaseService from '@/services/local-database-service'

export default {
  install: (app: any) => {
    const databaseService = new LocalDatabaseService()
    databaseService.connect()

    app.provide(LOCAL_DATABASE_SERVICE, databaseService)
  }
}
