import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
    combineReducers,
} from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from '../reducers/cartReducer'
import {
    allOrdersReducer,
    myOrderDetailsReducer,
    myOrdersReducer,
    newOrderReducer,
    orderReducer,
} from '../reducers/orderReducer'
import {
    newProductReducer,
    newReviewReducer,
    productDetailsReducer,
    productReducer,
    productReviewsDetailsReducer,
    productsReducer,
    revieswReducer,
} from '../reducers/productReducer'
import {
    allUsersReducer,
    forgotPasswordReducer,
    profileReducer,
    tokenReducer,
    userDetailsReducer,
    userReducer,
} from '../reducers/userReducer'

const reducer = combineReducers({
    authToken: tokenReducer,
    products: productsReducer,
    product: productReducer,
    productDetails: productDetailsReducer,
    authData: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: myOrderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsDetailsReducer,
    review: revieswReducer,
})

function saveToLacalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store)
        window.localStorage.setItem('store', serializedStore)
    } catch (err) {
        console.log(err)
    }
}

function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('store')
        if (serializedStore === null) return undefined
        return JSON.parse(serializedStore)
    } catch (err) {
        console.log(err)
        return undefined
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistedState = loadFromLocalStorage()

const store = createStore(
    reducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
)

store.subscribe(() => saveToLacalStorage(store.getState()))

export default store
