import { useEffect, useState } from "react";
import { LoadPokemonDetails } from "../../../domain/usecases/load-pokemon-details";
import "./card.style.css";
import { IPokemon, IPokemonDetails } from "../../../domain/models/pokemon";

type Props = {
  pokemon: IPokemon;
  loadPokemonDetails: LoadPokemonDetails;
  lastElement?: any;
  index: number;
};

const Card: React.FC<Props> = ({
  loadPokemonDetails,
  pokemon,
  lastElement,
  index
}: Props) => {
  const [pokeDetails, setPokeDetails] = useState<IPokemonDetails>(null);
  useEffect(() => {
    loadPokemonDetails.load(pokemon.url).then(setPokeDetails);
  }, [loadPokemonDetails, pokemon.url]);
  return (
    pokeDetails && (
      <div
        // key={pokemon.name}
        className={`${pokeDetails.types[0]}${
          pokeDetails.types[1] ? "-" + pokeDetails.types[1] : ""
        } card`}
        ref={lastElement}
      >
        <p className="tag">{index.toString().padStart(3, "0")}</p>
        <img
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${index
            .toString()
            .padStart(3, "0")}.png`}
          alt=""
        />
        <p className="name">{pokemon.name}</p>
        {/* {pokeDetails && (
          <div>
            <h5>Types</h5>
            {pokeDetails.types.map((type) => (
              <h6>{type}</h6>
            ))}
          </div>
        )} */}
      </div>
    )
  );
};

export default Card;
