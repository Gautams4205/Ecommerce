import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUser, fetchLoggedInUserOrders, UpdateUser } from "./userAPI";

const initialState = {
  userOrders: [],
  userInfo:null,
  status: "idle",
};

export const fetchLoggedInUserAsync = createAsyncThunk("user/fetchLoggedInUser", async (userId) => {
  const response = await fetchLoggedInUser(userId);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});
export const fetchLoggedInUserOrdersAsync = createAsyncThunk("user/fetchLoggedInUserOrders", async (userId) => {
  const response = await fetchLoggedInUserOrders(userId);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const UpdateUserAsync = createAsyncThunk("user/UpdateUser", async (userId) => {
  const response = await UpdateUser(userId);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(UpdateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
  },
});

export const { increment } = userSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
