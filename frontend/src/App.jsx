import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import ScrollToTop from './ScrollToTop'
import AdminAnalytics from './components/Admin/AdminAnalytics/AdminAnalytics.jsx'
import NewProduct from './components/Admin/NewProduct'
import OrderList from './components/Admin/OrderList.jsx'
import ProductList from './components/Admin/ProductList.jsx'
import ProductReviews from './components/Admin/ProductReviews.jsx'
import Sidebar from './components/Admin/Sidebar'
import UpdateOrder from './components/Admin/UpdateOrder.jsx'
import UpdateProduct from './components/Admin/UpdateProduct.jsx'
import UpdateUser from './components/Admin/UpdateUser.jsx'
import UserList from './components/Admin/UserList'
import Cart from './components/Cart/Cart.jsx'
import ConfirmOrder from './components/Cart/ConfirmOrder.jsx'
import PaymentSuccess from './components/Cart/PaymentSuccess.jsx'
import ProcessPayment from './components/Cart/ProcessPayment.jsx'
import Shipping from './components/Cart/Shipping.jsx'
import Home from './components/Home/Home'
import MyOrderDetails from './components/Order/MyOrderDetails.jsx'
import MyOrders from './components/Order/MyOrders.jsx'
import ProductDetail from './components/Product/ProductDetail/ProductDetail'
import Products from './components/Product/Products'
import ProductListPage from './components/ProductList/ProductList'
import ProtectedRoutes, { ProtectedRoutesAdmin } from './components/Routes/ProtectedRoute'
import TandC from './components/T&C/TandC'
import ForgotPassword from './components/User/ForgotPassword.jsx'
import Login from './components/User/Login'
import MyAccountInfo from './components/User/MyAccountInfo'
import ResetPassword from './components/User/ResetPassword.jsx'
import SignUp from './components/User/SignUp'
import UpdatePassword from './components/User/UpdatePassword.jsx'
import UpdateProfile from './components/User/UpdateProfile.jsx'
import Navbar from './components/layout/Header/Navbar'
import { loadUser } from './features/user/userSlice'

function App() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadUser())
    })

    return (
        <Router>

            <Navbar />
            <ScrollToTop />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/signUp' element={<SignUp />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/signOut' element={<Login />} />
                <Route exact path='/password/forgot' element={<ForgotPassword />} />
                <Route exact path='/password/reset/:token' element={<ResetPassword />} />
                <Route exact path='/products' element={<ProductListPage />} />
                <Route exact path='/product/:productId' element={<ProductDetail />} />
                <Route path='/products/:keyword' element={<Products />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/dashboard/term-condition' element={<TandC />} />

                {/* Protected User Routes */}
                <Route element={<ProtectedRoutes />}>
                    <Route exact path='/account' element={<Sidebar />} />
                    <Route exact path='/account/me' element={<MyAccountInfo />} />
                    <Route exact path='/me/update' element={<UpdateProfile />} />
                    <Route exact path='/password/update' element={<UpdatePassword />} />
                    <Route exact path='/shipping' element={<Shipping />} />
                    <Route exact path='/account/orders' element={<MyOrders />} />
                    <Route exact path='/account/orders/:id' element={<MyOrderDetails />} />
                    <Route exact path='/order/confirm' element={<ConfirmOrder />} />
                    <Route exact path='/process/payment' element={<ProcessPayment />} />
                    <Route exact path='/success' element={<PaymentSuccess />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<ProtectedRoutesAdmin />}>
                    <Route isAdmin={true} path='/dashboard/analytics' element={<AdminAnalytics />} />
                    <Route isAdmin={true} path='/dashboard/products/all' element={<ProductList />} />
                    <Route isAdmin={true} path='/dashboard/products/new' element={<NewProduct />} />
                    <Route isAdmin={true} path='/dashboard/products/:id' element={<UpdateProduct />} />
                    <Route isAdmin={true} path='/dashboard/orders/all' element={<OrderList />} />
                    <Route isAdmin={true} path='/dashboard/orders/:id' element={<UpdateOrder />} />
                    <Route isAdmin={true} path='/dashboard/users' element={<UserList />} />
                    <Route isAdmin={true} path='/dashboard/users/:id' element={<UpdateUser />} />
                    <Route isAdmin={true} path='/dashboard/reviews' element={<ProductReviews />} />
                </Route>
            </Routes>

        </Router>
    )
}

export default App
