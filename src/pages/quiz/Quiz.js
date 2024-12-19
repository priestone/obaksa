import styled from "styled-components";
import userImg from "./imgs/userimg.png";
import statusimg from "./imgs/statusimg.png";
import poketballimg from "./imgs/poketballimg.png";
import { useEffect, useState } from "react";

const Container = styled.div`
  max-width: 440px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  /* padding: 100px 40px; */
  background-color: #dbdbdb;
  position: relative;
`;

const BattleWrap = styled.div`
  width: 100%;
  height: 60%;
  background-color: yellow;
  position: relative;

  h1 {
    font-size: 24px;
    text-align: center;
  }
`;

const TextWrap = styled.div`
  width: 100%;
  height: 40%;
  background-color: green;
`;

const PokemonImg = styled.div`
  width: 250px;
  position: absolute;
  right: 0;
  top: 10%;
`;

const ShadowImage = styled.img`
  filter: brightness(0) contrast(1); /* 이미지 실루엣 효과 */
  width: 100%;
  height: auto;
`;

const UserImg = styled.div`
  width: 200px;
  position: absolute;
  bottom: 0;
  left: 0;
`;
const StatusWrap = styled.div`
  position: absolute;
  right: 2%;
  bottom: 2%;
  width: 180px;
`;

const Status = styled.div``;

const BallWrap = styled.div`
  position: absolute;
  right: 6%;
  bottom: 10%;
`;

const Ball = styled.div`
  display: flex;
  width: 140px;
  justify-content: space-evenly;
  /* width: 30%; */

  img {
    width: 15%;
  }
`;

const Quiz = () => {
  const [pokemon, setPokemon] = useState(null);

  // 랜덤 포켓몬 불러오기 함수
  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1; // 1~151 사이 랜덤
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    const data = await response.json();
    setPokemon({
      name: data.name,
      image: data.sprites.front_default,
    });
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  return (
    <Container>
      <BattleWrap>
        <h1>첫번째 퀴즈</h1>
        <PokemonImg>
          {pokemon ? (
            // 포켓몬 이미지에 실루엣 효과 적용
            <ShadowImage src={pokemon.image} alt="shadow-pokemon" />
          ) : (
            <p>로딩 중...</p>
          )}
        </PokemonImg>
        <UserImg>
          <img src={userImg} alt="사용자이미지" />
        </UserImg>
        <StatusWrap>
          <Status>
            <img src={statusimg} alt="상태창이미지지" />
          </Status>
          <BallWrap>
            <Ball>
              <img src={poketballimg} alt="포켓볼이미지지" />
              <img src={poketballimg} alt="포켓볼이미지지" />
              <img src={poketballimg} alt="포켓볼이미지지" />
              <img src={poketballimg} alt="포켓볼이미지지" />
              <img src={poketballimg} alt="포켓볼이미지지" />
            </Ball>
          </BallWrap>
        </StatusWrap>
      </BattleWrap>
      <TextWrap></TextWrap>
    </Container>
  );
};

export default Quiz;
