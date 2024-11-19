
import { Link } from 'react-router-dom'
import './CartItemCard.css'

const CartItemCard = ({ item, deleteCartItem }) => {

    return (
        <div className='CartItemCard'>

            <img src={item.image} alt="" />
            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Price : $${item.price}`}</span>

            </div>
        </div>
    )
}

export default CartItemCard