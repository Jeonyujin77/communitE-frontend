import { createSlice } from "@reduxjs/toolkit";
import { __login } from "../../lib/userApi";
import { deleteCookie } from "../../utils/Cookie";

const initialState = {
  user: null, // 사용자 정보
  error: null, // 에러
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 사용자 정보 조회
    getUserInfo: (state, action) => {
      state.user = action.payload;
    },
    // 로그인 유무 판단
    loginCheck: (state) => {
      const userId = localStorage.getItem("userId");
      const tokenCheck = document.cookie;
      // 브라우저에 토큰이 있으면
      if (tokenCheck && userId !== null) {
        state.user = { id: userId }; // 사용자 ID를 가져온다
      }
    },
    // 로그아웃
    logout: (state) => {
      deleteCookie("accessToken"); // access token을 지운다
      deleteCookie("refreshToken"); // refresh token을 지운다
      localStorage.removeItem("userId"); // localstorage의 userId를 지운다
      state.user = null; // 사용자 정보 삭제
      window.location.href = "/"; // 메인으로 이동
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__login.fulfilled, (state, action) => {
        const { userId } = action.payload;

        localStorage.setItem("userId", userId);
        // 사용자정보 저장
        state.user = action.payload;
      })
      .addCase(__login.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { getUserInfo, loginCheck, logout } = userSlice.actions;
export default userSlice;
