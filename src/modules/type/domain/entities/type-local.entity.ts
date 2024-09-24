type TypeConstructor = { id: number; name: string }

export class TypeLocal {
  public id: number
  public name: string

  constructor({ id, name }: TypeConstructor) {
    this.id = id
    this.name = name
  }
}
