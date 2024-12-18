import styled from "styled-components";
import { designFont } from "../../GlobalStyled";

const Container = styled.div`
  max-width: 440px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  /* padding: 100px 40px; */
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

const Search = styled.div`
  width: 100%;
  height: 1px;
  background-color: black;
`;

const List = () => {
  return (
    <Container>
      <Logo>오박사</Logo>
      <SearchWrap>
        <Search></Search>
      </SearchWrap>
    </Container>
  );
};

export default List;
