import type { PokemonOrmService } from '../orm/pokemon-orm.service'

import { type PokeApiRepository } from '@/repositories/pokeapi'

export class PokemonService {
  constructor(
    private pokeApiRepository: PokeApiRepository,
    private ormService: PokemonOrmService
  ) {}

  async getAllPokemonAndSaveInDb(): Promise<void> {
    let { next, pokemon } = await this.pokeApiRepository.getPokemonFirstList()

    while (next) {
      await this.ormService.insertPokemon(pokemon)
      const response = await this.pokeApiRepository.getPokemonNextList(next)
      next = response.next
      pokemon = response.pokemon
    }

    await this.ormService.insertPokemon(pokemon)
  }
}
