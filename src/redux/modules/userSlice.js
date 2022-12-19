import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userId: 1,
    image:
      "https://communiteuser.s3.ap-northeast-2.amazonaws.com/1671435799477__.jpg",
    nickname: "전유진",
    createdAt: "2000-10-26T00:00:00.000Z",
    updatedAt: "2022-12-19T07:43:30.000Z",
  },
  loginId: null,
  nickname: null,
  is_login: true,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfo: (state, action) => {
      state.user = action.payload;
      state.is_login = true;
    },
  },
  extraReducers: {},
});

export const { getUserInfo } = userSlice.actions;
export default userSlice;
