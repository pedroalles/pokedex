import {
  HttpClient,
  HttpStatusCode
} from "../../infra/http-client/http-client";
import { IPokemonDetails } from "../../App";
import { LoadPokemonDetails } from "../../domain/usecases/load-pokemon-details";

interface Details {
  types: { type: { name: string } }[];
}

export class RemoteLoadPokemonDetails implements LoadPokemonDetails {
  constructor(private readonly httpClient: HttpClient) {}

  async load(url: string): Promise<IPokemonDetails> {
    const httpResponse = await this.httpClient.request({
      url,
      method: "get"
    });
    const remotePokeDetails: Details = httpResponse.body || [];
    console.log(remotePokeDetails);

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return {
          types: remotePokeDetails.types.map((el) => el.type.name)
        };
      default:
        return;
    }
  }
}
