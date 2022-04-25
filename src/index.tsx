// import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./App";
import { AxiosHttpClient } from "./infra/http-client/http-client";

import { RemoteLoadPokemonList } from "./data/usecases/remote-load-pokemon-list";
import { RemoteLoadPokemonDetails } from "./data/usecases/remote-load-pokemon-details";

import { PokemonsContextProvider } from "./presentation/contexts/pokemons";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

// const url = "https://pokeapi.co/api/v2/pokemon?limit=6&offset=0";

const loadPokemonList = new RemoteLoadPokemonList(new AxiosHttpClient());
const loadPokemonDetails = new RemoteLoadPokemonDetails(new AxiosHttpClient());

root.render(
  // <StrictMode>
  <PokemonsContextProvider>
    <App
      loadPokemonList={loadPokemonList}
      loadPokemonDetails={loadPokemonDetails}
    />
  </PokemonsContextProvider>
  // </StrictMode>
);
