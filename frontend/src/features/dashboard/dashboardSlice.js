import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosClient, retryThunk } from '../../config/Constants'

const initialState = {
    status: 'idle',
    error: null,
    data: [],
}

const dashboardSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearErrors(state) {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state, action) => {
                state.status = 'loading'
            })

            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.data = []
                state.error = action.error
            })
    },
})

// ================REDUCER ASYNC FUNCTION (THUNK)=====================

const fetchAdminProducts = createAsyncThunk(
    'dashboard/fetchAdminProducts',
    retryThunk(async () => {
        const res = await AxiosClient.get('/api/v1/admin/products')
        return res.data
    })
)
// Extract the action creators object and the reducer
const { actions, reducer } = dashboardSlice

// Extract and export each action creator by name
export const { clearErrors } = actions
export { fetchAdminProducts }
// Export the reducer, either as a default or named export
export default reducer
