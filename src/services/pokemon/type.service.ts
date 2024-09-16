import type { TypeOrmService } from '../orm'

import type { TypeRepository } from '@/repositories/pokeapi'

export class TypeService {
  constructor(
    private typeRepository: TypeRepository,
    private typeOrmService: TypeOrmService
  ) {}

  async getAllTypesAndSaveInDb(): Promise<void> {
    let { next, types } = await this.typeRepository.getTypesFirstList()

    while (next) {
      await this.typeOrmService.insertType(types)
      const response = await this.typeRepository.getTypesNextList(next)
      next = response.next
      types = response.types
    }

    await this.typeOrmService.insertType(types)
  }
}
