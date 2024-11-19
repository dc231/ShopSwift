import React from 'react'
import "./Avatar.css"
import { IoPerson } from 'react-icons/io5'
const Avatar = ({ user, size = "md" }) => {
    const sizeClasses = {
        "md": "user_avatar",
        "lg": "user_avatar lg",
        "xl": "user_avatar xl"
    }
    return (
        <>
            {
                user?.email ?
                    <div >
                        <img src={user?.avatar?.url} alt="User" className={sizeClasses[size]} />
                    </div>
                    :
                    <>
                        <IoPerson size={24} className='icon' />
                        <span hidden>Sign In</span>
                    </>

            }
        </>
    )
}

export default Avatar