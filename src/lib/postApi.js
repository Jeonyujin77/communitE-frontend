import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 예시
// export const __getTodos = createAsyncThunk(
//   "getTodos",
//   async (payload, thunkAPI) => {
//     try {
//       const response = await axios.get("http://localhost:3001/todos");
//       return thunkAPI.fulfillWithValue(response.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
