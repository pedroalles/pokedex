import * as ReactDOMClient from 'react-dom/client'
import App from './App'
import './index.css'

import { AxiosHttpClient } from './infra/http-client/http-client'
import { RemoteLoadPokemonList } from './data/usecases/remote-load-pokemon-list'
import { RemoteLoadPokemonDetails } from './data/usecases/remote-load-pokemon-details'

const rootElement = document.getElementById('root')
const root = ReactDOMClient.createRoot(rootElement)

const loadPokemonList = new RemoteLoadPokemonList(new AxiosHttpClient())
const loadPokemonDetails = new RemoteLoadPokemonDetails(new AxiosHttpClient())

root.render(
  <App
    loadPokemonList={loadPokemonList}
    loadPokemonDetails={loadPokemonDetails}
  />
)
