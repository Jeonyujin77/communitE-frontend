import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie } from "../utils/Cookie";
import api from "./api";
// 로그인
export const __login = createAsyncThunk("login", async (payload, thunkAPI) => {
  const { loginId, password } = payload;
  try {
    const response = await api.post("/api/user/login", { loginId, password });
    const { accesstoken, refreshtoken } = response.headers;

    // access token 생성
    setCookie("accesstoken", accesstoken, 7);
    // refresh token 생성
    setCookie("refreshtoken", refreshtoken, 7);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    const { errorMessage } = error.response.data;

    alert(errorMessage);
    return thunkAPI.rejectWithValue(error);
  }
});

// 회원가입
export const __signup = createAsyncThunk(
  "signup",
  async (payload, thunkAPI) => {
    const { loginId, password, nickname } = payload;
    try {
      const response = await api.post("/api/user/signup", {
        loginId,
        password,
        nickname,
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const { errorMessage } = error.response.data;

      alert(errorMessage);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 사용자 정보 조회
export const __getUserInfo = createAsyncThunk(
  "getUserInfo",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/api/user/${payload}`);
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
      const response = await api.put(`/api/user/${userId}`, formData);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const userApis = {
//   // 로그아웃
//   logout: () => api.put("/api/user/logout", {}),
//   // 아이디 중복검사
//   chkLoginIdDup: (loginId) => api.get(`/api/user/signup/${loginId}`),
//   // 닉네임 중복검사
//   chkNicknameDup: (nickname) => api.get(`/api/user/signup/${nickname}`),
// };
