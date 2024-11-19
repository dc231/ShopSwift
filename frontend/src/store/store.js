import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '../features'

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: rootReducer,
})
export default store
