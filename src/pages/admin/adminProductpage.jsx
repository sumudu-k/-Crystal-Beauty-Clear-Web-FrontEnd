import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaPencil, FaTrash } from 'react-icons/fa6';

export default function AdminProductPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Admin Product Page</h1>
            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Product ID</th>
                            <th className="py-3 px-6 text-left">Product Name</th>
                            <th className="py-3 px-6 text-left">Price</th>
                            <th className="py-3 px-6 text-left">Last Price</th>
                            <th className="py-3 px-6 text-left">Stock</th>
                            <th className="py-3 px-6 text-left">Description</th>
                            <th className="py-3 px-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="py-4 px-6">{product.productId}</td>
                                <td className="py-4 px-6">{product.productName}</td>
                                <td className="py-4 px-6">${product.price}</td>
                                <td className="py-4 px-6">${product.lastPrice}</td>
                                <td className="py-4 px-6">{product.stock}</td>
                                <td className="py-4 px-6 truncate max-w-xs">{product.description}</td>
                                <td className="py-4 px-6 flex justify-center space-x-4">
                                    <button className="text-blue-500 hover:text-blue-700 transition">
                                        <FaPencil />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 transition">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
