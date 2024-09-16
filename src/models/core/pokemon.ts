export default class Pokemon {
  constructor(
    public id: number,
    public name: string,
    public sprite: string | null
  ) {
    this.id = id
    this.name = name
    this.sprite = sprite
  }

  public static fromJson(json: any): Pokemon {
    return new Pokemon(this.getIdFromUrl(json.url), json.name, null)
  }

  private static getIdFromUrl(url: string): number {
    const urlParts = url.split('/')
    return Number(urlParts[urlParts.length - 2])
  }
}
