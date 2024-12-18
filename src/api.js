import axios from "axios";

const pokemonAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  headers: {
    accept: "application/json",
  },
});

export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await pokemonAPI.get("pokemon", {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    throw error;
  }
};

export const getPokemonDetails = async () => {
  const response = await pokemonAPI.get(
    `pokemon-species/bulbasaur?language=ko`
  );
  return response.data;
};

// https://pokeapi.co/api/v2/pokemon?offset=0&limit=20

// https://pokeapi.co/api/v2/pokemon-species/bulbasaur?language=ko
