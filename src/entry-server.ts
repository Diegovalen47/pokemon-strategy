import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

/**
 * initiate the Vue App for a server-side application,
 * we use renderToString to render the app to HTML
 */

export const render = async (url: any) => {
  const { app, router } = createApp()
  await router.push(url)
  await router.isReady()

  const html = await renderToString(app)

  return {
    html
  }
}
