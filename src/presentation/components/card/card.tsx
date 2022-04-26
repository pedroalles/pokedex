import { CardContainer } from './card.style'
import { IPokemon } from '../../../domain/models/pokemon'

type Props = {
  pokemon: IPokemon
  index: number
  loadTrigger?: any
}

const Card: React.FC<Props> = ({ pokemon, loadTrigger, index }: Props) => {
  return (
    <CardContainer ref={loadTrigger} types={pokemon.details.types}>
      <p className="index">{index.toString().padStart(3, '0')}</p>
      <img
        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${index
          .toString()
          .padStart(3, '0')}.png`}
        alt=""
      />
      <p className="name">{pokemon.name}</p>
    </CardContainer>
  )
}

export default Card
