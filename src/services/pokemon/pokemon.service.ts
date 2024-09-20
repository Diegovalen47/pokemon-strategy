import type { PokemonOrmService } from '../orm'

import { type PokemonRepository } from '@/repositories/pokeapi'
import { getIdFromUrl } from '@/utils/pokeapi'

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

  async setPokemonExtraData(): Promise<void> {
    try {
      const pokemonList = await this.pokemonOrmService.getAllPokemon()

      const batchSize = 100

      for (let i = 0; i < pokemonList.length; i += batchSize) {
        const batch = pokemonList.slice(i, i + batchSize)

        const pokemonDetailsList = await Promise.all(
          batch.map((pokemon) =>
            this.pokemonRepository.getPokemonByNameOrId(pokemon.id)
          )
        )

        for (const pokemonDetails of pokemonDetailsList) {
          await this.pokemonOrmService.updatePokemonSprite({
            sprite: pokemonDetails.sprites.front_default,
            id: pokemonDetails.id
          })

          for (const ability of pokemonDetails.abilities) {
            const abilityId = getIdFromUrl(ability.ability.url)
            console.log(
              'insertOriginAbility',
              'abilityId',
              abilityId,
              'pokemonId',
              pokemonDetails.id,
              'slot',
              ability.slot
            )
            await this.pokemonOrmService.insertOriginAbility({
              pokemonId: pokemonDetails.id,
              abilityId,
              slot: ability.slot
            })
          }

          for (const type of pokemonDetails.types) {
            const typeId = getIdFromUrl(type.type.url)
            await this.pokemonOrmService.insertOriginType({
              pokemonId: pokemonDetails.id,
              typeId,
              slot: type.slot
            })
          }
        }
      }
    } catch (error) {
      console.error('Error al actualizar datos extra pokemon', error)
    }
  }
}
