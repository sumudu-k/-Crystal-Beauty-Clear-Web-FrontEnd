import react from 'react';
import { Link } from 'react-router-dom';
import { MdDashboardCustomize } from "react-icons/md";
import { FaUserFriends, FaBoxOpen, FaCartPlus } from "react-icons/fa";

export default function AdminHomePage() {
    return (
        <div className='bg-blue-400 w-full h-screen flex' >
            <div className='w-[60%] h-screen bg-blue-700 flex flex-col items-center text-white' >

                <Link to='/admin/dashboard' className='flex flex-row items-center mb-4 mt-4  hover:text-amber-300'><MdDashboardCustomize className='mr-2' /> Dashboard</Link>

                <Link to='/admin/products' className='flex flex-row items-center mb-4 hover:text-amber-300'> <FaBoxOpen className='mr-2' />Products</Link>

                <Link to='/admin/orders' className='flex flex-row items-center mb-4 hover:text-amber-300'><FaCartPlus className='mr-2' /> Orders</Link>

                <Link to='/admin/customers' className='flex flex-row items-center mb-4 hover:text-amber-300'> <FaUserFriends className='mr-2' />Customers</Link>
            </div>

            <div className='w-[80%] h-screen bg-green-600'></div>
        </div>
    )
}

