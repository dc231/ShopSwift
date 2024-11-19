import React from 'react'
import ServiceInfoCard from '../../Utils/ServiceInfoCard'

import './ServiceToHelp.css'
const service = [
    {
        title: "Frequently Asked Questions",
        desc: 'lorem epsum plase seafe Updae son SAfe Shopping in Our Stores',
        url: 'https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e55b939fea169c0292_faq-min.png'
    },
    {
        title: "Online Payment Process",
        desc: 'lorem epsum plase seafe Updae son SAfe Shopping in Our Stores',
        url: 'https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e6707380718425e697_onlie%20payment-min.png'
    },
    {
        title: "Home Delivery Options",
        desc: 'lorem epsum plase seafe Updae son SAfe Shopping in Our Stores',
        url: 'https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e544663ba3d0fd2bb8_home%20delivery-min.png'
    }
]
const ServiceToHelp = () => {
    return (<>
        <div className="container">
            <span className="service-header">Services To Help You Shop</span>
            <div className='service-container'>

                {
                    service.map((service, ind) => <ServiceInfoCard key={ind} {...service} />)
                }

            </div>
        </div>
    </>
    )
}

export default ServiceToHelp