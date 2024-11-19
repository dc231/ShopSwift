import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosClient, retryThunk } from '../../config/Constants'

const initialState = { cartItems: [], shippingInfo: {} }

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearErrors(state) {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = 'loading'
            })

            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.data = []
                state.error = action.error
            })
    },
})

// ================REDUCER ASYNC FUNCTION (THUNK)=====================

const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    retryThunk(async () => {
        const res = await AxiosClient.get('/api/v1/products')
        return res.data
    })
)
// Extract the action creators object and the reducer
const { actions, reducer } = cartSlice

// Extract and export each action creator by name
export const { clearErrors } = actions
export { fetchProducts }
// Export the reducer, either as a default or named export
export default reducer
