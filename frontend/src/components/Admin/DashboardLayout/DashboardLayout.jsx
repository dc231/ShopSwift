import React from 'react';
import './DashboardLayout.css';

import { MdAnalytics, MdDashboard, MdLogout, MdOutlineAdd } from 'react-icons/md';
import { TbFileAlert, TbReportMoney } from "react-icons/tb";

import { FaBoxOpen, FaUsers } from 'react-icons/fa';
import { RiShoppingBagLine } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const User_Menu = [

    {
        label: 'Analytics',
        icon: <MdAnalytics />,
        path: '/dashboard/analytics',
    },
    {
        label: 'View Products',
        icon: <FaBoxOpen />,
        path: '/dashboard/products/all',
    },
    {
        label: 'Add Product',
        icon: <MdOutlineAdd />,
        path: '/dashboard/products/new',
    },
    {
        label: 'View Orders',
        icon: <RiShoppingBagLine />,
        path: '/dashboard/orders/all',
    },
    {
        label: 'Transactions',
        icon: <TbReportMoney />,
        path: '/dashboard/transactions',
    },
    {
        label: 'Users',
        icon: <FaUsers />,
        path: '/dashboard/users',
    },
    {
        label: 'Terms & Conditions',
        icon: <TbFileAlert />,
        path: '/dashboard/term-condition',
    },
    {
        label: 'Log out',
        icon: <MdLogout />,
        path: '/signOut',
    },
]
const DashboardLayout = ({ children, title = 'Personal Information' }) => {
    const location = useLocation()

    const { data } = useSelector((state) => state.user)
    const { user } = data;
    return (
        <div className="menu_container">
            <div className="sidebar">
                <div className="user-menus">
                    <div className="dashboard_text">
                        <MdDashboard />
                        <p>Dashboard</p>
                    </div>
                    {User_Menu.map((menu) => (
                        <Link key={menu.path} id={menu.path} to={menu.path} className={`user-menu ${location.pathname === menu.path ? "active_menu" : ""}`}>
                            {menu?.icon}
                            <p className='menu-label'>{menu.label}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="children">
                <h2>{title}</h2>
                <main>{children}</main>
            </div>
        </div >
    )
}

export default DashboardLayout
