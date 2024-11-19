import productsReducer from './products/productsSlice'
import productDetailsReducer from './products/productDetails'
import cartReducer from './cart/cartSlice'
import userReducer from './user/userSlice'
import dashboardReducer from './dashboard/dashboardSlice'
export const rootReducer = {
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userReducer,
    dashboard: dashboardReducer,
}
