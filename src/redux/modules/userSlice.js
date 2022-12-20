import { createSlice } from "@reduxjs/toolkit";
import { __login } from "../../lib/userApi";
import { deleteCookie, setCookie } from "../../utils/Cookie";

const initialState = {
  user: null,
  is_login: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfo: (state, action) => {
      state.user = action.payload;
      state.is_login = true;
    },
    loginCheck: (state, action) => {
      const loginId = localStorage.getItem("loginId");
      const tokenCheck = document.cookie;
      if (tokenCheck) {
        state.user = { id: loginId };
        state.is_login = true;
      }
    },
    logout: (state, action) => {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      localStorage.removeItem("loginId");
      state.user = null;
      state.is_login = false;
      window.location.href = "/";
    },
  },
  extraReducers: {
    [__login.pending]: (state, action) => {
      state.is_login = false;
    },
    [__login.fulfilled]: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      const { loginId } = action.meta.arg;

      // access token 생성
      setCookie("accessToken", accessToken, 7);
      // refresh token 생성
      setCookie("refreshToken", refreshToken, 7);
      // localStorage에 loginId 저장
      localStorage.setItem("loginId", loginId);
      // 로그인여부 true
      state.is_login = true;
      // 사용자정보 저장
      state.user = { id: loginId };
    },
    [__login.rejected]: (state, action) => {
      state.is_login = false;
      state.error = action.payload;
    },
  },
});

export const { getUserInfo, loginCheck, logout } = userSlice.actions;
export default userSlice;
