import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ShadowImage = styled.img`
  filter: brightness(0) contrast(1); /* 이미지를 까맣게 만듦 */
  width: 300px;
  height: auto;
`;

const GameContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");
  const [reveal, setReveal] = useState(false);

  // 포켓몬 데이터를 가져오는 함수
  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1; // 1세대 포켓몬만
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    const data = await response.json();
    setPokemon({
      name: data.name,
      image: data.sprites.front_default, // 포켓몬 이미지 URL
    });
    setReveal(false);
    setResult("");
    setUserInput("");
  };

  useEffect(() => {
    fetchRandomPokemon(); // 컴포넌트 마운트 시 포켓몬 불러오기
  }, []);

  const checkAnswer = () => {
    if (userInput.toLowerCase() === pokemon.name) {
      setResult("정답입니다! 🎉");
      setReveal(true);
    } else {
      setResult("틀렸어요! 다시 시도해보세요. ❌");
    }
  };

  console.log(pokemon);

  return (
    <GameContainer>
      <h1>포켓몬 그림자 퀴즈</h1>
      {pokemon && (
        <div>
          {!reveal ? (
            <ShadowImage src={pokemon.image} alt="shadow-pokemon" />
          ) : (
            <img src={pokemon.image} alt={pokemon.name} />
          )}
        </div>
      )}
      <Input
        type="text"
        placeholder="포켓몬 이름을 입력하세요"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <Button onClick={checkAnswer}>제출</Button>
      <p>{result}</p>
      <Button onClick={fetchRandomPokemon}>새로운 문제</Button>
    </GameContainer>
  );
};

export default App;
