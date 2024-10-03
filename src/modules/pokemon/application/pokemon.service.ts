import type { PokemonLocal, PokemonLocalRepository, PokemonRemoteRepository } from '../domain'
import type { InsertOriginAbilityDto, InsertOriginTypeDto } from '../domain/dtos'

export class PokemonService {
  constructor(
    private pokemonRemoteRepository: PokemonRemoteRepository,
    private pokemonLocalRepository: PokemonLocalRepository
  ) {}

  async getAllPokemonAndSaveInDb(): Promise<void> {
    let { next, pokemon } = await this.pokemonRemoteRepository.getPokemonFirstList()

    while (next) {
      await this.pokemonLocalRepository.insertPokemon(pokemon)
      const response = await this.pokemonRemoteRepository.getPokemonNextList(next)
      next = response.next
      pokemon = response.pokemon
    }

    await this.pokemonLocalRepository.insertPokemon(pokemon)
  }

  async setPokemonExtraData(): Promise<void> {
    try {
      const pokemonList = await this.pokemonLocalRepository.getAllPokemon()

      await this.deleteAllPokemonLocal()

      const batchSize = 200

      for (let i = 0; i < pokemonList.length; i += batchSize) {
        const batch = pokemonList.slice(i, i + batchSize)

        const pokemonDetailsList = await Promise.all(
          batch.map((pokemon) => this.pokemonRemoteRepository.getPokemonByNameOrId(pokemon.id))
        )

        const insertPokemons: PokemonLocal[] = []
        const insertOriginAbilities: InsertOriginAbilityDto[] = []
        const insertOriginTypes: InsertOriginTypeDto[] = []

        for (const pokemonDetails of pokemonDetailsList) {
          insertPokemons.push({
            name: pokemonDetails.name,
            sprite: pokemonDetails.sprite,
            id: pokemonDetails.id
          })

          for (const ability of pokemonDetails.abilities) {
            insertOriginAbilities.push({
              pokemonId: pokemonDetails.id,
              abilityId: ability.id,
              slot: ability.slot
            })
          }

          for (const type of pokemonDetails.types) {
            insertOriginTypes.push({
              pokemonId: pokemonDetails.id,
              typeId: type.id,
              slot: type.slot
            })
          }
        }

        await Promise.all([
          this.pokemonLocalRepository.insertPokemon(insertPokemons),
          this.pokemonLocalRepository.insertOriginAbility(insertOriginAbilities),
          this.pokemonLocalRepository.insertOriginType(insertOriginTypes)
        ])
      }
    } catch (error) {
      console.error('Error al actualizar datos extra pokemon', error)
    }
  }

  async getPokemonLocalCount() {
    return await this.pokemonLocalRepository.getPokemonCount()
  }

  async getPokemonByName(name: string): Promise<PokemonLocal> {
    return await this.pokemonLocalRepository.getPokemonByName(name)
  }

  async getAllPokemonLocal() {
    return await this.pokemonLocalRepository.getAllPokemon()
  }

  async deleteAllPokemonLocal() {
    return await this.pokemonLocalRepository.deleteAllPokemon()
  }

  async getOriginAbilitiesLocalCount() {
    return await this.pokemonLocalRepository.getOriginAbilitiesCount()
  }

  async getOriginTypesLocalCount() {
    return await this.pokemonLocalRepository.getOriginTypesCount()
  }

  async searchPokemonByLikeName(query: string) {
    return this.pokemonLocalRepository.searchPokemonByLikeName(query)
  }

  /**
   * Obtiene la cantidad de pokemon en remoto y en local,
   * para saber si utiliza o no los que ya tiene en cache.
   * @return true si tiene que obtener de remoto, en otro caso
   * false ya que usara cache.
   */
  async hasToRefreshData() {
    const pokemonCountRemote = await this.pokemonRemoteRepository.getPokemonCount()
    const pokemonCountLocal = await this.pokemonLocalRepository.getPokemonCount()

    if (pokemonCountRemote > pokemonCountLocal) {
      return true
    }

    return false
  }
}
