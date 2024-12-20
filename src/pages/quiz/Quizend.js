import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { designFont } from "../../GlobalStyled";

const Container = styled.div`
  max-width: 440px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: #dbdbdb;
  position: relative;
  font-family: ${designFont.styleFont};
  text-align: center;
  padding: 100px 0px;

  h1 {
    font-size: 30px;
    margin-bottom: 50px;
  }
`;

const HomeBtn = styled.div`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  line-height: 50px;
  margin: 50px auto 0 auto;
  background-color: salmon;
`;
const Quizend = () => {
  const location = useLocation();
  const score = location.state?.score || 0; // score값 받기

  console.log(score);

  return (
    <Container>
      <h1>퀴즈 종료</h1>
      <p>당신은 총 {score}개의 문제를 맞췄습니다!</p>
      <Link to={"/"}>
        <HomeBtn>홈으로</HomeBtn>
      </Link>
    </Container>
  );
};

export default Quizend;
