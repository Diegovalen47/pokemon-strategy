import type { PokemonLocalRepository, PokemonRemoteRepository } from '../domain'

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

      const batchSize = 100

      for (let i = 0; i < pokemonList.length; i += batchSize) {
        const batch = pokemonList.slice(i, i + batchSize)

        const pokemonDetailsList = await Promise.all(
          batch.map((pokemon) => this.pokemonRemoteRepository.getPokemonByNameOrId(pokemon.id))
        )

        for (const pokemonDetails of pokemonDetailsList) {
          await this.pokemonLocalRepository.updatePokemonSprite({
            sprite: pokemonDetails.sprite,
            id: pokemonDetails.id
          })

          for (const ability of pokemonDetails.abilities) {
            const abilityId = ability.id
            await this.pokemonLocalRepository.insertOriginAbility({
              pokemonId: pokemonDetails.id,
              abilityId,
              slot: ability.slot
            })
          }

          for (const type of pokemonDetails.types) {
            const typeId = type.id
            await this.pokemonLocalRepository.insertOriginType({
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

  async getPokemonLocalCount() {
    return await this.pokemonLocalRepository.getPokemonCount()
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
