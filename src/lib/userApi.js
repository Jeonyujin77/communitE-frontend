import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

// 회원가입
export const __signup = createAsyncThunk(
  "signup",
  async (payload, thunkAPI) => {
    const { loginId, password, nickname } = payload;
    try {
      const response = await axios.post("http://localhost:3001/user", {
        loginId,
        password,
        nickname,
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 사용자 정보 조회
export const __getUserInfo = createAsyncThunk(
  "getUserInfo",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/user?userId=${payload}`
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const userApis = {
//   // 로그인
//   login: (loginId, password) =>
//     api.post("/api/user/login", { loginId, password }),
//   // 로그아웃
//   logout: () => api.put("/api/user/logout", {}),
//   // 회원가입
//   signup: (loginId, password, nickname) => {
//     api.post("/api/user/signup", { loginId, password, nickname });
//   },

//   // 아이디 중복검사
//   chkLoginIdDup: (loginId) => api.get(`/api/user/signup/${loginId}`),
//   // 닉네임 중복검사
//   chkNicknameDup: (nickname) => api.get(`/api/user/signup/${nickname}`),
//   // 사용자 정보 조회
//   getUserInfo: (userId) => api.get(`/api/user/${userId}`),
//   // 사용자 정보 수정
//   modifyUserInfo: (userId) => api.put(`/api/user/${userId}`),
// };
