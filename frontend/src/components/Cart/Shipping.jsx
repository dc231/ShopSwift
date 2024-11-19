import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import PinDropIcon from '@mui/icons-material/PinDrop';
import PublicIcon from '@mui/icons-material/Public';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { Country, State } from 'country-state-city';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingInfo } from '../../actions/cartAction';
import CheckoutSteps from '../Cart/CheckoutSteps.jsx';
import MetaData from '../layout/MetaData';
import './Shipping.css';
const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    // const [address, setAddress] = useState("")
    // const [city, setCity] = useState("")
    // const [state, setState] = useState("")
    // const [country, setCountry] = useState("")
    // const [pinCode, setPinCode] = useState("")
    // const [phoneNo, setPhoneNo] = useState("")

    const [shippingDetails, setShippingDetails] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        phoneNo: ""
    })
    const shippingSubmit = (e) => {
        e.preventDefault();
        console.log(shippingDetails);
        if (shippingDetails?.phoneNo?.length !== 10) {
            toast.error("Phone Number is Not Valid ");
            return;
        }
        // const data = { cartItems, address, city, state, country, pinCode, phoneNo }
        dispatch(saveShippingInfo(shippingDetails))
        navigate('/order/confirm')
    }
    const handleChange = (e) => {
        console.log(shippingDetails);
        setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if (shippingInfo) {
            // setAddress(shippingInfo?.address)
            // setCity(shippingInfo?.city)
            // setState(shippingInfo?.state)
            // setCountry(shippingInfo?.country)
            // setPinCode(shippingInfo?.pinCode)
            // setPhoneNo(shippingInfo?.phoneNo)
            setShippingDetails(shippingInfo)
        }
    }, [shippingInfo])
    return (
        <>
            <MetaData title={`Shipping Info`} />

            <CheckoutSteps activeStep={0} />
            <div className='shippingContainer'>
                <div className='shippingBox'>
                    <h2><span className='profile-name'>Shipping Deta</span>ils</h2>

                    <form className='shippingForm' onSubmit={shippingSubmit} encType="multipart/form-data" >
                        <div className='shippingFormDiv'>
                            <HomeIcon />
                            <input
                                type='text'
                                name='address'
                                placeholder='Address'
                                required
                                value={shippingDetails.address}
                                onChange={handleChange} />
                        </div>

                        <div className='shippingFormDiv'>
                            <LocationCityIcon />
                            <input
                                type='text'
                                name='city'
                                placeholder='City'
                                required
                                value={shippingDetails.city}
                                onChange={handleChange} />
                        </div>

                        <div className='shippingFormDiv'>
                            <PinDropIcon />
                            <input
                                type='number'
                                name='pinCode'
                                placeholder='Pin Code'
                                required
                                value={shippingDetails.pinCode}
                                onChange={handleChange} />
                        </div>

                        <div className='shippingFormDiv'>
                            <PhoneIcon />
                            <input
                                type='number'
                                name='phoneNo'
                                placeholder='Phone Number'
                                required
                                value={shippingDetails.phoneNo}
                                onChange={handleChange} />
                        </div>

                        <div className='shippingFormDivLocations'>
                            <PublicIcon />
                            <select
                                required
                                value={shippingDetails.country}
                                onChange={e => setShippingDetails({ ...shippingDetails, country: e.target.value })}
                            >
                                <option value="">Country</option>
                                {
                                    Country &&
                                    Country.getAllCountries().map((country) => (<option value={country.isoCode} key={country.isoCode}>{country.name}</option>)

                                    )

                                }
                            </select>
                        </div>

                        {
                            shippingDetails.country && (
                                <div className="">
                                    <TransferWithinAStationIcon />
                                    <select
                                        required
                                        value={shippingDetails.state}
                                        onChange={e => setShippingDetails({ ...shippingDetails, state: e.target.value })}
                                    >
                                        <option value={""}>State</option>
                                        {
                                            State &&
                                            State.getStatesOfCountry(shippingDetails.country).map(allState => (<option value={allState.isoCode} key={allState.isoCode}>{allState.name}</option>))
                                        }
                                    </select>

                                </div>
                            )
                        }





                        <input type="submit" value="Continue" className='shippingBtn' />
                    </form>
                </div>
            </div >
        </>


    )
}

export default Shipping