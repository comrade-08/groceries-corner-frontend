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
        if (action.payload.status) {
          state.users = action.payload.response
          console.log(action.payload.response)
        } else {
          state.userListError = action.payload.response
          commonHelpers.showMsg(action.payload.response, 'error')
        }
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.userListLoader = false
        state.userListError = translate('somethingWrong', state.lang)
        commonHelpers.showMsg(translate('somethingWrong', state.lang), 'error')
      })
      .addCase(registerUser.pending, (state) => {
        state.registerLoader = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoader = false
        if (action.payload.status) {
          state.users.push(action.payload.response)
          commonHelpers.showMsg(translate('registerSuccess', state.lang), 'success')
        } else {
          state.registerError = action.payload.response
          commonHelpers.showMsg(action.payload.response, 'error')
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoader = false
        state.registerError = translate('somethingWrong', state.lang)
        commonHelpers.showMsg(translate('somethingWrong', state.lang), 'error')
      })
      .addCase(loginUser.pending, (state) => {
        state.loginLoader = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoader = false
        if (action.payload.status) {
          session.setIsLoginUser(action.payload)
          commonHelpers.showMsg(translate('loginSuccess', state.lang), 'success')
        } else {
          state.loginError = action.payload.response
          commonHelpers.showMsg(action.payload.response, 'error')
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoader = false
        state.loginError = translate('somethingWrong', state.lang)
        commonHelpers.showMsg(translate('somethingWrong', state.lang), 'error')
      })
  }
})

export const { setisLogin, forgotUser, setLanguage } = userSlice.actions

export default userSlice.reducer