import React, { useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import './UpdateProduct.css'
import { useDispatch, useSelector } from 'react-redux'
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate, useParams } from 'react-router-dom'
import { clearErrors } from '../../actions/productActions'
import { getUserDetails, updateUser } from '../../actions/userActions'
import Sidebar from './Sidebar';
import { UPDATE_USER_RESET } from '../../constants/userContants'
import Loader from '../layout/Loader/Loader'



const UpdateUser = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    const { loading, error, user } = useSelector(state => state.userDetails)
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector(state => state.profile)

    const [Name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')




    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", Name)
        myForm.set("email", email)
        myForm.set("role", role)


        dispatch(updateUser(params.id, myForm))


    }

    const userId = params.id;

    useEffect(() => {

        if (!user || user._id !== userId) {
            dispatch(getUserDetails(userId))


        }
        else {

            setName(user.name)
            setEmail(user.email)
            setRole(user.role)

        }

        if (error) {

            dispatch(clearErrors())
        }

        if (updateError) {

            dispatch(clearErrors())
        }
        if (isUpdated) {

            navigate('/admin/users')
            dispatch({ type: UPDATE_USER_RESET })

        }
    }, [dispatch, error, navigate, userId, params, isUpdated, user, updateError])

    return (
        <>
            <MetaData title={'Update '} />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {
                        loading ? <Loader /> :
                            <form
                                className='createProductForm'
                                encType='multipart/form-data'
                                onSubmit={updateUserSubmitHandler}
                            >
                                <h1>Update User</h1>
                                <div>
                                    <PersonIcon />
                                    <input
                                        type="text"
                                        value={Name}
                                        placeholder='Product Name'
                                        required
                                        onChange={e => setName(e.target.value)} />
                                </div>

                                <div>
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        value={email}
                                        placeholder='Email'
                                        required
                                        onChange={e => setEmail(e.target.value)} />
                                </div>

                                <div>
                                    <VerifiedUserIcon />
                                    <select

                                        placeholder='User Role'
                                        required
                                        onChange={e => setRole(e.target.value)}
                                        value={role}
                                    >
                                        <option value="">Choose Role</option>
                                        <option value="admin">
                                            Admin
                                        </option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                                <button
                                    className='createProductBtn'
                                    type='submit'
                                    disabled={updateLoading || role === "" ? true : false}
                                >
                                    Update
                                </button>



                            </form>

                    }
                </div>
            </div>
        </>
    )
}

export default UpdateUser
