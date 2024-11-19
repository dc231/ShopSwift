import React from 'react'
import './ServiceInfoCard.css'

const ServiceInfoCard = ({ title, desc, url }) => {
    return (
        <div className='infoCard'>
            <div className='block-1'>
                <div className='title'>
                    {title}
                </div>
                <div className='desc'>
                    {desc}
                </div>
            </div>
            <div className='block-2'>
                <img src={url} alt='' />
            </div>
        </div>
    )
}

export default ServiceInfoCard
