import React from 'react';
import './Ad.css';


const Ad = () => {
    return (
        <div className='ad-container'>
            <div className='left'>
                <h1 className='ad-heading'>Get 5% Cash Back</h1>
                <h3 className='ad-subheading'>On BetterMart.com</h3>
                <p className='ad-disclaimer'>* Terms & Conditions apply</p>
                <button className='ad-button'>Learn More</button>
            </div>
            <div className='right'>
                <img className='debit-card' src={"./debit1.png"} alt='' />
                <img className='debit-card' src={"./debit2.png"} alt='' />
                <img className='debit-card' src={"./debit3.svg"} alt='' />
            </div>
        </div>
    );
};

export default Ad;
