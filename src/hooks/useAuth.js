import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getUserInfo } from "../lib/userApi";
import { getUserInfo } from "../redux/modules/userSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { is_login } = useSelector((state) => state.user);

  // 화면이 로드됨과 동시에 사용자정보를 조회한다
  useEffect(() => {
    // 로그인한 상태인 경우에만!
    if (is_login) {
      const userId = localStorage.getItem("userId");
      dispatch(__getUserInfo(userId)).then((res) => {
        // store에 사용자정보 저장
        const { user } = res.payload;
        dispatch(getUserInfo(user));
      });
    } else {
      // 로그인 안하고 바로 마이페이지접근 시 로그인페이지로 리다이렉트시킴
      navigate("/login");
    }
  }, [is_login, dispatch, navigate]);

  return <></>;
};

export default useAuth;
