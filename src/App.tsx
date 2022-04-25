import './index.css'
import { LoadPokemonList } from './domain/usecases/load-pokemon-list'
import { LoadPokemonDetails } from './domain/usecases/load-pokemon-details'
import Card from './presentation/components/card/card'
import { usePokemons } from './presentation/hooks/use-pokemons'
import React from 'react'

type Props = {
  loadPokemonList: LoadPokemonList
  loadPokemonDetails: LoadPokemonDetails
}

const App: React.FC<Props> = ({
  loadPokemonList,
  loadPokemonDetails
}: Props) => {
  const [pokemons, lastCard] = usePokemons(loadPokemonList)

  return (
    <div className="App">
      {pokemons.map((poke, index) => {
        if (pokemons.length === index + 1) {
          return (
            <Card
              key={index + 1}
              loadPokemonDetails={loadPokemonDetails}
              pokemon={poke}
              lastCard={lastCard}
              index={index + 1}
            />
          )
        }
        return (
          <Card
            key={index + 1}
            loadPokemonDetails={loadPokemonDetails}
            pokemon={poke}
            index={index + 1}
          />
        )
      })}
    </div>
  )
}

export default App
