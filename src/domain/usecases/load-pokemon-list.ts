import { IPokemon } from "../models/pokemon";

export type RemoteLoadPokemonListResult = {
  next: string;
  pokemons: IPokemon[];
};

export interface LoadPokemonList {
  load(url: string): Promise<RemoteLoadPokemonListResult>;
}
