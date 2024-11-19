import React, { useEffect, useState } from 'react';
import { TbArrowNarrowRight } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearErrors, register } from '../../actions/userActions';
import { toast } from 'react-hot-toast'
import "./SignUp.css";
const SignUp = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { loading, error, isAuthenticated } = useSelector(
        (state) => state.authData
    );

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        avatar: 'https://img.icons8.com/?size=3000&id=ywULFSPkh4kI&format=png'
    });



    const registerSubmit = (e) => {
        console.log("USER", user);
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('name', user.name);
        myForm.set('email', user.email);
        myForm.set('password', user.password);
        myForm.set('avatar', user.avatar);
        dispatch(register(myForm));
    };

    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate("/account/me")
        }

    }, [dispatch, error, isAuthenticated, navigate, location.search, user]);

    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setUser({ ...user, [e.target.name]: reader.result });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    return (
        <div className='singup_container'>
            <div className='left'>
                <div className='form_container'>

                    <h2 >Create an account!</h2>
                    <p className='login-text'>
                        Unlock exclusive deals and personalized shopping. Create your account now for a seamless experience. Let's get started!
                    </p>
                    <form className="sign_in-form">

                        <div id="input_box" className='avatar'>

                            <label htmlFor="registerImage">
                                <img
                                    className="registerImage"
                                    src={user?.avatar}
                                    alt="Avatar Preview"
                                />
                            </label>

                            <input
                                id='registerImage'
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={registerDataChange}
                                hidden
                            />
                        </div>
                        <div className='input_box'>
                            <span>Name</span>
                            <input type="text" name='name' placeholder='John Doe' onChange={e => registerDataChange(e)} />
                        </div>

                        <div className='input_box'>
                            <span>Email</span>
                            <input type="text" name='email' placeholder='john2023@gmail.com' onChange={e => registerDataChange(e)} />
                        </div>

                        <div className='input_box relative'>
                            <span>Password</span>
                            <input type="password" name='password' placeholder='john@12345678' onChange={e => registerDataChange(e)} />
                        </div>

                        <div>
                            <button className='btn btn-primary' onClick={registerSubmit}>Sign Up
                                <span>
                                    {
                                        loading ? <span className='loader' /> : <TbArrowNarrowRight size={18} />
                                    }
                                </span>

                            </button>
                        </div>
                    </form>
                    <p className='link'>Already have an account ? <Link to={'/login'}>Sign In</Link></p>
                </div>
            </div>
            <div className='right'>
                <img src="/signUp.png" alt="" />
            </div>
        </div>
    )
}

export default SignUp