import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import nunu1 from "./imgs/nunu1.png";
import nunu2 from "./imgs/nunu2.png";
import gos1 from "./imgs/gos1.png";
import gos2 from "./imgs/gos2.png";

const Container = styled.div`
  max-width: 440px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  /* padding: 100px 40px; */
  /* background-color: #dbdbdb; */
  position: relative;
  /* padding-top: 100px; */

  h1 {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 40px;
    font-weight: 900;
    text-align: center;
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

const NextBtn1 = styled.div`
  /* width: 150px; */
  width: 100%;
  height: 150px;
  border-radius: 10px;
  background-color: salmon;
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: absolute;
  left: 10%;
  top: 50%; */
`;

const NextBtn2 = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 10px;
  background-color: salmon;
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: absolute;
  right: 10%;
  top: 50%; */
`;

const Nunu = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  top: 40%;
  left: 10%;
  overflow: hidden;
`;

const nunuani = keyframes`
0% {
  bottom: -91px;
  }     
50% {
  bottom: 0px; 
  }
  100%{
    bottom: -91px;
  }
`;

const gosani1 = keyframes`
0% {
  right: -100px;
  }     
50% {
  right: 0px; 
  }
  100%{
    right: -100px;
  }
`;

const Img1 = styled.img`
  position: absolute;
  width: 100%;
  bottom: -91px;
  animation: ${nunuani} 4s 2s alternate;
`;

const Img2 = styled.img`
  position: absolute;
  width: 100%;
  bottom: -100px;
  animation: ${nunuani} 4s 6s alternate;
  /* animation-delay: 2s; // 2초 뒤에 반대 페이즈로 */
`;

const Gos = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  top: 5%;
  left: 70%;
  overflow: hidden;
`;

const Img3 = styled.img`
  position: absolute;
  width: 100%;
  right: -100px;
  animation: ${gosani1} 4s alternate;
`;

const Img4 = styled.img`
  position: absolute;
  width: 100%;
  right: -100px;
  animation: ${gosani1} 4s 4s alternate;
  /* animation-delay: 2s; // 2초 뒤에 반대 페이즈로 */
`;

const Home = () => {
  return (
    <Container>
      <h1>
        오박사의 <br></br> 연구소
      </h1>
      <Nunu>
        <Img1 src={nunu1} alt="nunu1" />
        <Img2 src={nunu2} alt="nunu2" />
      </Nunu>
      <Gos>
        <Img3 src={gos1} alt="nunu1" />
        <Img4 src={gos2} alt="nunu1" />
      </Gos>
      <BtnWrap>
        <Link to={"/quiz"}>
          <NextBtn1>
            <h2>포켓몬퀴즈</h2>
          </NextBtn1>
        </Link>
        <Link to={"/list"}>
          <NextBtn2>
            <h2>포켓몬도감</h2>
          </NextBtn2>
        </Link>
      </BtnWrap>
    </Container>
  );
};

export default Home;
