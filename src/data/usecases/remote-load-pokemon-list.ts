import {
  HttpClient,
  HttpStatusCode
} from "../../infra/http-client/http-client";
import { IPokemon } from "../../domain/models/pokemon";
import { LoadPokemonList } from "../../domain/usecases/load-pokemon-list";

export class RemoteLoadPokemonList implements LoadPokemonList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async load(url?: string): Promise<IPokemon[]> {
    const httpResponse = await this.httpClient.request({
      url: url || this.url,
      method: "get"
    });
    const remotePokemons = httpResponse.body || [];
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remotePokemons.results.map((el: IPokemon, index: number) => ({
          id: index + 1,
          ...el
        }));
      default:
        return [];
    }
  }
}
