import React, { useEffect, useState } from 'react'
import './UpdateProfile.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import FaceIcon from '@mui/icons-material/Face'
import { clearErrors, loadUser, updateProfile } from '../../actions/userActions'

import { UPDATE_PROFILE_RESET } from '../../constants/userContants'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader/Loader'

const UpdateProfile = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { user } = useSelector(state => state.authData)
    const { token } = useSelector(state => state.authToken);
    const { error, isUpdated, loading } = useSelector(state => state.profile)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState('https://png.pngtree.com/png-clipart/20210915/ourlarge/pngtree-user-avatar-placeholder-black-png-image_3918427.jpg')

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData()
        myForm.set('name', name)
        myForm.set('email', email)
        myForm.set('avatar', avatar)
        myForm.set("token", token)
        dispatch(updateProfile(myForm))

    }
    const updateProfileDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0])

        }

    }

    const updateProfileNameChange = (e) => setName(e.target.value)
    const updateProfileEmailChange = (e) => setEmail(e.target.value)
    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar?.url);
        }
        if (error) {

            dispatch(clearErrors())
        }
        if (isUpdated) {

            dispatch(loadUser(token));
            navigate('/account');
            dispatch({ type: UPDATE_PROFILE_RESET })
        }

    }, [dispatch, error, isUpdated, user, token, navigate])
    return (<>
        {
            loading
                ?
                <Loader />
                :
                <>
                    <MetaData title={`Update Profile-${user?.name}`} />
                    <div className='updateProfileContainer'>
                        <div className='updateProfileBox'>
                            <h2>Update Profile</h2>

                            <form className='updateProfileForm' encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                                <div className='updateProfileName'>
                                    <FaceIcon />
                                    <input
                                        type='text'
                                        placeholder='name'
                                        required
                                        name='name'
                                        value={name}
                                        onChange={updateProfileNameChange} />
                                </div>

                                <div className='updateProfileEmail'>
                                    <MailOutlineIcon />
                                    <input
                                        type='email'
                                        placeholder='email'
                                        required
                                        name='email'
                                        value={email}
                                        onChange={updateProfileEmailChange} />
                                </div>

                                <div id='updateProfileImage'>
                                    <img className="updateProfilePImage" src={avatarPreview} alt="Avatar Preview" />
                                    <input type="file"
                                        name='avatar'
                                        accept='image/*'
                                        onChange={updateProfileDataChange} />

                                </div>
                                <input type='submit' value='Update Profile' className='updateProfileBtn' disabled={loading ? true : false} />
                            </form>
                        </div>
                    </div>
                </>
        }
    </>
    )
}

export default UpdateProfile
