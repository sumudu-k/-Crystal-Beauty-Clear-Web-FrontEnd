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
      const base = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      axios
        .get(`${base}/api/products`)
        .then((res) => {
          setProducts(res.data);
          setProductsLoaded(true);
        })
        .catch((err) => console.error(err));
    }
  }, [productsLoaded]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-primary to-white p-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-pink-900">Products</h1>
          <Link
            to="/admin/products/addProduct"
            className="inline-flex items-center justify-center rounded-lg bg-accent/90 text-white font-medium px-4 py-2 shadow-sm hover:bg-accent transition-colors">
            Add Product
          </Link>
        </div>

        <div className="mt-4 rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm overflow-hidden">
          {productsLoaded ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-pink-50 text-pink-900">
                  <tr>
                    <th className="py-3 px-4 text-left">Image</th>
                    <th className="py-3 px-4 text-left">Product ID</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Price</th>
                    <th className="py-3 px-4 text-left">Last Price</th>
                    <th className="py-3 px-4 text-left">Stock</th>
                    <th className="py-3 px-4 text-left">Description</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={index}
                      className="border-t border-pink-100 hover:bg-pink-50/40">
                      <td className="py-3 px-4">
                        {product.images && product.images[0] ? (
                          <img
                            src={product.images[0]}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded bg-pink-100" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-pink-900">
                        {product.productId}
                      </td>
                      <td className="py-3 px-4 text-pink-900">
                        {product.productName}
                      </td>
                      <td className="py-3 px-4 text-secondary">
                        Rs {Number(product.price).toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-secondary">
                        Rs {Number(product.lastPrice).toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-pink-900">
                        {product.stock}
                      </td>
                      <td className="py-3 px-4 max-w-xs text-secondary truncate">
                        {product.description}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            className="text-pink-700 hover:text-pink-900"
                            onClick={() => {
                              navigate("/admin/products/editProduct", {
                                state: { product: product },
                              });
                            }}>
                            <FaPencil />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-700"
                            onClick={() => {
                              setProductToDelete(product);
                              setShowDeleteConfirm(true);
                            }}>
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full h-[200px] items-center justify-center flex">
              <div className="w-[40px] h-[40px] border-pink-200 border-[3px] animate-spin rounded-full border-b-pink-500"></div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delete Product
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{productToDelete?.productName}"?
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setProductToDelete(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={() => {
                  const token = localStorage.getItem("token");
                  const base =
                    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
                  axios
                    .delete(
                      `${base}/api/products/${productToDelete.productId}`,
                      {
                        headers: {
                          Authorization: "Bearer " + token,
                        },
                      }
                    )
                    .then(() => {
                      toast.success("Product deleted successfully");
                      setProductsLoaded(false);
                      setShowDeleteConfirm(false);
                      setProductToDelete(null);
                    })
                    .catch(() => toast.error("Failed to delete"));
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
