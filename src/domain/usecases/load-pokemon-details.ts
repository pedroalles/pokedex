import { IPokemonDetails } from "../../App";

export interface LoadPokemonDetails {
  load(url: string): Promise<IPokemonDetails>;
}
