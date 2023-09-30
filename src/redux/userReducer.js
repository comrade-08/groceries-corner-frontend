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
    const response = await fetch(usersBackendURL)
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
    const response = await fetch(usersBackendURL, options)
    if (response.ok) {
        const jsonResponse = response.json()
        return jsonResponse
    } else {
        return rejectWithValue({ error: 'User not registered' })
    }
})

export const loginUser = createAsyncThunk('users/loginUser', async (user, rejectWithValue) => {
    const response = await fetch(usersBackendURL)
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
            session.setisLoginUser(JSON.stringify(action.payload))
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
                state.users = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.userListLoader = false
                state.userListError = action.payload
            })
            .addCase(registerUser.pending, (state) => {
                state.registerLoader = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.registerLoader = false
                state.registerError = ''
                state.users.push(action.payload)
                commonHelpers.showMsg(translate('registerSuccess'), 'success')
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registerLoader = false
                state.registerError = action.payload
            })
            .addCase(loginUser.pending, (state) => {
                state.registerLoader = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.registerLoader = false
                state.registerError = ''
                state.users = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.registerLoader = false
                state.registerError = action.payload
            })
    }
})

export const { setisLogin, forgotUser, setLanguage } = userSlice.actions

export default userSlice.reducer