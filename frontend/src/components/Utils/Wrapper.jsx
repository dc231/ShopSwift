import React from 'react'
import './Wrapper.css'

const Wrapper = ({ Card, heading, data, hw }) => {
    return (
        <div className='wrapper' >
            <div className="wrapper-heading">{heading}</div>
            <div className="wrapper-container" style={{ height: { hw } }}>
                {
                    data &&
                    data?.map((item, idx) => <Card key={idx} {...item} />)

                }
            </div>
        </div>
    )
}

export default Wrapper