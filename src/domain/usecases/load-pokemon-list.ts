import { IPokemon } from "../models/pokemon";

export interface LoadPokemonList {
  load(url?: string): Promise<IPokemon[]>;
}
