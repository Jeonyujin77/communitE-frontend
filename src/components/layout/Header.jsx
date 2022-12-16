import styled from "styled-components";

const Header = () => {
  return <HeaderContainer>Header</HeaderContainer>;
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & > p {
    font-weight: 700;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default Header;
