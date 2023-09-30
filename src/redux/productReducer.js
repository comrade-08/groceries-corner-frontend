import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { productsBackendURL } from "../config/config"

const initialState = {
  productsLoader: false,
  productsData: []
}

export const getProducts = createAsyncThunk('product/getProducts', async (_, rejectWithValue) => {
  const response = await fetch(productsBackendURL)
  if (response.ok) {
    const jsonResponse = response.json()
    return jsonResponse
  } else {
    return rejectWithValue({ error: 'No Products Found' })
  }
})

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.productsLoader = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.productsLoader = false
        state.userListError = ''
        state.productsData = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.productsLoader = false
        state.userListError = action.payload
      })
  }
})

export default productSlice.reducer