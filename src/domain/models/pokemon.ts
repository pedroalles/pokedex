export interface IPokemon {
  name: string
  url: string
  details: IPokemonDetails
}

export interface IPokemonDetails {
  id: string
  types: string[]
}
