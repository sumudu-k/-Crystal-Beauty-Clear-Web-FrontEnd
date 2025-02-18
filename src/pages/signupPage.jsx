import React from 'react';

export default function SignupPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            <div className="w-full max-w-md rounded-2xl bg-white/10 p-8 shadow-lg backdrop-blur-lg">
                <h2 className="mb-6 text-center text-3xl font-bold text-white">Sign Up</h2>
                <form className="space-y-6">
                    {/* Username Field */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-white">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-white/20 px-4 py-2 text-white placeholder-gray-200 outline-none backdrop-blur-md focus:border-white focus:ring-2 focus:ring-white/50"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-white/20 px-4 py-2 text-white placeholder-gray-200 outline-none backdrop-blur-md focus:border-white focus:ring-2 focus:ring-white/50"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-white/20 px-4 py-2 text-white placeholder-gray-200 outline-none backdrop-blur-md focus:border-white focus:ring-2 focus:ring-white/50"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-white">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-white/20 px-4 py-2 text-white placeholder-gray-200 outline-none backdrop-blur-md focus:border-white focus:ring-2 focus:ring-white/50"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-white/20 px-5 py-3 text-lg font-semibold text-white shadow-md transition-all hover:bg-white/40 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Login Link */}
                <p className="mt-4 text-center text-sm text-white">
                    Already have an account?{" "}
                    <a href="#" className="font-semibold text-white underline hover:text-gray-300">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
