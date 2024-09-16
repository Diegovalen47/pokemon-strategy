import type { PokemonOrmService } from '../orm/pokemon-orm.service'

import { type PokemonRepository } from '@/repositories/pokeapi'

export class PokemonService {
  constructor(
    private pokeApiRepository: PokemonRepository,
    private pokemonOrmService: PokemonOrmService
  ) {}

  async getAllPokemonAndSaveInDb(): Promise<void> {
    let { next, pokemon } = await this.pokeApiRepository.getPokemonFirstList()

    while (next) {
      await this.pokemonOrmService.insertPokemon(pokemon)
      const response = await this.pokeApiRepository.getPokemonNextList(next)
      next = response.next
      pokemon = response.pokemon
    }

    await this.pokemonOrmService.insertPokemon(pokemon)
  }
}
