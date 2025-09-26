import React from "react";
import { Link, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Header from "../components/header";
import ProductOverview from "./home/productOverview";
import LoginPage from "./loginPage";
import ProductPage from "./home/product";
import Cart from "./home/cart";
import HomeLanding from "./home/homeLanding";
import SearchResults from "./home/searchResults";
import AboutPage from "./aboutPage";
import ContactPage from "./contactPage";
import Checkout from "./home/checkout";
import SignupPage from "./signupPage";

export default function HomePage() {
  return (
    <div
      className="min-h-screen w-full bg-gradient-to-b from-primary to-white 
    overflow-x-hidden 
    overflow-y-scroll">
      <Header />
      <div className="w-full min-h-[calc(100vh-80px)]">
        <Routes path="/*">
          <Route path="/" element={<HomeLanding />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage></LoginPage>} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/productinfo/:id" element={<ProductOverview />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </div>
  );
}
