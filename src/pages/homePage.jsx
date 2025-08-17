import React from "react";
import { Link, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Header from "../components/header";
import ProductOverview from "./home/productOverview";

export default function HomePage() {
  return (
    <div className="h-screen w-full">
      <Header />
      <div className="w-full h-[calc(100vh-80px)]">
        <Routes path="/*">
          <Route path="/productinfo/:id" element={<ProductOverview />} />
        </Routes>
      </div>
    </div>
  );
}
