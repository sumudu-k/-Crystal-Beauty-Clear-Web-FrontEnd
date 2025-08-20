import React from "react";
import { Link, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Header from "../components/header";
import ProductOverview from "./home/productOverview";
import LoginPage from "./loginPage";
import ProductPage from "./home/product";
import Cart from "./home/cart";

export default function HomePage() {
  return (
    <div className="h-screen w-full">
      <Header />
      <div className="w-full h-[calc(100vh-80px)]">
        <Routes path="/*">
          <Route path="/" element={<h1>Homepage</h1>} />
          <Route path="/login" element={<LoginPage></LoginPage>} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/productinfo/:id" element={<ProductOverview />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}
