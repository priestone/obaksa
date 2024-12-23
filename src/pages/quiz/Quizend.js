import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { designFont } from "../../GlobalStyled";
import bg from "../home/imgs/bg.jpg";
import btn from "../home/imgs/btn.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  max-width: 440px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: #dbdbdb;
  position: relative;
  font-family: ${designFont.styleFont};
  text-align: center;
  /* padding: 100px 0px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(${bg}) no-repeat center / cover;

  h1 {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 30px;
  }

  /* a {
    width: 200px;
    height: 50px;
    margin: 50px 0;
  } */

  p {
    position: absolute;
    top: 20%;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
    font-size: 20px;
  }
`;

// const HomeBtn = styled.div`
//   width: 200px;
//   height: 50px;
//   border-radius: 10px;
//   line-height: 50px;
//   /* margin: 50px auto 0 auto; */
//   background-color: salmon;
// `;

const NextBtn3 = styled.div`
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  height: 200px;
  position: relative;
  top: 30%;
  font-family: ${designFont.styleFont};

  img {
    width: 100%;
    max-height: 200px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
  }

  h2 {
    font-size: 30px;
    z-index: 100;
    position: absolute;
    top: 24%;
    left: 50%;
    transform: translateX(-50%);

    &:hover + div {
      display: block;
    }
  }

  h3 {
    font-size: 30px;
    z-index: 100;
    position: absolute;
    top: 56%;
    left: 50%;
    transform: translateX(-50%);

    &:hover + div {
      display: block;
    }
  }
`;

const Dot1 = styled.div`
  font-size: 24px;
  position: absolute;
  top: 24%;
  left: 14%;
  z-index: 200;
  display: none;
`;

const Dot2 = styled.div`
  font-size: 24px;
  position: absolute;
  top: 56%;
  left: 14%;
  z-index: 200;
  display: none;
`;

const Quizend = () => {
  const location = useLocation();
  const score = location.state?.score || 0; // score값 받기

  console.log(score);

  return (
    <Container>
      <Helmet>
        <title>포켓몬 퀴즈결과과</title>
      </Helmet>
      <h1>퀴즈 종료</h1>
      <p>당신은 총 {score}개의 문제를 맞췄습니다!</p>
      <NextBtn3>
        <img src={btn} alt="버튼이미지" />
        <Link to={"/"}>
          <h2>홈으로로</h2>
          <Dot1>
            <FontAwesomeIcon icon={faPlay} />
          </Dot1>
        </Link>
        <Link to={"/quiz"}>
          <h3>다시하기</h3>
          <Dot2>
            <FontAwesomeIcon icon={faPlay} />
          </Dot2>
        </Link>
      </NextBtn3>
      {/* <Link to={"/"}>
        <HomeBtn>홈으로</HomeBtn>
      </Link>
      <Link to={"/quiz"}>
        <HomeBtn>다시하기</HomeBtn>
      </Link> */}
    </Container>
  );
};

export default Quizend;
