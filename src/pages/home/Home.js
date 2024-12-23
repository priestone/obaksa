import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import bg from "./imgs/bg.jpg";
import btn from "./imgs/btn.jpg";
import { designFont } from "../../GlobalStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  max-width: 440px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background: url(${bg}) no-repeat center / cover;
  /* background-size: 300px; */

  h1 {
    width: 240px;
    position: absolute;
    top: 24%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 40px;
    font-weight: 900;
    text-align: center;
    z-index: 990;
    line-height: 60px;
    -webkit-text-stroke: 5px rgb(51, 51, 51);
  }

  h5 {
    width: 240px;
    position: absolute;
    top: 24%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 40px;
    font-weight: 900;
    text-align: center;
    z-index: 991;
    line-height: 60px;
    color: white;
    /* -webkit-text-stroke: 3px rgb(43, 43, 43); */
  }
`;

const BtnWrap = styled.div`
  width: 90%;
  position: absolute;
  left: 5%;
  top: 50%;
  display: flex;
  justify-content: space-between;

  a {
    width: 48%;
  }
`;

const NextBtn3 = styled.div`
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  height: 200px;
  position: relative;
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
    left: 24%;
  }

  h3 {
    font-size: 30px;
    z-index: 100;
    position: absolute;
    top: 56%;
    left: 24%;
  }
`;

const Dot1 = styled.div`
  font-size: 24px;
  position: absolute;
  top: 24%;
  left: 14%;
  z-index: 200;
`;

const Dot2 = styled.div`
  font-size: 24px;
  position: absolute;
  top: 56%;
  left: 14%;
  z-index: 200;
`;

const Home = () => {
  return (
    <Container>
      <h1>
        오박사의 <br></br> 포켓몬 연구소
      </h1>
      <h5>
        오박사의 <br></br> 포켓몬 연구소
      </h5>
      <BtnWrap>
        <NextBtn3>
          <img src={btn} alt="버튼이미지" />
          <Link to={"/quiz"}>
            <Dot1>
              <FontAwesomeIcon icon={faPlay} />
            </Dot1>
            <Dot2>
              <FontAwesomeIcon icon={faPlay} />
            </Dot2>
            <h2>포켓몬 퀴즈</h2>
          </Link>
          <Link to={"/list"}>
            <h3>포켓몬 도감</h3>
          </Link>
        </NextBtn3>
      </BtnWrap>
    </Container>
  );
};

export default Home;
