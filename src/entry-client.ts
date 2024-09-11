import './assets/index.css'

import { createApp } from '@/main'
import { LocalDatabaseService } from './services/db'

const { app, router } = createApp()

router.isReady().then(async () => {
  const databaseService = new LocalDatabaseService()

  await databaseService.connect()

  const rootDirectoryHandle = await navigator.storage.getDirectory()
  await rootDirectoryHandle.removeEntry('pokemondb.sqlite3')
  const fileHandle = await rootDirectoryHandle.getFileHandle(
    'pokemondb.sqlite3',
    { create: true }
  )

  databaseService.createTables()
  app.mount('#app')
})
