import React from "react";
import { Link, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Header from "../components/header";

export default function HomePage() {
  return (
    <div className="h-screen w-full">
      <Header />
      <div className="w-full h-[calc(100vh-80px)] bg-red-800">
        <Routes path="/*">
          <Route
            path="/productinfo"
            element={<h1>Product information page</h1>}
          />
        </Routes>
      </div>
    </div>
  );
}
