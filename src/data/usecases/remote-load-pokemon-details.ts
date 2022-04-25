import { HttpClient, HttpStatusCode } from '../../infra/http-client/http-client'
import { IPokemonDetails } from '../../domain/models/pokemon'
import { LoadPokemonDetails } from '../../domain/usecases/load-pokemon-details'

interface Details {
  types: { type: { name: string } }[]
}

export class RemoteLoadPokemonDetails implements LoadPokemonDetails {
  httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async load(url: string): Promise<IPokemonDetails> {
    const httpResponse = await this.httpClient.request({
      url,
      method: 'get'
    })
    const remotePokeDetails: Details = httpResponse.body || []

    switch (httpResponse.statusCode) {
      case HttpStatusCode.Ok:
        return {
          types: remotePokeDetails.types.map((el) => el.type.name)
        }
      default:
        return
    }
  }
}
