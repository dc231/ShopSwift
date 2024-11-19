import React, { useState } from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import { Backdrop } from '@material-ui/core'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { logout } from '../../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

const UserOptions = ({ user }) => {
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cart)

    const navigate = useNavigate()

    const dashboard = () => navigate('/admin/dashboard')
    const Orders = () => navigate('/orders')
    const Account = () => navigate('/account')
    const Cart = () => navigate('/cart')
    const logoutUser = () => {
        dispatch(logout())
        toast.success('Logout Succesfully! ')
    }
    const Options = [
        { icon: <ListAltIcon />, name: 'Orders', func: Orders },
        { icon: <PersonIcon />, name: 'Profile', func: Account },
        {
            icon: (
                <ShoppingCartIcon
                    style={{
                        color:
                            cartItems.length > 0 ? 'var(--color-primary)' : '',
                    }}
                />
            ),
            name: `Cart(${cartItems.length})`,
            func: Cart,
        },
        { icon: <ExitToAppIcon />, name: 'Logout', func: logoutUser },
    ]
    if (user?.role === 'admin') {
        Options.unshift({
            icon: <DashboardIcon />,
            name: 'Dashboard',
            func: dashboard,
        })
    }
    const [open, setOpen] = useState(false)

    return (
        <>
            <Backdrop open={open} style={{ zIndex: '9' }} />
            <SpeedDial
                ariaLabel="SpeedDial Tooltip Example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: '10' }}
                open={open}
                className="speedDial"
                direction="down"
                icon={
                    <img
                        className="speedDialIcon"
                        src={
                            user?.avatar.url
                                ? user.avatar.url
                                : '/UserProfile.png'
                        }
                        alt="Profile"
                    />
                }
            >
                {Options.map((option) => (
                    <SpeedDialAction
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                        key={option.name}
                        icon={option.icon}
                        tooltipTitle={option.name}
                        onClick={option.func}
                    />
                ))}
            </SpeedDial>
        </>
    )
}

export default UserOptions
