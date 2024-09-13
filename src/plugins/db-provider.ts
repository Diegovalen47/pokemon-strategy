import { CLIENTE_DB_SERVICE_INJECT_TOKEN } from '@/config'
import { ClientDbService } from '@/services/db'
import { ref } from 'vue'

export default {
  install: (app: any) => {
    console.log('Instalando plugin de base de datos')
    const databaseService = ref(new ClientDbService())

    app.provide(CLIENTE_DB_SERVICE_INJECT_TOKEN, databaseService)
  }
}
