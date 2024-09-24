import { PokemonLocal, PokemonRemote } from '../../domain'

import { getIdFromUrl } from '@/modules/shared/infrastructure'

export class PokemonMapper {
  public static fromJson(json: any): PokemonLocal {
    return new PokemonLocal({ id: getIdFromUrl(json.url), name: json.name })
  }

  public static fromDetailJson(json: any): PokemonRemote {
    return new PokemonRemote({
      id: json.id,
      sprite: json.sprites.front_default,
      abilities: json.abilities.map((ability: any) => ({
        id: getIdFromUrl(ability.ability.url),
        slot: ability.slot
      })),
      types: json.types.map((type: any) => ({
        id: getIdFromUrl(type.type.url),
        slot: type.slot
      }))
    })
  }
}
