import { IPokemonDetails } from "../models/pokemon";

export interface LoadPokemonDetails {
  load(url: string): Promise<IPokemonDetails>;
}
