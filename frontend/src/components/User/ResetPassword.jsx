import React, { useEffect, useState } from 'react'
import './ResetPassword.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearErrors, resetPassword } from '../../actions/userActions'
import { toast } from 'react-hot-toast'
import MetaData from '../layout/MetaData'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams();
    const { token } = params;


    const { error, loading, message } = useSelector(state => state.forgotPassword)

    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData()
        myForm.set('password', newPassword)
        myForm.set('confirmPassword', confirmNewPassword)
        console.log(newPassword, confirmNewPassword);
        dispatch(resetPassword(token, myForm))

    }


    useEffect(() => {


        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (message) {
            toast.success(message);

            // navigate('/login');

        }

    }, [dispatch, error, navigate, token, message])
    return (



        <>
            <MetaData title={`Reset Password`} />
            <div className='resetPasswordContainer'>
                <div className='resetPasswordBox'>
                    <h2><span className='profile-name'>Reset Pass</span>word</h2>

                    <form className='resetPasswordForm' encType="multipart/form-data" onSubmit={(e) => resetPasswordSubmit}>


                        <div className='newPassword'>
                            <LockOpenIcon />
                            <input
                                type='password'

                                placeholder='New Password'
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)} />
                        </div>

                        <div className='oldPassword'>
                            <LockIcon />
                            <input
                                type='password'

                                placeholder='Confirm Password'
                                required
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)} />
                        </div>




                        <input type='submit' value='Reset Password' className='resetPasswordBtn' disabled={loading ? true : false} />
                    </form>
                </div>
            </div>
        </>

    )
}

export default ResetPassword