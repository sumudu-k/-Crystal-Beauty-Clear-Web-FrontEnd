import react from 'react';
import { Link } from 'react-router-dom';
export default function AdminHomePage() {
    return (
        <div className='bg-blue-400 w-full h-screen flex' >
            <div className='w-[20%] h-screen bg-blue-700 flex flex-col items-center'>
                <Link to='/admin/dashboard'>Dashboard</Link>
                <Link to='/admin/products'>Products</Link>
                <Link to='/admin/orders'>Orders</Link>
                <Link to='/admin/customers'>Customers</Link>
            </div>

            <div className='w-[80%] h-screen bg-green-600'></div>
        </div>
    )
}

