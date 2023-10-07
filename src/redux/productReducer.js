import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { productsBackendURL } from "../config/config"
import commonHelpers from "../helpers/CommonHelper"

const initialState = {
  productsLoader: false,
  productsData: []
}

export const getProducts = createAsyncThunk('product/getProducts', async (user, rejectWithValue) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }
  const response = await fetch(productsBackendURL + 'get-products', options)
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
        state.productsData = action.payload.response
        commonHelpers.showMsg('Products Retrieved', 'success')
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.productsLoader = false
        state.userListError = action.payload
        console.log(action.payload)
        commonHelpers.showMsg(action.payload, 'error')
      })
  }
})

export default productSlice.reducer