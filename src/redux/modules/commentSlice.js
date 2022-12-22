import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};
//댓글 조회
export const __getCommentsData = createAsyncThunk(
  "getComments",
  async (payload, thunkAPI) => {
    try {
      const {
        data: { comments },
      } = await api.get(`/api/post/${payload}/comments`);
      return thunkAPI.fulfillWithValue(comments);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
//댓글 생성
export const __postCommentsData = createAsyncThunk(
  "postComments",
  async ({ params, newComment }, thunkAPI) => {
    try {
      const { data } = await api.post(
        `/api/post/${params}/comments`,
        newComment
      );
      const {
        data: { comments },
      } = await api.get(`/api/post/${params}/comments`);
      return thunkAPI.fulfillWithValue(comments);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
//댓글 수정
export const __putCommentsData = createAsyncThunk(
  "putComments",
  async ({ params, commentId, retouchedComment }, thunkAPI) => {
    try {
      await api.put(`/api/post/comments/${commentId}`, retouchedComment);
      const {
        data: { comments },
      } = await api.get(`/api/post/${params}/comments`);
      return thunkAPI.fulfillWithValue(comments);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
//댓글 삭제
export const __deleteCommentsData = createAsyncThunk(
  "deleteComments",
  async ({ params, commentId }, thunkAPI) => {
    try {
      await api.delete(`/api/post/comments/${commentId}`);
      const {
        data: { comments },
      } = await api.get(`/api/post/${params}/comments`);
      return thunkAPI.fulfillWithValue(comments);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//reducer
export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // __getPostsData
      .addCase(__getCommentsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(__getCommentsData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.comments = payload;
      })
      .addCase(__getCommentsData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // -----------------------------------------------------------------
      // __postCommentsData
      .addCase(__postCommentsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(__postCommentsData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.comments = payload;
      })
      .addCase(__postCommentsData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // -----------------------------------------------------------------
      // __putCommentsData
      .addCase(__putCommentsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(__putCommentsData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.comments = payload;
      })
      .addCase(__putCommentsData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // -----------------------------------------------------------------
      // __deleteCommentsData
      .addCase(__deleteCommentsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(__deleteCommentsData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.comments = payload;
      })
      .addCase(__deleteCommentsData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const {} = commentSlice.actions;
export default commentSlice;
