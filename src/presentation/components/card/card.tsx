import { CardContainer } from './card.style'
import { IPokemon } from '../../../domain/models/pokemon'

type Props = {
  pokemon: IPokemon
  loadTrigger?: (node: Element) => void
  onClick: () => void
}

const Card: React.FC<Props> = ({ pokemon, loadTrigger, onClick }: Props) => {
  return (
    <CardContainer
      ref={loadTrigger}
      onClick={onClick}
      types={pokemon.details.types}
    >
      <p className="index">{pokemon.details.id.toString().padStart(3, '0')}</p>
      <img
        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.details.id
          .toString()
          .padStart(3, '0')}.png`}
        alt=""
      />
      <p className="name">{pokemon.name}</p>
    </CardContainer>
  )
}

export default Card
