import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const res = await axios.get("https://fakestoreapi.com/products");
  return res.data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers:{

  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      });
  },
});

export default productSlice.reducer;