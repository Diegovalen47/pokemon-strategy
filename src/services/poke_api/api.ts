import { envs } from '@/config'
import axios from 'axios'

export const pokeApi = axios.create({
  baseURL: envs.VITE_POKE_API_URL
})
