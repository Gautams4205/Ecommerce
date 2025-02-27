import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchAllOrders, UpdateOrder } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
  totalOrders: 0,
};

export const createOrderAsync = createAsyncThunk("order/createOrder", async (order) => {
  const response = await createOrder(order);
  return response.data;
});

export const UpdateOrderAsync = createAsyncThunk("order/UpdateOrder", async (order) => {
  const response = await UpdateOrder(order);
  return response.data;
});

export const fetchAllOrdersAsync = createAsyncThunk("order/fetchAllOrders", async ({ Sort, Pagination }) => {
  const response = await fetchAllOrders(Sort, Pagination);
  return response.data;
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(UpdateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex((order) => order.id === action.payload.id);
        state.orders[index] = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.data;
        state.totalOrders = action.payload.items;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;

export default orderSlice.reducer;
