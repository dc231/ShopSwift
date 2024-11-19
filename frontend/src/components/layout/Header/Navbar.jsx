import React, { useEffect, useState } from 'react'
import { AiOutlineHeart } from "react-icons/ai"
import { BsFillBasket2Fill, BsPersonFill } from "react-icons/bs"
import { FaRegStar } from "react-icons/fa"
import { HiOutlineLogin } from "react-icons/hi"
import { IoCartOutline } from "react-icons/io5"
import { MdDashboard, MdDoNotDisturb, MdLogout } from "react-icons/md"
import { RxUpdate } from "react-icons/rx"
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '../../Avatar/Avatar'
import Input from './Input/Input'
import './Navbar.css'
const User_Menu = [
    {
        label: "My Account",
        icon: <BsPersonFill />,
        path: "/account/me"
    },
    {
        label: "My Orders",
        icon: <BsFillBasket2Fill />,
        path: "/account/orders"
    },
    {
        label: "Returns & Cancels",
        icon: <MdDoNotDisturb />,
        path: "/account/R&C"
    },
    {
        label: "My Ratings & Reviews",
        icon: <FaRegStar />,
        path: "/account/reviews"
    },
    {
        label: "My Wishlist",
        icon: <AiOutlineHeart />,
        path: "/account/wishlist"
    }
    , {
        label: "Change Password",
        icon: <RxUpdate />,
        path: "/account/password/change"
    }, {

        label: "Log out",
        icon: <MdLogout />,
        path: "/signOut"
    }
]
const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const { cartItems } = useSelector(state => state.cart)
    const { data, status } = useSelector(state => state.user)

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("")

    const searchSubmitHandler = (e) => {

        const url = `/products?product_name=${keyword}`
        e.preventDefault();
        if (keyword.trim()) {
            navigate(url)
        } else {
            navigate(`/products`)
        }
    }
    useEffect(() => {

    }, [cartItems, data, status])

    return (
        <nav className='nav-container'>

            <div className='nav'>
                <div className='nav-l-left'>
                    <Link to={'/'}> <span>Shop</span>Swift</Link>
                    <Input onSubmit={searchSubmitHandler} setKeyword={setKeyword} value={keyword} />



                </div>
                <div className='nav-l-right relative'>
                    <div onClick={e => setToggleMenu(!toggleMenu)} >
                        <Avatar user={data.user} />

                        {toggleMenu && (
                            data.user?.email ? <>
                                <div className="user-menus absolute">
                                    <div className='user-info'>
                                        <div>
                                            <Avatar user={data.user} size="xl" />
                                        </div>
                                        <div>
                                            <span>Hello,</span>
                                            <p>{data.user?.name ?? "Anonymous"}</p>
                                        </div>
                                    </div>
                                    {
                                        data.user.role === 'admin' &&
                                        <Link key={'/dashboard/analytics'} to={'/dashboard/analytics'} className='user-menu'>
                                            <MdDashboard />
                                            Dashboard
                                        </Link>
                                    }
                                    {


                                        User_Menu.map(menu => <Link key={menu.path} to={menu.path} className='user-menu'>
                                            {menu?.icon}
                                            {menu.label}</Link>)
                                    }
                                </div>
                            </> : <>
                                <div className="user-menus absolute">
                                    <Link to={"/login"} className='user-menu'>
                                        <HiOutlineLogin size={22} />
                                        Login</Link>
                                </div>
                            </>
                        )}

                    </div>
                    <Link to='/cart' className='cartSVG icon'>
                        <IoCartOutline size={24} /><span hidden>Cart</span>
                        {cartItems.length > 0 && <span className='cartItemCount'>{cartItems.length}</span>}
                    </Link>
                </div>
            </div>

        </nav>
    )
}

export default Navbar