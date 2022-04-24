import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./App";
import { AxiosHttpClient } from "./infra/http-client/http-client";

import { RemoteLoadPokemonList } from "./data/usecases/remote-load-pokemon-list";
import { RemoteLoadPokemonDetails } from "./data/usecases/remote-load-pokemon-details";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

const url = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0";

const loadPokemonList = new RemoteLoadPokemonList(url, new AxiosHttpClient());
const loadPokemonDetails = new RemoteLoadPokemonDetails(new AxiosHttpClient());

const app = (
  <App
    loadPokemonList={loadPokemonList}
    loadPokemonDetails={loadPokemonDetails}
  />
);

root.render(<StrictMode>{app}</StrictMode>);
