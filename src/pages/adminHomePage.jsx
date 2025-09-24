import react from "react";
import { Link } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUserFriends, FaBoxOpen, FaCartPlus } from "react-icons/fa";
import { Routes, Route } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
import AddProductForm from "./admin/addProductForm";
import EditProductForm from "./admin/editProductForm";
import AdminDashboard from "./admin/adminDashboard";
import Customers from "./admin/customers";
import Orders from "./admin/orders";
import AdminRegister from "./admin/adminRegister";

export default function AdminHomePage() {
  return (
    <div className="w-full min-h-screen flex items-stretch bg-gradient-to-b from-primary to-white">
      <div className="w-[20%] bg-white/80 ring-1 ring-pink-200 text-pink-900 flex flex-col">
        <Link
          to="/admin/dashboard"
          className="px-4 py-3 flex flex-row items-center gap-2 hover:bg-pink-50 border-b border-pink-100">
          <MdDashboardCustomize className="text-pink-700" /> Dashboard
        </Link>

        <Link
          to="/admin/products"
          className="px-4 py-3 flex flex-row items-center gap-2 hover:bg-pink-50 border-b border-pink-100">
          <FaBoxOpen className="text-pink-700" /> Products
        </Link>

        <Link
          to="/admin/orders"
          className="px-4 py-3 flex flex-row items-center gap-2 hover:bg-pink-50 border-b border-pink-100">
          <FaCartPlus className="text-pink-700" /> Orders
        </Link>

        <Link
          to="/admin/customers"
          className=" px-4 py-3 flex flex-row items-center gap-2 hover:bg-pink-50">
          <FaUserFriends className="text-pink-700" /> Customers
        </Link>
      </div>

      <div className="w-[80%]">
        <Routes path="/*">
          <Route path="/dashboard" element={<AdminDashboard />} />

          <Route path="/products" element={<AdminProductPage />} />

          <Route path="/products/addProduct" element={<AddProductForm />} />
          <Route path="/products/editProduct" element={<EditProductForm />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/customers" element={<Customers />} />

          <Route path="/register" element={<AdminRegister />} />

          <Route
            path="/*"
            element={
              <h1 className="p-6 text-pink-900">Error 404 Page not Found</h1>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
