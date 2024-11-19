import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosClient } from '../../config/Constants'

const initialState = {
    status: 'idle',
    error: null,
    data: [],
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearErrors(state) {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductDetails.pending, (state, action) => {
                state.status = 'loading'
            })

            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.status = 'failed'
                state.data = []
                state.error = action.error
            })
    },
})

// ================REDUCER ASYNC FUNCTION (THUNK)=====================
export const retryThunk =
    (apiRequest, retries = 3, delay = 1000) =>
    async () => {
        console.log('API Retry thunk')
        console.log(apiRequest)
        let retryCount = 0
        let lastError = null

        while (retryCount < retries) {
            try {
                const response = await apiRequest
                return response.data
            } catch (error) {
                lastError = error
                retryCount++
                await new Promise((resolve) => setTimeout(resolve, delay))
            }
        }

        throw lastError // If all retries fail, throw the last error
    }

const fetchProductDetails = createAsyncThunk(
    'products/fetchProductDetail',
    async (productId) => {
        let retries = 3
        let delay = 1000
        let retryCount = 0
        let lastError = null

        while (retryCount < retries) {
            try {
                const response = await AxiosClient.get(
                    '/api/v1/product/' + productId
                )
                return response.data
            } catch (error) {
                lastError = error
                retryCount++
                await new Promise((resolve) => setTimeout(resolve, delay))
            }
        }

        throw lastError
    }
)
// Extract the action creators object and the reducer
const { actions, reducer } = productsSlice

// Extract and export each action creator by name
export const { clearErrors } = actions
export { fetchProductDetails }
// Export the reducer, either as a default or named export
export default reducer
