import { HttpClient, HttpStatusCode } from '../../infra/http-client/http-client'
import { IPokemon } from '../../domain/models/pokemon'
import {
  LoadPokemonList,
  RemoteLoadPokemonListResult
} from '../../domain/usecases/load-pokemon-list'

export class RemoteLoadPokemonList implements LoadPokemonList {
  httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async load(url?: string): Promise<RemoteLoadPokemonListResult> {
    const httpResponse = await this.httpClient.request({
      url: url,
      method: 'get'
    })
    const remotePokemons = httpResponse.body || []

    switch (httpResponse.statusCode) {
      case HttpStatusCode.Ok:
        return {
          next: remotePokemons.next,
          pokemons: remotePokemons.results.map((el: IPokemon) => ({
            ...el
          }))
        }
      default:
        return null
    }
  }
}
