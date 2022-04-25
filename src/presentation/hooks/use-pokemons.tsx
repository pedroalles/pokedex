import { LoadPokemonList } from "../../domain/usecases/load-pokemon-list";
import { IPokemon } from "../../domain/models/pokemon";
import { useCallback,
  useEffect,
  useRef,
  useState } from "react";

export const usePokemons = (
  loadPokemonList: LoadPokemonList
): [ pokemons: IPokemon[], lastCard: any ] => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  const limit = 18;
  const [loading, setLoading] = useState(false);
  const [currUrl, setCurrUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  );
  const [nextUrl, setNextUrl] = useState(null);
  
  const observer = useRef<IntersectionObserver>();
  const lastCard = useCallback(
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

  return [pokemons, lastCard];
};
