import { TypeLocal, TypeRemote } from '../../domain'

import { getIdFromUrl } from '@/modules/shared/infrastructure'

export class TypeMapper {
  public static fromJson(json: any): TypeLocal {
    return new TypeLocal({ id: getIdFromUrl(json.url), name: json.name })
  }

  public static fromDetailJson(json: any): TypeRemote {
    return new TypeRemote({
      id: json.id,
      damageRelations: {
        doubleDamageTo: json.damage_relations.double_damage_to.map((relation: any) => ({
          destinyTypeId: getIdFromUrl(relation.url)
        })),
        halfDamageTo: json.damage_relations.half_damage_to.map((relation: any) => ({
          destinyTypeId: getIdFromUrl(relation.url)
        })),
        noDamageTo: json.damage_relations.no_damage_to.map((relation: any) => ({
          destinyTypeId: getIdFromUrl(relation.url)
        }))
      }
    })
  }
}
