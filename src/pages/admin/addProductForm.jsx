import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function AddProductForm() {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [alternativeNames, setAlternativeNames] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [lastPrice, setLastPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');

    async function handleSubmit(event) {
        //prevent page refresh
        event.preventDefault();
        const altNames = alternativeNames.split(','); //output is an array
        const imgUrls = imageUrl.split(','); //output is an array
        const product = {
            productId: productId,
            productName: productName,
            altNames: altNames,
            images: imgUrls,
            price: price,
            lastPrice: lastPrice,
            stock: stock,
            description: description
        }

        const token = localStorage.getItem("token")

        try {
            await axios.post('http://localhost:5000/api/products', product, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            toast.success("Product added successfully")
        } catch (e) {
            toast.error("Failed to add product")
        }
    }

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
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Product Name</label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Alternative Names</label>
                        <input
                            type="text"
                            placeholder="Enter alternative names"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={alternativeNames}
                            onChange={(e) => setAlternativeNames(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Image URL</label>
                        <input
                            type="text"
                            placeholder="Enter image URL"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            placeholder="Enter price"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Last Price</label>
                        <input
                            type="number"
                            placeholder="Enter last price"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={lastPrice}
                            onChange={(e) => setLastPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Stock</label>
                        <input
                            type="number"
                            placeholder="Enter stock quantity"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            placeholder="Enter product description"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            onClick={handleSubmit}
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
