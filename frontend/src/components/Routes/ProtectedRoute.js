import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../layout/Loader/Loader'

const ProtectedRoutes = () => {
    const { status, data } = useSelector((state) => state.user)
    useEffect(() => {}, [data, status])
    return status !== 'succeeded' ? (
        <Loader />
    ) : data.user?.email ? (
        <Elements
            stripe={loadStripe(
                'pk_test_51MfGEmSFoYXjK6ahTQWkGAkRpdkVcW8cekaQrpUyQdlv8DoqXzU5cHlevv6B664nfqNmJbSLkSiM7w1KOANCBVMV00SHK5U1cu'
            )}
        >
            <Outlet />
        </Elements>
    ) : (
        <Navigate to={'/login'} />
    )
}

export const ProtectedRoutesAdmin = ({ isAdmin }) => {
    const { status, data } = useSelector((state) => state.user)

    useEffect(() => {}, [data, status])
    return status !== 'succeeded' ? (
        <Loader />
    ) : isAdmin && data?.user?.role !== 'admin' ? (
        <Navigate to={'/login'} />
    ) : (
        <Outlet />
    )
}

export default ProtectedRoutes
