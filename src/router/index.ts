import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokemonView from '../views/PokemonView.vue'
import MovementPokemonView from '../views/MovementPokemonView.vue'

export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/pokemon',
        name: 'pokemon',
        component: PokemonView
      },
      {
        path: '/movement',
        name: 'movement',
        component: MovementPokemonView
      }
    ]
  })
}
