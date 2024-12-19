import axios from "axios";

const pokemonAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  headers: {
    accept: "application/json",
  },
});

export const getPokemonList = async (limit = 151, offset = 0) => {
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

export const getPokemonDetails = async (pokemonId) => {
  try {
    const response = await pokemonAPI.get(`pokemon-species/${pokemonId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for Pokémon ID ${pokemonId}:`, error);
    throw error;
  }
};

// export const getPokemonDetails = async (pokemonID) => {
//   const response = await pokemonAPI.get(`pokemon-species/${pokemonID}`);
//   return response.data;
// };

// https://pokeapi.co/api/v2/pokemon?offset=0&limit=20

// https://pokeapi.co/api/v2/pokemon-species/bulbasaur?language=ko
