import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddtoCart, DeleteItemfromCart, fetchItemsByUserId, resetCart, UpdateCart } from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const AddtoCartAsync = createAsyncThunk("cart/AddtoCart", async (item) => {
  const response = await AddtoCart(item);
  
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});
export const fetchItemsByUserIdAsync = createAsyncThunk("cart/fetchItemsByUserId", async (UserId) => {
  const response = await fetchItemsByUserId(UserId);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const UpdateCartAsync = createAsyncThunk("cart/UpdateCart", async (update) => {
  const response = await UpdateCart(update);
  return response.data;
});

export const DeleteItemfromCartAsync = createAsyncThunk("cart/DeleteItemfromCart", async (itemId) => {
  const response = await DeleteItemfromCart(itemId);
  return response.data;
});

export const resetCartAsync = createAsyncThunk("cart/resetCart", async (userId) => {
  const response = await resetCart(userId);
  return response.data;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddtoCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddtoCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(UpdateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(DeleteItemfromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteItemfromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        state.items.splice(index,1)
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items=[]
      });
  },
});

export const { increment } = cartSlice.actions;

export const selectitems = (state) => state.cart.items;

export default cartSlice.reducer;
