import type { AbilityDB } from '../db'

import { getIdFromUrl } from '@/utils/pokeapi'

type AbilityConstructor = Partial<AbilityDB> & { id: number; name: string }

export class Ability implements AbilityDB {
  public id: number
  public name: string
  public effect: string | null

  constructor({ id, name, effect }: AbilityConstructor) {
    this.id = id
    this.name = name ?? null
    this.effect = effect ?? null
  }

  public static fromJson(json: any): Ability {
    return new Ability({ id: getIdFromUrl(json.url), name: json.name })
  }

  public static fromDetailJson(json: any): Ability {
    return new Ability({
      id: json.id,
      name: json.name,
      effect: this.searchLanguageEffect(json)
    })
  }

  public static searchLanguageEffect(json: any, lan: string = 'en'): string {
    const effects = json.effect_entries

    if (effects.length !== 0) {
      const langEffect = effects.find(
        (effect: any) => effect.language.name === lan
      )

      if (langEffect) {
        return langEffect.effect as string
      }

      return effects[0].effect as string
    }

    if (json.flavor_text_entries.length !== 0) {
      const langEffect = json.flavor_text_entries.find(
        (effect: any) => effect.language.name === lan
      )

      if (langEffect) {
        return langEffect.flavor_text as string
      }

      return json.flavor_text_entries[0].flavor_text as string
    }

    return 'No effect'
  }
}
