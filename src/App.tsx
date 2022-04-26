import './App.css'
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
  const [pokemons, lastCard] = usePokemons({
    loadPokemonList,
    loadPokemonDetails
  })

  const triggerPosition = pokemons.length - 3

  return (
    <div className="App">
      {pokemons.map((pokemon, index) => {
        if (index + 1 === triggerPosition) {
          return (
            <Card
              key={index + 1}
              pokemon={pokemon}
              index={index + 1}
              loadTrigger={lastCard}
            />
          )
        }
        return <Card key={index + 1} pokemon={pokemon} index={index + 1} />
      })}
    </div>
  )
}

export default App
