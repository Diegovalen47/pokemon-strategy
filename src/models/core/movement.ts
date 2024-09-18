import type { MovementDB } from '../db'

import { getIdFromUrl } from '@/utils/pokeapi'

type MovementConstructor = Partial<MovementDB> & { id: number; name: string }

export class Movement implements MovementDB {
  public id: number
  public name: string
  public effect: string | null
  public damageClass: string | null
  public accuracy: number | null
  public power: number | null
  public pp: number | null
  public priority: number | null
  public typeId: number | null

  constructor({
    id,
    name,
    effect,
    damageClass,
    accuracy,
    power,
    pp,
    priority,
    typeId
  }: MovementConstructor) {
    this.id = id
    this.name = name ?? null
    this.effect = effect ?? null
    this.damageClass = damageClass ?? null
    this.accuracy = accuracy ?? null
    this.power = power ?? null
    this.pp = pp ?? null
    this.priority = priority ?? null
    this.typeId = typeId ?? null
  }

  public static fromJson(json: any): Movement {
    return new Movement({ id: getIdFromUrl(json.url), name: json.name })
  }

  public static fromDetailJson(json: any): Movement {
    return new Movement({
      id: json.id,
      name: json.name,
      effect: this.searchLanguageEffect(json),
      damageClass: json.damage_class.name,
      accuracy: json.accuracy,
      power: json.power,
      pp: json.pp,
      priority: json.priority,
      typeId: getIdFromUrl(json.type.url)
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
