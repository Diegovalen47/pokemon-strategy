import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokemon',
      name: 'pokemon',
      component: HomeView
    },
    {
      path: '/movement',
      name: 'movement',
      component: HomeView
    },
    {
      path: '/pokemon/:name',
      name: 'pokemon-detail',
      component: () => import('../views/PokemonView.vue')
    },
    {
      path: '/movement/:name',
      name: 'movement-detail',
      component: () => import('../views/MovementPokemonView.vue')
    }
  ]
})

export default router
