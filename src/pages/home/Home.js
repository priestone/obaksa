import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getPokemonDetails, getPokemonList } from "../../api";

const Container = styled.div`
  max-width: 440px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  /* padding: 100px 40px; */
  background-color: #dbdbdb;
  position: relative;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NextBtn1 = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  background-color: salmon;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 10%;
  top: 50%;
`;

const NextBtn2 = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  background-color: salmon;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10%;
  top: 50%;
`;

const Home = () => {
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getPokemonList(150, 0);
        const detaildata = await getPokemonDetails("");
        // console.log(data);
        console.log(detaildata);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <Container>
      {/* <BtnWrap>
      </BtnWrap> */}
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
    </Container>
  );
};

export default Home;
