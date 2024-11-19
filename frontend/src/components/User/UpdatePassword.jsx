import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearErrors, loadUser, updatePassword } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userContants'
import Sidebar from '../Admin/Sidebar'
import MetaData from '../layout/MetaData'
import './UpdatePassword.css'

const UpdatePassword = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(state => state.authData)
    const { token } = useSelector(state => state.authToken);
    const { error, isUpdated, loading } = useSelector(state => state.profile)

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData()
        myForm.set('oldPassword', oldPassword)
        myForm.set('newPassword', newPassword)
        myForm.set('confirmPassword', confirmNewPassword)

        dispatch(updatePassword(myForm, token))

    }


    useEffect(() => {

        if (user) {

        }
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            toast.success("Password Updated Successfully!! ");
            dispatch(loadUser(token));
            navigate('/account');
            dispatch({ type: UPDATE_PASSWORD_RESET })
        }

    }, [dispatch, error, isUpdated, user, token, navigate])
    return (



        <>
            <MetaData title={`Change Password-${user?.name}`} />
            <div className='dashboard'>
                <Sidebar />
                <div className='updatePasswordContainer'>
                    <div className='updatePasswordBox'>
                        <h2><span className='profile-name'>Update Pass</span>word</h2>

                        <form className='updatePasswordForm' encType="multipart/form-data" onSubmit={updatePasswordSubmit}>
                            <div className='loginPassword'>
                                <VpnKeyIcon />
                                <input
                                    type='password'

                                    placeholder='Old Password'
                                    required
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)} />
                            </div>

                            <div className='loginPassword'>
                                <LockOpenIcon />
                                <input
                                    type='password'

                                    placeholder='New Password'
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)} />
                            </div>

                            <div className='loginPassword'>
                                <LockIcon />
                                <input
                                    type='password'

                                    placeholder='Confirm Password'
                                    required
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)} />
                            </div>




                            <input type='submit' value='Change Password' className='updatePasswordBtn' disabled={loading ? true : false} />
                        </form>
                    </div>
                </div>
            </div>

        </>

    )
}

export default UpdatePassword