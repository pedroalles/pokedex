import { LoadPokemonList } from '../../domain/usecases/load-pokemon-list'
import { LoadPokemonDetails } from '../../domain/usecases/load-pokemon-details'
import { IPokemon } from '../../domain/models/pokemon'
import { useCallback, useEffect, useRef, useState } from 'react'

type hookParams = {
  loadPokemonList: LoadPokemonList
  loadPokemonDetails: LoadPokemonDetails
}
type hookResponse = [pokemons: IPokemon[], loadTrigger: (node: Element) => void]

export const usePokemons = ({
  loadPokemonList,
  loadPokemonDetails
}: hookParams): hookResponse => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([])

  const [loading, setLoading] = useState(false)
  const limit = 21
  const [currUrl, setCurrUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  )
  const [nextUrl, setNextUrl] = useState(null)

  const observer = useRef<IntersectionObserver>()

  const loadTrigger = useCallback(
    (node: Element) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setCurrUrl(nextUrl)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, nextUrl]
  )

  useEffect(() => {
    setLoading(true)
    loadPokemonList.load(currUrl).then(async (res) => {
      const pokemonsWithDetails = await Promise.all(
        res.pokemons.map(async (poke: IPokemon) => {
          return loadPokemonDetails.load(poke.url).then((res) => ({
            ...poke,
            details: { ...res }
          }))
        })
      )
      setPokemons((prevState) => [...prevState, ...pokemonsWithDetails])
      setNextUrl(res.next)
      setLoading(false)
    })
  }, [currUrl, loadPokemonList, loadPokemonDetails, setPokemons])

  return [pokemons, loadTrigger]
}
