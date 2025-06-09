import axios from "axios";
import { useState, useEffect } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  // when delete icon pressed, the product will be deleted and refresh the page
  const [productsLoaded, setProductsLoaded] = useState(false);

  useEffect(() => {
    if (!productsLoaded) {
      axios
        .get("http://localhost:5000/api/products")
        .then((res) => {
          setProducts(res.data);
          setProductsLoaded(true);
        })
        .catch((err) => console.error(err));
    }
  }, [productsLoaded]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      {/* <button className="absolute right-[50px] bottom-[50px] text-[45px]  bg-green-600 rounded-full " >+</button> */}
      <Link
        to="/admin/products/addProduct"
        className="absolute right-[50px] bottom-[50px] text-[40px] bg-green-600 rounded-xl w-16 h-16 flex items-center justify-center text-white shadow-lg hover:bg-green-700 transition">
        +
      </Link>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Admin Product Page
      </h1>
      {productsLoaded ? (
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
                  <td className="py-4 px-6 truncate max-w-xs">
                    {product.description}
                  </td>
                  <td className="py-4 px-6 flex justify-center space-x-4">
                    <button
                      className="text-blue-500 hover:text-blue-700 transition"
                      onClick={() => {
                        navigate("/admin/products/editProduct", {
                          state: { product: product },
                        });
                      }}>
                      <FaPencil />
                    </button>

                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => {
                        const token = localStorage.getItem("token");

                        axios
                          .delete(
                            `http://localhost:5000/api/products/${product.productId}`,
                            {
                              headers: {
                                Authorization: "Bearer " + token,
                              },
                            }
                          )
                          .then(() => {
                            toast.success("Product deleted successfully");
                            setProductsLoaded(false);
                          });
                      }}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full h-full items-center justify-center flex">
          <div className="w-[40px] h-[40px] border-gray-200 border-[3px] animate-spin rounded-full border-b-blue-500"></div>
        </div>
      )}
    </div>
  );
}
