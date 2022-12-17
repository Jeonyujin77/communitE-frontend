import styled from "styled-components";
import { Colors } from "../../styles/colors";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <h1>
          <a href="/">Communit-E</a>
        </h1>

        <MyMenu>
          <Profile>
            <img src="https://i.ibb.co/zPcdbH8/pngegg.png" alt="기본프로필" />
          </Profile>
          <span>
            <a href="/mypage">닉네임님, 환영합니다!</a>
          </span>
          <a href="/join">회원가입</a>
          <a href="/">로그아웃</a>
        </MyMenu>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  background-color: ${Colors.purple};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  clear: both;
  padding: 0 10px;
  & > p {
    font-weight: 700;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h1 {
    float: left;
    margin: 0;
    height: 80px;
    line-height: 80px;
  }
`;

const HeaderWrapper = styled.div`
  max-width: 1440px;
  min-width: 780px;
  margin: 0 auto;
  height: 80px;
`;

const MyMenu = styled.div`
  float: right;
  height: 80px;
  line-height: 80px;
  span {
    margin-right: 10px;
  }
  a {
    margin: 0 5px;
  }
`;

const Profile = styled.span`
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  background-color: ${Colors.lightGrey};
  border-radius: 50px;
  text-align: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    vertical-align: middle;
  }
`;
export default Header;
