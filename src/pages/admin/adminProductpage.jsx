import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaPencil, FaTrash } from 'react-icons/fa6';
export default function AdminProductPage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products').then(
            (res) => {

                console.log(res);
                setProducts(res.data);
            })
    }, []
    )




    return (
        <div>
            <h1>Admin Product Page</h1>

            {
                <table>
                    <thead>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Last price</th>
                        <th>Stock</th>
                        <th>Description</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {
                            //loop through the products array and display each product
                            products.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{product.productId}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.price}</td>
                                        <td>{product.lastPrice}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.description}</td>
                                        <td>
                                            <FaTrash />
                                            <FaPencil />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}