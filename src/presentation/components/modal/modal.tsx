import { IPokemon } from '../../../domain/models/pokemon'
import { ModalBackground, ModalContainer } from './modal.style'

type Props = {
  pokemon: IPokemon
  isOpen: boolean
  onClose: () => void
}

const Modal: React.FC<Props> = ({ pokemon, isOpen, onClose }: Props) => {
  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer types={pokemon.details.types}>
        {/* <button className="close" onClick={onClose}>
          Close
        </button> */}
        <h1 className="name">{pokemon.name}</h1>

        <img
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.details.id
            .toString()
            .padStart(3, '0')}.png`}
          alt=""
        />
      </ModalContainer>
    </ModalBackground>
  )
}
export default Modal
