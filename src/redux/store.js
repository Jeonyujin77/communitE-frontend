import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commentSlice from "./modules/commentSlice";
import postSlice from "./modules/postSlice";
import userSlice from "./modules/userSlice";

const rootReducer = combineReducers({
  posts: postSlice.reducer,
  comments: commentSlice.reducer,
  user: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production", // dev 환경에서만 redux devtool이 활성화
});
