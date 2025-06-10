import react from "react";
import { Link } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUserFriends, FaBoxOpen, FaCartPlus } from "react-icons/fa";
import { Routes, Route } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
import AddProductForm from "./admin/addProductForm";
import EditProductForm from "./admin/editProductForm";

export default function AdminHomePage() {
  return (
    <div className="bg-blue-400 w-full h-screen flex">
      <div className="w-[20%] h-screen bg-blue-700 flex flex-col items-center text-white">
        <Link
          to="/admin/dashboard"
          className="flex flex-row items-center mb-4 mt-4  hover:text-amber-300">
          <MdDashboardCustomize className="mr-2" /> Dashboard
        </Link>

        <Link
          to="/admin/products"
          className="flex flex-row items-center mb-4 hover:text-amber-300">
          {" "}
          <FaBoxOpen className="mr-2" />
          Products
        </Link>

        <Link
          to="/admin/orders"
          className="flex flex-row items-center mb-4 hover:text-amber-300">
          <FaCartPlus className="mr-2" /> Orders
        </Link>

        <Link
          to="/admin/customers"
          className="flex flex-row items-center mb-4 hover:text-amber-300">
          {" "}
          <FaUserFriends className="mr-2" />
          Customers
        </Link>
      </div>

      <div className="w-[80%] h-screen bg-green-600">
        <Routes path="/*">
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />

          <Route path="/products" element={<AdminProductPage />} />

          <Route path="/products/addProduct" element={<AddProductForm />} />
          <Route path="/products/editProduct" element={<EditProductForm />} />

          <Route path="/orders" element={<h1>Orders</h1>} />

          <Route path="/customers" element={<h1>Customers</h1>} />

          <Route path="/*" element={<h1>Error 404 Page not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}
