import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import productReducer from './productReducer'

export const store = configureStore({
    reducer: {
        userReducer: userReducer,
        productReducer: productReducer
    }
})