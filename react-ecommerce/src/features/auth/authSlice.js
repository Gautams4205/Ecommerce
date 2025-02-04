import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CheckUser, CreateUser, SignOut } from "./authAPI";
import { UpdateUser } from "../user/userAPI";

const initialState = {
  loggedInUser: null,
  error: null,
  status: "idle",
};

export const CreateUserAsync = createAsyncThunk("auth/CreateUser", async (data) => {
  const response = await CreateUser(data);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});
export const UpdateUserAsync = createAsyncThunk("auth/UpdateUser", async (update) => {
  const response = await UpdateUser(update);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});
export const CheckUserAsync = createAsyncThunk("auth/CheckUser", async (logindata, { rejectWithValue }) => {
  try {
    const response = await CheckUser(logindata);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const SignOutAsync = createAsyncThunk("auth/SignOut", async (UserId) => {
  const response = await SignOut(UserId);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CreateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(CheckUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CheckUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(CheckUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload.error;
      })
      .addCase(UpdateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(SignOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SignOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      });
  },
});

export const { increment } = authSlice.actions;

export const selectloggedInUser = (state) => state.auth.loggedInUser;
export const selecterror = (state) => state.auth.error;

export default authSlice.reducer;
