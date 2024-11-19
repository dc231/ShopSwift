import { RiDeleteBack2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from '../../actions/cartAction';
import './Cart.css';
import CardItemCard from './CartItemCard.jsx';



const Cart = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { cartItems } = useSelector(state => state.cart)
	const increaseQuantity = (id, quantity, stock) => {
		const newQty = quantity + 1;
		if (stock <= quantity) return;
		dispatch(addItemToCart(id, newQty));
	}
	const deleteCartItem = (id) => {
		dispatch(removeItemFromCart(id));
	}

	const decreaseQuantity = (id, quantity, stock) => {
		const newQty = quantity - 1;
		if (1 >= quantity) return;
		dispatch(addItemToCart(id, newQty));
	}

	const checkOutHandler = () => {
		navigate('/login?redirect=shipping')
	}
	return (
		<>
			{
				cartItems.length === 0 ?
					(<div className="emptyCart">
						<img src="/empty-shopping-cart.png" alt="No Item  in cart" />
						<Link to={'/products'}>Continue Shopping</Link>
					</div>)
					:
					(
						<div className="cart_container">
							<h2 className='heading'>Your Shopping Bag</h2>
							<div className='cart'>
								<div className="cart_product-info">

									<div className="cart-header">
										<p>Product</p>

										<p>Quantity</p>

										<p>Subtotal</p>
									</div>
									{
										cartItems && cartItems.map((item) => (
											<div className="cartContainer" key={item.product}>
												<CardItemCard item={item} deleteCartItem={deleteCartItem} />
												<div className="cart-manage">

													<span onClick={() => decreaseQuantity(item.product, item.quantity, item.stock)}>-</span>

													<input type="number" value={item.quantity} readOnly />

													<span onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</span>

												</div>
												<div className='cart-info'>
													<p className='cartSubtotal'>{`₹${item.price * item.quantity}`}</p>
													<button className='cart_remove-btn' onClick={() => deleteCartItem(item.product)}><RiDeleteBack2Fill /></button>
												</div>
											</div>
										))
									}


								</div>
								<div>
									<div className="cart_price-info">
										<div className='cart_price-field'>
											<p className='cart-field'>Subtotal</p>
											<p className='cart-price'>{`₹${cartItems.reduce(
												(acc, item) => acc + item.quantity * item.price, 0)}`}</p>
										</div>

										<div className='cart_price-field'>
											<p className='cart-field'>Discounts</p>
											<p className='cart-price'>₹0.00</p>
										</div>
										<hr />
										<div className='cart_price-field'>
											<p className='cart-field'>Gross Total</p>
											<p className='cart-price'>{`₹${cartItems.reduce(
												(acc, item) => acc + item.quantity * item.price, 0)}`}</p>
										</div>
										<div className='cart_price-field'>
											<button className='cart_checkout-btn' onClick={checkOutHandler}>
												Checkout Now
											</button>
										</div>

									</div>
								</div>

							</div>
						</div >
					)
			}
		</>
	)
}

export default Cart
