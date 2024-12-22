import styled from "styled-components";
import { designFont } from "../../GlobalStyled";
import { useEffect, useState } from "react";
import {
  getPokemonSpecies,
  getPokemonData,
  getPokemonList,
  getKoreanAbilityName,
  getAbilityData,
} from "../../api";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const Container = styled.div`
  max-width: 440px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  margin: 0 auto;
  background-color: #dbdbdb;
  position: relative;
  padding: 20px;
`;

const Logo = styled.div`
  font-family: ${designFont.styleFont};
  font-size: 30px;
`;

const SearchWrap = styled.div`
  margin-top: 50px;
`;

const Search = styled.input`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding: 5px;
`;

const ConWrap = styled.div`
  margin-top: 30px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
  row-gap: 20px;
  /* grid-template-rows: repeat(5, 1fr); */
`;

const Con = styled.div`
  width: 100%;
  height: 100%;
  font-family: ${designFont.styleFont};
  cursor: pointer; /* 마우스 오버 시 클릭 가능하다는 UI 표시 */

  h1 {
    margin-top: 5px;
  }

  h2 {
    margin-top: 3px;
  }
`;

const Conimg = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

const Type = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;

  span {
    width: 45%;
    border-radius: 4px;
    text-align: center;
    color: white;
    padding: 5px 0;
  }
`;

// -------------------- 모달 관련 스타일 --------------------
const ModalBackdrop = styled.div`
  /* 모달 배경(뒷면) */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10; /* 화면 맨 위에 올라오도록 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  /* 모달 내용(앞면) */
  width: 70%;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  position: relative;
  font-family: ${designFont.styleFont};

  img {
    width: 70%;
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 20px;
  }

  h1 {
    font-size: 12px;
    margin-top: 10px;
  }

  h2 {
    font-size: 18px;
    margin-top: 10px;
  }

  p {
    margin: 10px 0;
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 20px;
  }

  h3 {
    font-size: 18px;
  }

  li {
    margin-top: 10px;
  }
`;

const Modalimg = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: white;
  display: flex;
  justify-content: center;
`;

const CloseButton = styled.button`
  all: unset;
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
`;

// -------------------- 타입 정보 --------------------
const typeProperties = {
  grass: { color: "green", translation: "풀" },
  poison: { color: "purple", translation: "독" },
  fire: { color: "red", translation: "불" },
  water: { color: "blue", translation: "물" },
  flying: { color: "skyblue", translation: "비행" },
  bug: { color: "olive", translation: "벌레" },
  normal: { color: "gray", translation: "노말" },
  electric: { color: "yellow", translation: "전기" },
  ground: { color: "brown", translation: "땅" },
  fairy: { color: "pink", translation: "요정" },
  fighting: { color: "orange", translation: "격투" },
  psychic: { color: "hotpink", translation: "에스퍼" },
  rock: { color: "darkgray", translation: "바위" },
  ice: { color: "lightblue", translation: "얼음" },
  ghost: { color: "indigo", translation: "고스트" },
  dragon: { color: "gold", translation: "드래곤" },
  dark: { color: "black", translation: "악" },
  steel: { color: "silver", translation: "강철" },
};

const getPokemonTypeProperties = (typeName) => {
  const type = typeProperties[typeName];
  return type
    ? { color: type.color, translation: type.translation }
    : { color: "gray", translation: typeName };
};

// -------------------- 도우미 함수(한국어 이름, flavor 텍스트) --------------------
const getKoreanName = (names) => {
  const koreanNameObject = names?.find((item) => item.language.name === "ko");
  return koreanNameObject ? koreanNameObject.name : "알 수 없음";
};

const getKoreanFlavor = (flavorTextEntries) => {
  // flavor_text_entries 중 한국어(ko)인 항목 찾기
  const flavorObj = flavorTextEntries?.find(
    (entry) => entry.language.name === "ko"
  );
  // \n, \f 등의 문자를 공백으로 치환
  return flavorObj
    ? flavorObj.flavor_text.replace(/\n|\f/g, " ")
    : "정보가 없어요";
};

const List = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [searchPokemon, setSearchPokemon] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null); // 모달에 표시할 포켓몬

  // List.jsx (일부)
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getPokemonList(151, 0);
        const updatedResults = data.results.map((p, i) => ({
          ...p,
          id: i + 1,
        }));
        setPokemonList(updatedResults);

        // 각 포켓몬 상세정보 + ability 상세정보까지 불러오기
        const details = await Promise.all(
          updatedResults.map(async (pokemon) => {
            // 1) 포켓몬의 speciesDetail, pokemonData 호출
            const speciesDetail = await getPokemonSpecies(pokemon.id);
            const pokemonData = await getPokemonData(pokemon.id);

            // 2) 포켓몬의 abilities 배열에서 ability url 추출 → 각각 호출
            const abilitiesKorean = await Promise.all(
              pokemonData.abilities.map(async (abilityObj) => {
                // abilityObj.ability.url = https://pokeapi.co/api/v2/ability/65/ ...
                const abilityData = await getAbilityData(
                  abilityObj.ability.url
                );
                // abilityData.names에서 한국어 이름을 추출
                return getKoreanAbilityName(abilityData.names);
              })
            );

            return {
              id: pokemon.id,
              ...speciesDetail,
              ...pokemonData,
              abilitiesKorean, // ["심록", "엽록소"] 형태
            };
          })
        );

        const detailsMap = details.reduce((acc, detail) => {
          acc[detail.id] = detail;
          return acc;
        }, {});
        setPokemonDetails(detailsMap);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemons();
  }, []);

  // -------------------- 검색 필터링 --------------------
  const filteredPokemonList = pokemonList.filter((pokemon) => {
    const detail = pokemonDetails[pokemon.id];
    if (!detail) return false;
    const koreanName = getKoreanName(detail.names);
    // 검색어가 없거나, 이름에 검색어가 포함된 경우
    return searchPokemon === "" || koreanName.includes(searchPokemon);
  });

  // -------------------- 포켓몬 클릭 시 모달 열기 --------------------
  const handlePokemonClick = (pokemonId) => {
    const detail = pokemonDetails[pokemonId];
    if (detail) {
      setSelectedPokemon(detail);
    }
  };

  // -------------------- 모달 닫기 --------------------
  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  console.log(pokemonDetails);

  const fetchData = () => {
    try {
      // let page = (resultData.page += 1);
    } catch (error) {}
  };

  return (
    <Container>
      <Link to={"/#"}>
        <Logo>오박사</Logo>
      </Link>
      <SearchWrap>
        <Search
          placeholder="포켓몬 검색하기"
          value={searchPokemon}
          onChange={(e) => setSearchPokemon(e.target.value)}
        />
      </SearchWrap>
      <InfiniteScroll
        dataLength={pokemonList.length}
        next={fetchData}
        hasMore={true}
      >
        {console.log(pokemonList.length)}
      </InfiniteScroll>
      <ConWrap>
        {filteredPokemonList.map((pokemon) => {
          const detail = pokemonDetails[pokemon.id];
          return (
            <Con
              key={pokemon.name}
              onClick={() => handlePokemonClick(pokemon.id)} // 클릭 시 모달 열기
            >
              <Conimg>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                />
              </Conimg>
              <h1>No.{pokemon.id}</h1>
              <h2>{detail ? getKoreanName(detail.names) : "불러오는 중..."}</h2>
              <Type>
                {detail &&
                  detail.types?.map((typeObj, i) => {
                    const { color, translation } = getPokemonTypeProperties(
                      typeObj.type.name
                    );
                    return (
                      <span
                        key={i}
                        style={{
                          backgroundColor: color,
                          color: color === "yellow" ? "black" : "white",
                        }}
                      >
                        {translation}
                      </span>
                    );
                  })}
              </Type>
            </Con>
          );
        })}
      </ConWrap>

      {/* -------------------- 모달(선택된 포켓몬 정보) -------------------- */}
      {selectedPokemon && (
        <ModalBackdrop onClick={handleCloseModal}>
          {/* 
            모달 내부 컨테이너 클릭 시 닫히지 않도록 
            이벤트 버블링을 막아주는 코드가 필요. 
          */}
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>X</CloseButton>
            <Modalimg>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
                alt={getKoreanName(selectedPokemon.names)}
              />
            </Modalimg>
            <Type>
              {selectedPokemon.types?.map((typeObj, i) => {
                const { color, translation } = getPokemonTypeProperties(
                  typeObj.type.name
                );
                return (
                  <span
                    key={i}
                    style={{
                      backgroundColor: color,
                      color: color === "yellow" ? "black" : "white",
                    }}
                  >
                    {translation}
                  </span>
                );
              })}
            </Type>
            <h1>No.{selectedPokemon.id}</h1>
            <h2>{getKoreanName(selectedPokemon.names)}</h2>
            <p>설명: {getKoreanFlavor(selectedPokemon.flavor_text_entries)}</p>
            <h3>특성</h3>
            <ul>
              {selectedPokemon.abilitiesKorean?.map((abi, idx) => (
                <li key={idx}> - {abi}</li>
              ))}
            </ul>
          </ModalContainer>
        </ModalBackdrop>
      )}
    </Container>
  );
};

export default List;
