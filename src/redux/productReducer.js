import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { productsBackendURL } from "../config/config"
import commonHelpers from "../helpers/CommonHelper"
import translate from "../languages/translater"

const initialState = {
  productListLoader: false,
  productListError: '',
  products: []
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
        state.productListLoader = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.productListLoader = false
        if (action.payload.status) {
          state.products = action.payload.response
          commonHelpers.showMsg('Products Retrieved', 'success')
        } else {
          state.productListError = action.payload.response
          commonHelpers.showMsg(action.payload.response, 'error')
        }
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.productListLoader = false
        state.productListError = translate('somethingWrong', state.lang)
        commonHelpers.showMsg(translate('somethingWrong', state.lang), 'error')
      })
  }
})

export default productSlice.reducer