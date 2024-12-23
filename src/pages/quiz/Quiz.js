import styled, { keyframes } from "styled-components";
import userImg from "./imgs/userimg.png";
import statusimg from "./imgs/statusimg.png";
import poketballimg from "./imgs/poketballimg.png";
import { useEffect, useState } from "react";
import { designFont } from "../../GlobalStyled";
import { Link, useNavigate } from "react-router-dom";
import btn from "../home/imgs/btn.jpg";

const slideMessage = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  20% {
    transform: translateX(0);
    opacity: 1;
  }
  80% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const Container = styled.div`
  max-width: 440px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
`;

const BattleWrap = styled.div`
  width: 100%;
  height: 60%;
  position: relative;

  h1 {
    position: absolute;
    font-size: 24px;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-family: ${designFont.styleFont};
  }
`;

const ResultMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  font-family: ${designFont.styleFont};
  color: #333;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px 20px;
  border: 2px solid #333;
  border-radius: 10px;
  animation: ${slideMessage} 2s ease-in-out forwards;
  pointer-events: none;
  z-index: 999;
`;

const PokemonImg = styled.div`
  width: 250px;
  position: absolute;
  right: 0;
  top: 10%;
  z-index: 200;
`;

const Field = styled.div`
  width: 250px;
  height: 50px;
  position: absolute;
  right: 0;
  top: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  z-index: 0;
  filter: blur(10px);
  opacity: 0.3;
`;

const ShadowImage = styled.img`
  filter: brightness(0) contrast(1);
  width: 100%;
  height: auto;
`;

const UserImg = styled.div`
  width: 200px;
  position: absolute;
  bottom: 0;
  left: 0%;
`;
const Status = styled.div``;

const StatusWrap = styled.div`
  position: absolute;
  right: 2%;
  bottom: 2%;
  width: 180px;
`;

const BallWrap = styled.div`
  position: absolute;
  right: 6%;
  bottom: 10%;
`;

const Ball = styled.div`
  display: flex;
  width: 140px;
  justify-content: space-evenly;

  img {
    width: 20%;
  }
`;

const TextWrap = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const NoticeWrap = styled.div`
  width: 96%;
  height: 120px;
  border-radius: 10px;
  background-color: #dbdbdb;
  margin-top: 10px;
  /* border: 2px solid black; */
  position: relative;

  h2 {
    text-align: start;
    line-height: 50px;
    font-size: 20px;
    font-family: ${designFont.styleFont};
    margin-left: 10px;
    position: absolute;
    left: 5%;
    top: 5%;
    z-index: 60;
  }

  img {
    max-height: 120px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 50;
  }
`;

const Answer = styled.input`
  all: unset;
  width: 120px;
  height: 40px;
  border: 1px solid black;
  margin-right: 10px;
  text-align: center;
`;

const ActionWrap = styled.div`
  width: 96%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  a {
    width: 48%;
  }
`;

const Write = styled.div`
  width: 48%;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 24px;
  font-family: ${designFont.styleFont};
  border-radius: 10px;
  cursor: pointer;
  position: relative;

  img {
    max-height: 100px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 50;
  }

  h3 {
    font-size: 20px;
    font-family: ${designFont.styleFont};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 60;
  }
`;

const Runaway = styled.div`
  height: 100px;
  /* background-color: #dbdbdb; */
  text-align: center;
  line-height: 100px;
  font-size: 24px;
  font-family: ${designFont.styleFont};
  border-radius: 10px;
  position: relative;

  img {
    max-height: 100px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 50;
  }

  h3 {
    font-size: 20px;
    font-family: ${designFont.styleFont};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 60;
  }
`;

const getKoreanName = (names) => {
  const koreanNameObject = names?.find((item) => item.language.name === "ko");
  return koreanNameObject ? koreanNameObject.name : "알 수 없음";
};

const Quiz = () => {
  const [pokemon, setPokemon] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [round, setRound] = useState(1);
  const totalRounds = 5;
  const [roundResults, setRoundResults] = useState(
    Array(totalRounds).fill(null)
  );

  const navigate = useNavigate();

  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    const data = await response.json();

    const speciesResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${randomId}`
    );
    const speciesData = await speciesResponse.json();

    const koreanName = getKoreanName(speciesData.names);

    setPokemon({
      name: data.name,
      image: data.sprites.front_default,
      koreanName: koreanName,
    });
    setUserAnswer("");
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const nextRound = (updatedResults) => {
    if (round < totalRounds) {
      setRound(round + 1);
      fetchRandomPokemon();
      console.log(updatedResults);
    } else {
      // 모든 라운드 종료 시점에서 정답 개수 계산
      const correctCount = updatedResults.filter((r) => r === "correct").length;

      console.log(correctCount);
      navigate("/quizend", { state: { score: correctCount } });
    }
  };

  const checkAnswer = () => {
    if (!pokemon) return;
    let updatedResults = [...roundResults];

    if (userAnswer.trim() === pokemon.koreanName) {
      setMessage("정답입니다!");
      updatedResults[round - 1] = "correct";
    } else {
      setMessage("틀렸습니다!");
      updatedResults[round - 1] = "wrong";
    }

    setRoundResults(updatedResults);

    // 결과 메시지 표시
    setShowResult(true);

    // 2.2초 뒤 다음 라운드(혹은 종료)
    setTimeout(() => {
      setShowResult(false);
      nextRound(updatedResults);
    }, 2200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  const getBallFilter = (result) => {
    if (result === "correct") {
      return "hue-rotate(100deg) brightness(1.2)";
    } else if (result === "wrong") {
      return "grayscale(100%) brightness(0.5)";
    } else {
      return "none";
    }
  };

  return (
    <Container>
      <BattleWrap>
        <h1>{round}번째 퀴즈</h1>
        {showResult && <ResultMessage>{message}</ResultMessage>}
        <PokemonImg>
          {pokemon ? (
            <ShadowImage src={pokemon.image} alt="shadow-pokemon" />
          ) : (
            <p>로딩 중...</p>
          )}
        </PokemonImg>
        <Field></Field>
        <UserImg>
          <img src={userImg} alt="사용자이미지" />
        </UserImg>
        <StatusWrap>
          <Status>
            <img src={statusimg} alt="상태창이미지" />
          </Status>
          <BallWrap>
            <Ball>
              {roundResults.map((result, idx) => (
                <img
                  key={idx}
                  src={poketballimg}
                  alt="포켓볼이미지"
                  style={{ filter: getBallFilter(result) }}
                />
              ))}
            </Ball>
          </BallWrap>
        </StatusWrap>
      </BattleWrap>
      <TextWrap>
        <NoticeWrap>
          <img src={btn} alt="버튼이미지" />
          <h2>
            앗! 야생의
            <br />
            <Answer
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            (이)가 나타났다!
          </h2>
        </NoticeWrap>
        <ActionWrap>
          <Write onClick={checkAnswer}>
            <img src={btn} alt="버튼이미지" />
            <h3>입력하기</h3>
          </Write>
          <Link to={"/"}>
            <Runaway>
              <img src={btn} alt="버튼이미지" />
              <h3>도망치기</h3>
            </Runaway>
          </Link>
        </ActionWrap>
      </TextWrap>
    </Container>
  );
};

export default Quiz;
