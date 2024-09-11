import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

import { createRouter } from './router'
import App from './App.vue'

export const createApp = () => {
  /**
   * use createSSRApp to render the Vue App on the server
   * and send it to the user to do the hydration process
   */
  const app = createSSRApp(App)
  const router = createRouter()
  const pinia = createPinia()

  app.use(router)
  app.use(pinia)

  return {
    app,
    router,
    pinia
  }
}
