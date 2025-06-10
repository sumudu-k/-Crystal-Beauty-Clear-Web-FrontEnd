import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function EditProductForm() {
  const location = useLocation();
  const product = location.state.product;
  const altNames = product.altNames.join(", "); // Convert array to comma-separated string
  const navigate = useNavigate();

  if (product == null) {
    navigate("/admin/products");
    toast.error("Product not found");
  }

  const [productId, setProductId] = useState(product.productId);
  const [productName, setProductName] = useState(product.productName);
  const [alternativeNames, setAlternativeNames] = useState(altNames);
  const [imageFiles, setImageFiles] = useState([]);
  const [price, setPrice] = useState(product.price);
  const [lastPrice, setLastPrice] = useState(product.lastPrice);
  const [stock, setStock] = useState(product.stock);
  const [description, setDescription] = useState(product.description);

  async function handleSubmit(event) {
    //prevent page refresh
    event.preventDefault();
    const altNames = alternativeNames.split(","); //output is an array

    const promisesArray = [];
    let imgUrls = product.images;

    if (imageFiles.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);
      }
      imgUrls = await Promise.all(promisesArray);
    }

    const productData = {
      productId: productId,
      productName: productName,
      altNames: altNames,
      images: imgUrls,
      price: price,
      lastPrice: lastPrice,
      stock: stock,
      description: description,
    };

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        "http://localhost:5000/api/products/" + product.productId,
        productData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (e) {
      toast.error("Failed to update product");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 ">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md mt-10 mb-10 ">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Product</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Product ID</label>
            <input
              type="text"
              placeholder="Enter product ID"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              disabled // Disable input for product ID
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
              type="file"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => {
                setImageFiles(e.target.files);
              }}
              multiple // Allow multiple file uploads
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
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              onClick={handleSubmit}>
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
