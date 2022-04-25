import { CardContainer } from "./card.style";
import { LoadPokemonDetails } from "../../../domain/usecases/load-pokemon-details";
import "./card.style.css";
import { IPokemon, IPokemonDetails } from "../../../domain/models/pokemon";
import { useEffect, useState } from "react";

type Props = {
  pokemon: IPokemon;
  loadPokemonDetails: LoadPokemonDetails;
  lastCard?: any;
  index: number;
};

const Card: React.FC<Props> = ({
  loadPokemonDetails,
  pokemon,
  lastCard,
  index
}: Props) => {
  const [pokeDetails, setPokeDetails] = useState<IPokemonDetails>(null);

  useEffect(() => {
    loadPokemonDetails.load(pokemon.url).then(setPokeDetails);
  }, [loadPokemonDetails, pokemon.url]);

  return (
    pokeDetails && (
      <CardContainer ref={lastCard} types={pokeDetails.types}>
        <p className="tag">{index.toString().padStart(3, "0")}</p>
        <img
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${index
            .toString()
            .padStart(3, "0")}.png`}
          alt=""
        />
        <p className="name">{pokemon.name}</p>
      </CardContainer>
    )
  );
};

export default Card;
