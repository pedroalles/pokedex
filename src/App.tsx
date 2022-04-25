import "./styles.css";
import { LoadPokemonList } from "./domain/usecases/load-pokemon-list";
import { useEffect, useState, useCallback, useRef, useContext } from "react";
import { LoadPokemonDetails } from "./domain/usecases/load-pokemon-details";
import Card from "./presentation/components/card/card";
// import { IPokemon } from "./domain/models/pokemon";

import { PokemonsContext } from "./presentation/contexts/pokemons";

type Props = {
  loadPokemonList: LoadPokemonList;
  loadPokemonDetails: LoadPokemonDetails;
};

const App: React.FC<Props> = ({
  loadPokemonList,
  loadPokemonDetails
}: Props) => {
  const { pokemons, setPokemons } = useContext(PokemonsContext);

  const limit = 20;
  const [loading, setLoading] = useState(false);
  const [currUrl, setCurrUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  );
  const [nextUrl, setNextUrl] = useState(null);

  const observer = useRef<IntersectionObserver>();

  const lastElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setCurrUrl(nextUrl);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, nextUrl]
  );

  useEffect(() => {
    setLoading(true);
    loadPokemonList.load(currUrl).then((res) => {
      setPokemons((state) => [...state, ...res.pokemons]);
      setNextUrl(res.next);
      setLoading(false);
    });
  }, [currUrl, loadPokemonList, setPokemons]);

  return (
    <div className="App">
      {pokemons.map((poke, index) => {
        console.log(pokemons);

        if (pokemons.length === index + 1) {
          return (
            <Card
              key={index + 1}
              loadPokemonDetails={loadPokemonDetails}
              pokemon={poke}
              lastElement={lastElement}
              index={index + 1}
            />
          );
        }
        return (
          <Card
            key={index + 1}
            loadPokemonDetails={loadPokemonDetails}
            pokemon={poke}
            index={index + 1}
          />
        );
      })}
    </div>
  );
};

export default App;
