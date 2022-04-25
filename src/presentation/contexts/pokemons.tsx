import { createContext, ReactNode, useState } from "react";
import { IPokemon } from "../../domain/models/pokemon";

type PokemonsContextProps = {
  children: ReactNode;
};

type PokemonsContextType = {
  pokemons: IPokemon[];
  setPokemons: React.Dispatch<React.SetStateAction<IPokemon[]>>;
};

export const PokemonsContext = createContext<PokemonsContextType>({
  pokemons: [],
  setPokemons: () => {}
});

export const PokemonsContextProvider = ({ children }: PokemonsContextProps) => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  return (
    <PokemonsContext.Provider value={{ pokemons, setPokemons }}>
      {children}
    </PokemonsContext.Provider>
  );
};
