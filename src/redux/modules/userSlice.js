import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userId: 1,
    image:
      "https://communiteuser.s3.ap-northeast-2.amazonaws.com/1671378502336_applewatch.jpg",
    nickname: "수정체크",
    createdAt: "2000-10-26T00:00:00.000Z",
    updatedAt: "2022-12-18T16:03:06.000Z",
  },
  loginId: null,
  nickname: null,
  is_login: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = userSlice.actions;
export default userSlice;
