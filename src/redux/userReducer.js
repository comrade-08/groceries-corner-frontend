import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { usersBackendURL } from '../config/config'
import commonHelpers from '../helpers/CommonHelper'
import translate from '../languages/translater'
import session from '../helpers/session'

const initialState = {
  forgotDetails: {
    mobileNumber: null,
    sendSMS: false
  },
  activeUser: {
    userName: '',
    mobileNumber: '',
    address: '',
    password: ''
  },
  lang: '',
  users: [],
  userListError: '',
  userListLoader: false,
  registerError: '',
  registerLoader: false,
  loginError: '',
  loginLoader: false,
  isLoginUser: false
}

// getUsers
export const getUsers = createAsyncThunk('users/getUsers', async (_, rejectWithValue) => {
  const response = await fetch(usersBackendURL + 'get-users')
  if (response.ok) {
    const jsonResponse = response.json()
    return jsonResponse
  } else {
    return rejectWithValue({ error: 'No users found' })
  }
})

// registerUser
export const registerUser = createAsyncThunk('users/registerUser', async (user, rejectWithValue) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }
  const response = await fetch(usersBackendURL + 'register', options)
  if (response.ok) {
    const jsonResponse = response.json()
    return jsonResponse
  } else {
    return rejectWithValue({ error: 'User not registered' })
  }
})

export const loginUser = createAsyncThunk('users/loginUser', async (user, rejectWithValue) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }
  const response = await fetch(usersBackendURL + 'login', options)
  if (response.ok) {
    const jsonResponse = response.json()
    return jsonResponse
  } else {
    return rejectWithValue({ error: 'User not found' })
  }
})

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setisLogin: (state, action) => {
      state.activeUser = action.payload
      session.setIsLoginUser(JSON.stringify(action.payload))
    },

    forgotUser: (state, action) => {
      state.forgotDetails.mobileNumber = action.payload.mobileNumber ? action.payload.mobileNumber : ''
      state.forgotDetails.sendSMS = action.payload.sendSMS ? action.payload.sendSMS : ''
    },

    setLanguage: (state, action) => {
      state.lang = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.userListLoader = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.userListLoader = false
        state.userListError = ''
        state.users = action.payload.response
        console.log(action.payload.response)
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.userListLoader = false
        state.userListError = action.payload.response
      })
      .addCase(registerUser.pending, (state) => {
        state.registerLoader = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoader = false
        state.registerError = ''
        state.users.push(action.payload.response)
        commonHelpers.showMsg(translate('registerSuccess'), 'success')
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoader = false
        state.registerError = action.payload.response
        commonHelpers.showMsg(action.payload.response, 'error')
      })
      .addCase(loginUser.pending, (state) => {
        state.registerLoader = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.registerLoader = false
        state.registerError = ''
        session.setIsLoginUser(action.payload)
        commonHelpers.showMsg(translate('loginSuccess', state.lang), 'success')
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.registerLoader = false
        state.registerError = action.payload
        commonHelpers.showMsg(action.payload.response, 'error')
      })
  }
})

export const { setisLogin, forgotUser, setLanguage } = userSlice.actions

export default userSlice.reducer