import type { PokemonOrmService } from '../orm'

import { type PokemonRepository } from '@/repositories/pokeapi'

export class PokemonService {
  constructor(
    private pokemonRepository: PokemonRepository,
    private pokemonOrmService: PokemonOrmService
  ) {}

  async getAllPokemonAndSaveInDb(): Promise<void> {
    let { next, pokemon } = await this.pokemonRepository.getPokemonFirstList()

    while (next) {
      await this.pokemonOrmService.insertPokemon(pokemon)
      const response = await this.pokemonRepository.getPokemonNextList(next)
      next = response.next
      pokemon = response.pokemon
    }

    await this.pokemonOrmService.insertPokemon(pokemon)
  }
}
