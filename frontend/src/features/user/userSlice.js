import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosClient } from '../../config/Constants'

const initialState = {
    status: 'idle',
    error: null,
    data: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearErrors(state) {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.status = 'loading'
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed'
                state.data = []
                state.error = action.error
            })
            .addCase(loadUser.pending, (state, action) => {
                state.status = 'loading'
            })

            .addCase(loadUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.status = 'failed'
                state.data = []
                state.error = action.error
            })
    },
})

// ================REDUCER ASYNC FUNCTION (THUNK)=====================

const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }) => {
        const { data } = await AxiosClient.post(`/api/v1/login`, {
            email,
            password,
        })
        return data
    }
)

const loadUser = createAsyncThunk('user/load', async () => {
    const { data } = await AxiosClient.get(`/api/v1/me`)
    return data
})

const logOutUser = createAsyncThunk('user/logOut', async () => {
    await AxiosClient.get(`/api/v1/logout`)
})
// Extract the action creators object and the reducer
const { actions, reducer } = userSlice

// Extract and export each action creator by name
export const { clearErrors } = actions
export { loginUser, logOutUser, loadUser }
// Export the reducer, either as a default or named export
export default reducer
