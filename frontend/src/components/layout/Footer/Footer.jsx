import './footer.css'
import { FaCcStripe, FaCcVisa, FaCcAmazonPay, FaCcPaypal, FaGooglePay } from 'react-icons/fa'

import { SiAmericanexpress } from 'react-icons/si'
const Footer = () => {
    return (
        <footer id='footer'>
            <div className='h-container-1'>
                <div className='v-container'>
                    <div className='h-stack-1'>
                        <img src='https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e86ab4c21faa7bc0bd90dd_Logo.svg' alt='' />
                        <p>
                            Welcome to ShopSwift: Your one-stop destination for fast, secure, and stylish online shopping, anytime, anywhere
                        </p>
                    </div>
                    <div className='h-stack-2'>
                        <span className='li-heading'>Accepted Payments</span>
                        <div className='p-list-container'>
                            <span className='p-items'><FaCcStripe size={50} /></span>
                            <span className='p-items'><FaCcVisa size={50} /></span>
                            <span className='p-items'><FaCcAmazonPay size={50} /></span>
                            <span className='p-items'><SiAmericanexpress size={50} /></span>
                            <span className='p-items'><FaCcPaypal size={50} /></span>
                            <span className='p-items'><FaGooglePay size={50} /></span>
                        </div>
                    </div>
                </div>
                <div className='v-container'>
                    <span className='li-heading'>Department</span>
                    <span className='li-items'>Electronics & Gadgets</span>
                    <span className='li-items'>Fashion</span>
                    <span className='li-items'>Frozen Foods</span>
                    <span className='li-items'>Beavarages</span>
                    <span className='li-items'>Organic Grocery</span>
                    <span className='li-items'>Office Supplies</span>
                    <span className='li-items'>Beautiy Products</span>
                    <span className='li-items'>Books</span>
                    <span className='li-items'>Toys</span>
                    <span className='li-items'>Fitness</span>
                    <span className='li-items'>Snekers</span>
                    <span className='li-items'>Toys</span>
                    <span className='li-items'>Furnitures</span>
                </div>
                <div className='v-container'>
                    <span className='li-heading'>About Bettercart</span>
                    <span className='li-items'>Careers</span>
                    <span className='li-items'>News & Blogs</span>
                    <span className='li-items'>Shipping & Delivery</span>
                    <span className='li-items'>Help</span>
                    <span className='li-items'>Press Center</span>
                    <span className='li-items'>Shop by Location</span>
                    <span className='li-items'>Shopcart brands</span>
                    <span className='li-items'>Affiliates & Partners</span>
                    <span className='li-items'>Ideas & Guides</span>
                </div>
                <div className='v-container'>
                    <span className='li-heading'>Service</span>
                    <span className='li-items'>Gift Card</span>
                    <span className='li-items'>Mobile App</span>
                    <span className='li-items'>Shipping & Delivery</span>
                    <span className='li-items'>Order Pickup</span>
                    <span className='li-items'>Feedback</span>
                    <span className='li-items'>Account Signup</span>
                </div>
                <div className='v-container'>
                    <span className='li-heading'>Help</span>
                    <span className='li-items'>Bettercart Help</span>
                    <span className='li-items'>Returns</span>
                    <span className='li-items'>Track My Orders</span>
                    <span className='li-items'>Contact Us</span>
                    <span className='li-items'>Feedback</span>
                    <span className='li-items'>Security & Frauds</span>
                </div>
            </div>
            <div className='h-container-2'>
                <div className='v-container-2'>
                    <div>
                        Become Seller
                    </div>
                    <div>
                        Gift Cards
                    </div>
                    <div>
                        Help Centers
                    </div>
                </div>
                <div className='v-container-2'>
                    <div>
                        Terms of Use
                    </div>
                    <div>
                        Privacy Policy
                    </div>
                </div>
                <div className='v-container-2'>
                    <div>
                        All Right Reserved By Dheeraj Chaudhary | 2024
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer
