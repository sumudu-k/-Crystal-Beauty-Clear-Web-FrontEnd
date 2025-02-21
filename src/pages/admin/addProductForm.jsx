import React from 'react';

export default function AddProductForm() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 ">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md mt-10 mb-10 ">
                <h1 className="text-2xl font-bold mb-6 text-center">Add New Product</h1>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Product ID</label>
                        <input
                            type="text"
                            placeholder="Enter product ID"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Product Name</label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Alternative Names</label>
                        <input
                            type="text"
                            placeholder="Enter alternative names"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Image URL</label>
                        <input
                            type="text"
                            placeholder="Enter image URL"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            placeholder="Enter price"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Last Price</label>
                        <input
                            type="number"
                            placeholder="Enter last price"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Stock</label>
                        <input
                            type="number"
                            placeholder="Enter stock quantity"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            placeholder="Enter product description"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
