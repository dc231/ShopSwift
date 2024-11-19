import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { TbArrowNarrowRight } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import { clearErrors, loginUser } from '../../features/user/userSlice';
import "./Login.css";


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const queryParams = new URLSearchParams(location.search);

    const { data, loading, error } = useSelector(state => state.user)

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email: loginEmail, password: loginPassword }));
    };
    useEffect(() => {

        if (data && data?.user?.email) {
            const redirectTo = queryParams?.get("redirect") ?? "account/me"
            navigate(`/${redirectTo}`)
        }

        if (location.pathname === '/signOut') {
            dispatch(logout())
        }
        if (error) {
            toast.error(error.message)
            dispatch(clearErrors())
        }
    }, [data, dispatch, error, location, location.pathname, navigate, queryParams])
    return (
        <div className='login_container'>
            <div className='left'>
                <div className='form_container'>

                    <h2 >Sign In</h2>
                    <p className='login-text'>
                        Great to see you again! <br /> Please sign in to access your account and explore the latest deals, track your orders, and enjoy a seamless shopping experience
                    </p>
                    <form className="sign_in-form">

                        <div className='input_box'>
                            <span>Email</span>
                            <input type="text" placeholder='abc@gmail.com' onChange={e => setLoginEmail(e.target.value)} />
                        </div>

                        <div className='input_box relative'>
                            <span>Password</span>
                            <Link className='absolute label-optional' to={'/password/forgot'}>Forgot Password?</Link>
                            <input type="password" placeholder='12345678' onChange={e => setLoginPassword(e.target.value)} />
                        </div>

                        <div>
                            <button className='btn btn-primary' onClick={loginSubmit} disabled={loading}>Sign In
                                <span>
                                    {
                                        loading ? <span className='loader' /> : <TbArrowNarrowRight size={18} />
                                    }
                                </span>
                            </button>
                        </div>
                    </form>
                    <p className='link'>I don't have an account ? <Link to={'/signup'}>Sign Up</Link></p>
                </div>
            </div>
            <div className='right'>
                <img src="signIn.png" alt="" />
            </div>
        </div>
    )
}

export default Login