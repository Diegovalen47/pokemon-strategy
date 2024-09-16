import axios from 'axios'

import { envs } from '@/config'

export const pokeApi = axios.create({
  baseURL: envs.VITE_POKE_API_URL
})
