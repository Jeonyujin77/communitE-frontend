import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  Link,
  useNavigate,
} from "../../../node_modules/react-router-dom/dist/index";
import { __getUserInfo } from "../../lib/userApi";
import { getUserInfo, logout } from "../../redux/modules/userSlice";
import { Colors } from "../../styles/colors";

const Header = () => {
  const { user } = useSelector((state) => state.user); // 사용자정보 가져오기
  const dispatch = useDispatch();
  const is_token = document.cookie;
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // 화면이 로드됨과 동시에 사용자정보를 조회한다

  useEffect(() => {
    // 로그인한 상태인 경우에만!
    if (is_token !== "" && userId !== null) {
      dispatch(__getUserInfo(userId)).then((res) => {
        // store에 사용자정보 저장
        const { user } = res.payload;
        dispatch(getUserInfo(user));
      });
    }
  }, [is_token, dispatch, userId, navigate]);

  const onLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) dispatch(logout());
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <h1>
          <Link to="/">Communit-E</Link>
        </h1>
        <MyMenu>
          <HeaderWords>
            {is_token !== "" && userId !== null ? (
              <>
                <Profile>
                  {user?.image !== null ? (
                    <img src={`${user?.image}`} alt="프로필" />
                  ) : (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="기본프로필"
                    />
                  )}
                </Profile>
                <Link to="/mypage">
                  <span>{user?.nickname}</span>님, 환영합니다!
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
