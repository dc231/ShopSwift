import React from 'react'
import { FaFirstOrder, FaMoneyBill, FaUserPlus } from 'react-icons/fa'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import { HiArrowTrendingUp } from "react-icons/hi2";
import './AdminAnalytics.css'
import Chart from './Chars';
const AdminAnalytics = () => {
    return <DashboardLayout title='Analytics'>
        <main>

            <div className='cards'>
                <div className='card-analytics'>
                    <div>
                        <h2 className='card-analytics_name'>Total Revenue</h2>
                        <FaMoneyBill size={28} />
                    </div>
                    <div>
                        <span className='card-analytics_value'>7320</span>
                        <p className='increase'> <HiArrowTrendingUp size={22} /> 7000</p>
                    </div>
                </div>
                <div className='card-analytics'>
                    <div>
                        <h2 className='card-analytics_name'>New Orders</h2>
                        <FaFirstOrder size={28} />
                    </div>
                    <div>
                        <span className='card-analytics_value'>7320</span>
                        <p className='increase'> <HiArrowTrendingUp size={22} /> 7000</p>
                    </div>
                </div>
                <div className='card-analytics'>
                    <div>
                        <h2 className='card-analytics_name'>New Users</h2>
                        <FaUserPlus size={28} />
                    </div>
                    <div>
                        <span className='card-analytics_value'>7320</span>
                        <p className='increase'> <HiArrowTrendingUp size={22} /> 7000</p>
                    </div>
                </div>

            </div>
            <div className='sales-graph'>
                <Chart />
            </div>

        </main>
    </DashboardLayout>
}

export default AdminAnalytics
