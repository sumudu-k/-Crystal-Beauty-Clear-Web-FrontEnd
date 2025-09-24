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
      const base = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      await axios.put(
        `${base}/api/products/` + product.productId,
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
    <div className="min-h-screen w-full bg-gradient-to-b from-primary to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-xl p-6">
        <h1 className="text-2xl font-semibold text-pink-900 text-center">
          Edit Product
        </h1>
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-pink-900">Product ID</label>
            <input
              type="text"
              placeholder="Enter product ID"
              className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              disabled // Disable input for product ID
            />
          </div>
          <div>
            <label className="block text-sm text-pink-900">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-pink-900">
              Alternative Names
            </label>
            <input
              type="text"
              placeholder="Enter alternative names"
              className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
              value={alternativeNames}
              onChange={(e) => setAlternativeNames(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-pink-900">Images</label>
            <input
              type="file"
              className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
              onChange={(e) => {
                setImageFiles(e.target.files);
              }}
              multiple // Allow multiple file uploads
            />
          </div>
          <div>
            <label className="block text-sm text-pink-900">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-pink-900">Last Price</label>
            <input
              type="number"
              placeholder="Enter last price"
              className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
              value={lastPrice}
              onChange={(e) => setLastPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-pink-900">Stock</label>
            <input
              type="number"
              placeholder="Enter stock quantity"
              className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-pink-900">Description</label>
            <textarea
              placeholder="Enter product description"
              className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-lg bg-accent/90 text-white font-medium px-5 py-2.5 shadow-sm hover:bg-accent transition-colors"
              onClick={handleSubmit}>
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
