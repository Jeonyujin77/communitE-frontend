import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

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
      } = await api.get(`/api/posts`);
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
      } = await api.get(`/api/posts/${payload}`);
      return thunkAPI.fulfillWithValue(post);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
// 게시물 생성
export const __postPostData = createAsyncThunk(
  "postPost",
  async (payload, thunkAPI) => {
    try {
      await api.post(`/api/posts`, payload, {
        headers: {
          "content-type": "multipart/form-data",
          accept: "multipart/form-data,",
        },
      });
      const {
        data: { posts },
      } = await api.get(`/api/posts/`);
      return thunkAPI.fulfillWithValue(posts);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
// 게시물 수정
export const __putPostData = createAsyncThunk(
  "putPost",
  async ({ params, formData }, thunkAPI) => {
    try {
      await api.put(`/api/posts/${params}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          accept: "multipart/form-data,",
        },
      });
      const {
        data: { post },
      } = await api.get(`/api/posts/${params}`);
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
      await api.delete(`/api/posts/${payload}`);
      const {
        data: { posts },
      } = await api.get(`/api/posts`);
      return thunkAPI.fulfillWithValue(posts);
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
      // __postPostData
      .addCase(__postPostData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(__postPostData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.posts = payload;
      })
      .addCase(__postPostData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // -----------------------------------------------------------------
      // __putPostData
      .addCase(__putPostData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(__putPostData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.post = payload;
      })
      .addCase(__putPostData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // -----------------------------------------------------------------
      // __deletePostData
      .addCase(__deletePostData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(__deletePostData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.posts = payload;
      })
      .addCase(__deletePostData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { getPostData } = postSlice.actions;
export default postSlice;
