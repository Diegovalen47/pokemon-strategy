import { DATABASE_SERVICE_INJECT_TOKEN } from '@/config'
import { InitializeDataService } from '@/services/core'

export default {
  install: async (app: any) => {
    console.log('Instalando plugin de base de datos')
    const { ormService } = await InitializeDataService.initializeData()
    app.provide(DATABASE_SERVICE_INJECT_TOKEN, ormService)
  }
}
