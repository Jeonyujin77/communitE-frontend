import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  post: {},
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPostsData: (state, action) => {
      state.posts = action.payload;
    },
    getPostData: (state, action) => {
      state.post = action.payload;
    },
  },
  extraReducers: {},
});

export const { getPostsData, getPostData } = postSlice.actions;
export default postSlice;
