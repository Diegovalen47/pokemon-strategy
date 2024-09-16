import type { OrmService } from '../db/orm.service'

import type PokeApiRepository from '@/repositories/pokeapi/poke-api.repository'

export class PokemonService {
  constructor(
    private pokeApiRepository: PokeApiRepository,
    private ormService: OrmService
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
