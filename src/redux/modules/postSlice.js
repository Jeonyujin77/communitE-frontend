import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../node_modules/axios/index";

const initialState = {
  posts: [],
  post: {},
  isLoading: false,
  error: null,
};

//thunks
//전체 리스트
export const __getPostsData = createAsyncThunk(
  "getPosts",
  async (payload, thunkAPI) => {
    try {
      const {
        data: { posts },
      } = await axios.get(`${process.env.REACT_APP_URL}/api/posts`);
      return thunkAPI.fulfillWithValue(posts);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
//상세 조회
export const __getPostData = createAsyncThunk(
  "getPost",
  async (payload, thunkAPI) => {
    try {
      const {
        data: { post },
      } = await axios.get(`${process.env.REACT_APP_URL}/api/posts/${payload}`);
      return thunkAPI.fulfillWithValue(post);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
// 게시물 삭제
export const __deletePostData = createAsyncThunk(
  "deletePost",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_URL}/api/posts/${payload}`
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//reducer
export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // __getPostsData
      .addCase(__getPostsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(__getPostsData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.posts = payload;
      })
      .addCase(__getPostsData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // -----------------------------------------------------------------
      // __getPostData
      .addCase(__getPostData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(__getPostData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.post = payload;
      })
      .addCase(__getPostData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // -----------------------------------------------------------------
      // __deletePostData
      .addCase(__deletePostData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(__deletePostData.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(__deletePostData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { getPostData } = postSlice.actions;
export default postSlice;
