import "./styles.css";
import { LoadPokemonList } from "./domain/usecases/load-pokemon-list";
import { useEffect, useState } from "react";
import { LoadPokemonDetails } from "./domain/usecases/load-pokemon-details";
import Card from "./presentation/components/card/card";

export interface IPokemon {
  id: number;
  name: string;
  url: string;
}

export interface IPokemonDetails {
  types: string[];
}

type Props = {
  loadPokemonList: LoadPokemonList;
  loadPokemonDetails: LoadPokemonDetails;
};

const App: React.FC<Props> = ({
  loadPokemonList,
  loadPokemonDetails
}: Props) => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  // const [pokeDetails, setPokeDetails] = useState([]);
  useEffect(() => {
    loadPokemonList.loadAll().then(setPokemons);
  }, [loadPokemonList]);
  return (
    <div className="App">
      {pokemons?.map((poke, index) => (
        <>
          <Card loadPokemonDetails={loadPokemonDetails} pokemon={poke} />
          {/* <div key={poke.name}>
            <h3>{poke.name}</h3>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`}
              alt=""
            />
          </div> */}
        </>
      ))}
    </div>
  );
};

export default App;
