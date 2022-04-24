import { IPokemon } from "../../App";

export interface LoadPokemonList {
  loadAll(url?: string): Promise<IPokemon[]>;
}
