
import './OrderSuccess.css'
import { Link } from 'react-router-dom';


const PaymentSuccess = () => {
    const { orderInfo } = window.sessionStorage;
    const data = JSON.parse(orderInfo || {})

    return (
        <div className="order-success">
            <img src="./success.gif" alt="" />

            <div className='order-tag'>Total amount</div>
            <div className='order-price'>${data && data?.totalPrice}</div>
            <div className='order-status'>Payment successful</div>
            <p>Congratulations, your payment was
                successfully processed</p>
            <Link to={'/order/me'}>View My Orders</Link>
        </div>
    )
}

export default PaymentSuccess