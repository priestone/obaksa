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

// 종(species) 정보: 이름(한국어 명), 도감 설명 등
export const getPokemonSpecies = async (pokemonId) => {
  try {
    const response = await pokemonAPI.get(`pokemon-species/${pokemonId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching species for Pokémon ID ${pokemonId}:`, error);
    throw error;
  }
};

// 실제 포켓몬 스탯, 타입, 특성 등의 데이터
export const getPokemonData = async (pokemonId) => {
  try {
    const response = await pokemonAPI.get(`pokemon/${pokemonId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for Pokémon ID ${pokemonId}:`, error);
    throw error;
  }
};

// (1) ability 상세 정보를 불러오는 API 헬퍼 함수 추가
export const getAbilityData = async (abilityUrl) => {
  try {
    const response = await fetch(abilityUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("getAbilityData error:", error);
    return null;
  }
};

// (2) ability의 한글 이름만 추출하는 헬퍼
export const getKoreanAbilityName = (abilityNames) => {
  const found = abilityNames?.find((item) => item.language.name === "ko");
  return found ? found.name : "알 수 없음"; // ko가 없으면 기본 메시지
};
