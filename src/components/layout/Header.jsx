import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "../../../node_modules/react-router-dom/dist/index";
import { logout } from "../../redux/modules/userSlice";
import { Colors } from "../../styles/colors";

const Header = () => {
  const dispatch = useDispatch();
  const { user, is_login } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(user, is_login);
  });

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <h1>
          <Link to="/">Communit-E</Link>
        </h1>

        <MyMenu>
          <HeaderWords>
            {is_login ? (
              <>
                <Profile>
                  <img
                    src="https://i.ibb.co/zPcdbH8/pngegg.png"
                    alt="기본프로필"
                  />
                </Profile>
                <Link to="/mypage">
                  <span>닉네임</span>님, 환영합니다!
                </Link>
                <Link onClick={onLogout}>로그아웃</Link>
              </>
            ) : (
              <>
                <Link to="/login">로그인</Link>
                <Link to="/join">회원가입</Link>
              </>
            )}
          </HeaderWords>
        </MyMenu>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  background-color: white;
  box-shadow: 0px 0px 10px 1px #8080806c;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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
  max-width: 1200px;
  min-width: 780px;
  margin: 0 auto;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    color: ${Colors.purple};
  }
`;

const MyMenu = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  line-height: 80px;
  span {
    margin-right: 10px;
  }
  a {
    margin: 0 5px;
  }
`;
const HeaderWords = styled.div`
  display: flex;
  align-items: center;
  span {
    color: ${Colors.purple};
    margin: 0;
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
