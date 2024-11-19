import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userActions';
import Loader from '../layout/Loader/Loader';
import { useNavigate } from "react-router-dom";

import MetaData from '../layout/MetaData';
import './ForgotPassword.css';
import { TbArrowNarrowRight } from 'react-icons/tb';

const iPhone12 = {
    name: "Apple iPhone 12",
    description:
        "Experience Innovation Unleashed. Introducing the Apple iPhone 12 – a masterpiece of design, performance, and innovation. Elevate your mobile experience with cutting-edge technology and a sleek, iconic design that defines the epitome of modern smartphones.",
    features: [
        {
            title: "5G Connectivity",
            description:
                "Surf, stream, and connect at unprecedented speeds with the power of 5G technology. Experience lightning-fast downloads, low-latency gaming, and seamless video streaming like never before.",
        },
        {
            title: "Super Retina XDR Display",
            description:
                "Immerse yourself in a stunning visual experience with the Super Retina XDR display. Enjoy true-to-life colors, deep blacks, and a remarkable level of detail on the edge-to-edge 6.1-inch display. HDR content looks amazing with up to 1200 nits peak brightness.",
        },
        {
            title: "A14 Bionic Chip",
            description:
                "Unleash the power of the A14 Bionic chip, the fastest chip ever in a smartphone. Featuring a 6-core CPU and 4-core GPU, this chip delivers industry-leading performance and efficiency. Experience faster app launches, smoother animations, and improved machine learning capabilities.",
        },
        {
            title: "Dual-Camera System",
            description:
                "Capture professional-quality photos and videos with the dual-camera system. The 12MP Ultra-Wide and Wide lenses, along with Night mode, Deep Fusion, and Smart HDR 3, allow you to unleash your creativity and capture moments with incredible clarity in various lighting conditions.",
        },
        {
            title: "MagSafe Technology",
            description:
                "Explore a new era of accessories with MagSafe. The magnetic alignment ensures a secure and efficient connection for MagSafe-compatible accessories, including cases, wallets, and wireless chargers. Experience a whole new level of convenience and customization.",
        },
        {
            title: "iOS 15",
            description:
                "Stay at the forefront of innovation with the latest iOS 15. Enjoy new features such as Focus mode, Live Text in photos, redesigned notifications, and enhanced privacy controls. The seamless integration of hardware and software ensures a smooth and intuitive user experience.",
        },
        {
            title: "Ceramic Shield",
            description:
                "The front cover is infused with ceramic particles for enhanced durability, delivering four times better drop performance. The Ceramic Shield provides improved protection, making your iPhone 12 more resistant to everyday wear and tear.",
        },
    ],
    inTheBox: [
        "Apple iPhone 12",
        "USB-C to Lightning Cable",
        "Documentation",
    ],
    note:
        "Note: Apple iPhone 12 does not include a power adapter or EarPods, contributing to Apple's environmental goals.",
    slogan: "Choose Excellence. Choose iPhone 12.",
};

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword
    );
    const { token } = useSelector((state) => state.authToken);

    const [email, setEmail] = useState('');

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('email', email);
        myForm.set('token', token);
        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            toast.success(message);
        }
    }, [dispatch, error, message, token]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title={`Forgot Password`} />
                    <div className="container_wrapper">
                        <div className="container_main">
                            <h2>
                                Forgot your password?
                            </h2>
                            <p>Your Password will be reset by your email.</p>

                            <form
                                className="form"

                            >
                                <div className="form_input-container">
                                    <span>Enter your email address</span>
                                    <input
                                        type="email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    className=" btn btn-primary"
                                    disabled={loading}
                                    onClick={forgotPasswordSubmit}
                                >
                                    Next <span>
                                        {
                                            loading ? <span className='loader' /> : <TbArrowNarrowRight size={18} />
                                        }
                                    </span>
                                </button>
                                <button className='btn' onClick={e => navigate('/login')}>Back to log in</button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ForgotPassword;
