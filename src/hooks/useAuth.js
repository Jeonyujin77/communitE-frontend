import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getUserInfo } from "../lib/userApi";
import { getUserInfo, logout } from "../redux/modules/userSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const is_token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  // 화면이 로드됨과 동시에 사용자정보를 조회한다
  useEffect(() => {
    // 로그인한 상태인 경우에만!
    if (is_token !== "" && userId !== null) {
      dispatch(__getUserInfo(userId)).then((res) => {
        // store에 사용자정보 저장
        const { user } = res.payload;
        dispatch(getUserInfo(user));
      });
    } else {
      dispatch(logout());
    }
  }, [is_token, dispatch, navigate, userId]);

  return <></>;
};

export default useAuth;
