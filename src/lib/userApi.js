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
        `${process.env.REACT_APP_URL}/api/user/${payload}`
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 사용자 정보 수정
export const __modifyUserInfo = createAsyncThunk(
  "modifyUserInfo",
  async (payload, thunkAPI) => {
    const { userId, formData } = payload;

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/api/user/${userId}`,
        formData
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
//   // 아이디 중복검사
//   chkLoginIdDup: (loginId) => api.get(`/api/user/signup/${loginId}`),
//   // 닉네임 중복검사
//   chkNicknameDup: (nickname) => api.get(`/api/user/signup/${nickname}`),
// };
