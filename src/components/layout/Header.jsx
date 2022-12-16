import styled from "styled-components";

const Header = () => {
  return (
    <HeaderSection>
      <HeaderContainer>Header</HeaderContainer>
    </HeaderSection>
  );
};

const HeaderSection = styled.div`
  padding: 20px 90px 20px 90px;
`;

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
