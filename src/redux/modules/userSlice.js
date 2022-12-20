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
      const userId = localStorage.getItem("userId");
      const tokenCheck = document.cookie;
      if (tokenCheck) {
        state.user = { id: userId };
        state.is_login = true;
      }
    },
    logout: (state, action) => {
      deleteCookie("accesstoken");
      deleteCookie("refreshtoken");
      localStorage.removeItem("userId");
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
      const { userId } = action.payload;

      localStorage.setItem("userId", userId);
      // 로그인여부 true
      state.is_login = true;
      // 사용자정보 저장
      state.user = action.payload;
    },
    [__login.rejected]: (state, action) => {
      state.is_login = false;
      state.error = action.payload;
    },
  },
});

export const { getUserInfo, loginCheck, logout } = userSlice.actions;
export default userSlice;
