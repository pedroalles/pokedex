import { useEffect, useState } from "react";
import { IPokemon, IPokemonDetails } from "../../../App";
import { LoadPokemonDetails } from "../../../domain/usecases/load-pokemon-details";
import "./card.style.css";

type Props = {
  pokemon: IPokemon;
  loadPokemonDetails: LoadPokemonDetails;
};

const Card: React.FC<Props> = ({ loadPokemonDetails, pokemon }: Props) => {
  const [pokeDetails, setPokeDetails] = useState<IPokemonDetails>(null);
  useEffect(() => {
    loadPokemonDetails.load(pokemon.url).then(setPokeDetails);
  }, [loadPokemonDetails, pokemon.url]);
  return (
    pokeDetails && (
      <div key={pokemon.name} className={pokeDetails.types[0]}>
        <h3>{pokemon.name}</h3>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt=""
        />
        {pokeDetails && (
          <div>
            <h5>Types</h5>
            {pokeDetails.types.map((type) => (
              <h6>{type}</h6>
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default Card;
