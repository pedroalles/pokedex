import "./styles.css";
import { LoadPokemonList } from "./domain/usecases/load-pokemon-list";
import { useEffect, useState } from "react";
import { LoadPokemonDetails } from "./domain/usecases/load-pokemon-details";
import Card from "./presentation/components/card/card";
import { IPokemon } from "./domain/models/pokemon";

type Props = {
  loadPokemonList: LoadPokemonList;
  loadPokemonDetails: LoadPokemonDetails;
};

const App: React.FC<Props> = ({
  loadPokemonList,
  loadPokemonDetails
}: Props) => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  useEffect(() => {
    loadPokemonList.load().then(setPokemons);
  }, [loadPokemonList]);

  return (
    <div className="App">
      {pokemons?.map((poke) => (
        <Card loadPokemonDetails={loadPokemonDetails} pokemon={poke} />
      ))}
    </div>
  );
};

export default App;
