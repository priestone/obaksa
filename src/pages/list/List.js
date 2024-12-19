import styled from "styled-components";
import { designFont } from "../../GlobalStyled";
import { useEffect, useState } from "react";
import { getPokemonSpecies, getPokemonData, getPokemonList } from "../../api";
import { Link } from "react-router-dom";

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
  grid-template-rows: repeat(5, 1fr);
`;

const Con = styled.div`
  width: 100%;
  height: 100%;
  font-family: ${designFont.styleFont};

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

const List = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({});

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getPokemonList(151, 0);

        const details = await Promise.all(
          data.results.map(async (_, index) => {
            const id = index + 1;
            const speciesDetail = await getPokemonSpecies(id);
            const pokemonData = await getPokemonData(id);
            return { id, ...speciesDetail, ...pokemonData };
          })
        );

        setPokemonList(data.results);

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

  const getKoreanName = (names) => {
    const koreanNameObject = names?.find((item) => item.language.name === "ko");
    return koreanNameObject ? koreanNameObject.name : "알 수 없음";
  };

  return (
    <Container>
      <Link to={"/#"}>
        <Logo>오박사</Logo>
      </Link>
      <SearchWrap>
        <Search placeholder="포켓몬 검색하기" />
      </SearchWrap>
      <ConWrap>
        {pokemonList.map((pokemon, index) => {
          const detail = pokemonDetails[index + 1];
          return (
            <Con key={pokemon.name}>
              <Conimg>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    index + 1
                  }.png`}
                  alt={pokemon.name}
                />
              </Conimg>
              <h1>No.{index + 1}</h1>
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
    </Container>
  );
};

export default List;
