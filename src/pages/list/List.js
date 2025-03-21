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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { MoonLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  max-width: 440px;
  width: 96%;
  min-height: 100vh;
  height: 100%;
  margin: 0 auto;
  /* background-color: #dbdbdb; */
  position: relative;
  padding: 5% 2%;

  a {
    width: 100px;
  }
`;

const Logo = styled.div`
  font-family: ${designFont.styleFont};
  font-size: 30px;
  width: 100px;
`;

const SearchWrap = styled.div`
  margin-top: 30px;
`;

const Search = styled.input`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding: 5px;
`;

const ConWrap = styled.div`
  margin: 30px auto;
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

  h2 {
    margin-top: 5px;
  }

  h3 {
    margin-top: 3px;
  }
`;

const Conimg = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
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
  backdrop-filter: blur(1px);
`;

const ModalContainer = styled.div`
  /* 모달 내용(앞면) */
  max-width: 440px;
  width: 70%;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  position: relative;
  font-family: ${designFont.styleFont};

  img {
    width: 70%;
  }

  h2 {
    font-size: 14px;
    margin-top: 30px;
  }

  h3 {
    font-size: 18px;
    margin-top: 10px;
  }

  p {
    margin: 20px 0 0 0;
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 20px;
    opacity: 0.6;
  }

  h4 {
    font-size: 18px;
    margin-top: 30px;
  }

  li {
    opacity: 0.6;
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

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  const [loading, setLoading] = useState(true);

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

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
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

  return (
    <Container>
      <Helmet>
        <title>포켓몬 도감</title>
      </Helmet>
      <Link to={"/#"}>
        <Logo>오박사</Logo>
      </Link>

      {/* 로딩 중일 때만 스피너 표시 */}
      {loading ? (
        <Loading>
          <MoonLoader color="#36d7b7" loading={loading} size={50} />
        </Loading>
      ) : (
        <>
          <SearchWrap>
            <Search
              placeholder="포켓몬 검색하기"
              value={searchPokemon}
              onChange={(e) => setSearchPokemon(e.target.value)}
            />
          </SearchWrap>

          <ConWrap>
            {filteredPokemonList.map((pokemon) => {
              const detail = pokemonDetails[pokemon.id];
              return (
                <Con
                  key={pokemon.name}
                  onClick={() => handlePokemonClick(pokemon.id)}
                >
                  <Conimg>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                      alt={pokemon.name}
                    />
                  </Conimg>
                  <h2>No.{pokemon.id}</h2>
                  <h3>
                    {detail ? getKoreanName(detail.names) : "불러오는 중..."}
                  </h3>
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
              <ModalContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={handleCloseModal}>
                  <FontAwesomeIcon icon={faXmark} />
                </CloseButton>
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
                <h2>No.{selectedPokemon.id}</h2>
                <h3>{getKoreanName(selectedPokemon.names)}</h3>
                <p>
                  설명: {getKoreanFlavor(selectedPokemon.flavor_text_entries)}
                </p>
                <h4>특성</h4>
                <ul>
                  {selectedPokemon.abilitiesKorean?.map((abi, idx) => (
                    <li key={idx}> - {abi}</li>
                  ))}
                </ul>
              </ModalContainer>
            </ModalBackdrop>
          )}
        </>
      )}
    </Container>
  );
};

export default List;
