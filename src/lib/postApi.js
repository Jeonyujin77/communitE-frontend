import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

// 사용자별 게시글 조회
export const __getUserPosts = createAsyncThunk(
  "getUserPosts",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/api/posts/user/${payload}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
