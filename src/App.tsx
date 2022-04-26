import './App.css'
import { LoadPokemonList } from './domain/usecases/load-pokemon-list'
import { LoadPokemonDetails } from './domain/usecases/load-pokemon-details'
import Card from './presentation/components/card/card'
import { usePokemons } from './presentation/hooks/use-pokemons'
import React, { useState } from 'react'
import Modal from './presentation/components/modal/modal'
import { IPokemon } from './domain/models/pokemon'

type Props = {
  loadPokemonList: LoadPokemonList
  loadPokemonDetails: LoadPokemonDetails
}

const App: React.FC<Props> = ({
  loadPokemonList,
  loadPokemonDetails
}: Props) => {
  const [pokemons, loadTrigger] = usePokemons({
    loadPokemonList,
    loadPokemonDetails
  })

  const [currPokemon, setCurrPokemon] = useState<IPokemon>(null)

  const triggerPosition = pokemons.length - 3

  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="App">
      {isOpen && (
        <Modal pokemon={currPokemon} onClose={toggleModal} isOpen={isOpen} />
      )}
      <div className="board">
        {pokemons.map((pokemon, index) => {
          if (index + 1 === triggerPosition) {
            return (
              <Card
                key={pokemon.details.id}
                pokemon={pokemon}
                onClick={() => {
                  setCurrPokemon(pokemon)
                  setIsOpen((prev) => !prev)
                }}
                loadTrigger={loadTrigger}
              />
            )
          }
          return (
            <Card
              key={pokemon.details.id}
              pokemon={pokemon}
              onClick={() => {
                setCurrPokemon(pokemon)
                setIsOpen((prev) => !prev)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
