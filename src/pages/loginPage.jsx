import React from 'react';

export default function LoginPage() {
    return (
        <div className="w-full h-screen bg-red-500 flex items-center justify-center ">
            <div className="w-[400px] h-[400px] bg-blue-700 flex flex-col justify-center items-center">
                <img src="/logo.jpg" className='rounded-full w-[100px] ' />
                <span>Email</span>
                <input />
                <span>Password</span>
                <input type='password' />
                <button className='bg-yellow-400' >Login</button>
            </div>
        </div>
    );
}
