import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllproductByfilter, fetchAllcategories, fetchAllbrands, fetchProductbyId, createProduct, UpdateProduct } from "./ProductAPI";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
  brands: [],
  categories: [],
  selectedproduct: null,
};

export const fetchAllproductByfilterAsync = createAsyncThunk("product/fetchAllproductByfilter", async ({ filter, Sort, Pagination }) => {
  const response = await fetchAllproductByfilter(filter, Sort, Pagination);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const fetchAllcategoriesAsync = createAsyncThunk("product/fetchAllcategories", async () => {
  const response = await fetchAllcategories();
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const fetchProductbyIdAsync = createAsyncThunk("product/fetchProductbyId", async (id) => {
  const response = await fetchProductbyId(id);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const fetchAllbrandsAsync = createAsyncThunk("product/fetchAllbrands", async () => {
  const response = await fetchAllbrands();
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const createProductAsync = createAsyncThunk("product/createProduct", async (product) => {
  const response = await createProduct(product);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const UpdateProductAsync = createAsyncThunk("product/UpdateProduct", async (update) => {
  const response = await UpdateProduct(update);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct:(state)=>{
      state.selectedproduct = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllproductByfilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllproductByfilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.totalItems = action.payload.items;
      })
      .addCase(fetchAllcategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllcategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchAllbrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllbrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchProductbyIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductbyIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedproduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(UpdateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        state.products[index] = action.payload;
      });
  },
});

export const { clearSelectedProduct } = ProductSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.product.value)`
export const selectAllProduct = (state) => state.product.products;
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;
export const selecttotalItems = (state) => state.product.totalItems;
export const selectedproductbyId = (state) => state.product.selectedproduct;

export default ProductSlice.reducer;
