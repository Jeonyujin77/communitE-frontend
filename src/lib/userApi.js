import { createAsyncThunk } from "@reduxjs/toolkit";
// import { setCookie } from "../utils/Cookie";
import api from "./api";
// 로그인
export const __login = createAsyncThunk("login", async (payload, thunkAPI) => {
  const { loginId, password } = payload;

  try {
    const response = await api.post("/api/user/login", { loginId, password });
    const { accesstoken, refreshtoken } = response.headers;
    // access token 생성
    localStorage.setItem("accessToken", accesstoken);
    // setCookie("accessToken", accesstoken, 7);
    // refresh token 생성
    localStorage.setItem("refreshToken", refreshtoken);
    // setCookie("refreshToken", refreshtoken, 7);
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
      const { errorMessage } = error.response.data;

      alert(errorMessage);
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
      const response = await api.put(`/api/user/${userId}`, formData, {
        headers: {
          "content-type": "multipart/form-data;",
          accept: "multipart/form-data,",
          withCredentials: true,
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const { errorMessage } = error.response.data;

      alert(errorMessage);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 아이디, 닉네임 중복검사
export const __checkDuplicate = createAsyncThunk(
  "checkDuplicate",
  async (payload, thunkAPI) => {
    const text = payload;

    try {
      const response = await api.get(`/api/user/signup/${text}`);

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const { errorMessage } = error.response.data;

      alert(errorMessage);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
