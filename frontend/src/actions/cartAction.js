import { AxiosClient } from '../config/Constants'
import {
    ADD_TO_CARD,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
} from '../constants/cartConstants'

//Add to Card ser Action
export const addItemToCart = (id, quantity) => async (dispatch) => {
    const { data } = await AxiosClient.get(`/api/v1/product/${id}`)

    dispatch({
        type: ADD_TO_CARD,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        },
    })
}

//Remove From the Cart
export const removeItemFromCart = (id) => async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
}

//Remove From the Cart
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({ type: SAVE_SHIPPING_INFO, payload: data })
}
