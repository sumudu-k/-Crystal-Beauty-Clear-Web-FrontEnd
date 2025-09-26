import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import NavSlider from "./navSlider";
import SearchBar from "./searchBar";
import toast from "react-hot-toast";

import "@fontsource/marck-script";

export default function Header() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/");
  }
  return (
    <>
      {isSliderOpen && (
        <NavSlider
          closeSlider={() => {
            setIsSliderOpen(false);
          }}
        />
      )}
      <header className="w-full bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-pink-200 overflow-x-hidden">
        {/* Top row */}
        <div className="relative h-[90px] flex items-center">
          <a href="/">
            <h1 className="marck-script-regular font-sans text-3xl font-bold text-pink-700 ml-4 mr-5">
              Crystal Beauty Clear
            </h1>
          </a>

          <RxHamburgerMenu
            onClick={() => {
              setIsSliderOpen(true);
            }}
            className="text-2xl absolute right-[10px] cursor-pointer text-pink-700 lg:hidden "
          />

          <nav className="h-full items-center w-[520px] justify-between hidden lg:flex">
            <Link
              to="/"
              className="text-pink-700 font-semibold text-[18px] hover:text-pink-900 hover:border-b-2 border-pink-400 pb-1 transition-colors">
              Home
            </Link>
            <Link
              to="/products"
              className="text-pink-700 font-semibold text-[18px] hover:text-pink-900 hover:border-b-2 border-pink-400 pb-1 transition-colors">
              Products
            </Link>
            <Link
              to="/about"
              className="text-pink-700 font-semibold text-[18px] hover:text-pink-900 hover:border-b-2 border-pink-400 pb-1 transition-colors">
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-pink-700 font-semibold text-[18px] hover:text-pink-900 hover:border-b-2 border-pink-400 pb-1 transition-colors">
              Contact Us
            </Link>
            <Link
              to="/cart"
              className="text-pink-700 font-semibold text-[18px] hover:text-pink-900 hover:border-b-2 border-pink-400 pb-1 transition-colors">
              My Cart
            </Link>
          </nav>

          {/* Auth actions (desktop) */}
          <div className="hidden lg:flex items-center gap-2 absolute right-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-md border border-pink-300 bg-white/70 px-3 py-1.5 text-pink-700 hover:bg-pink-50">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center rounded-md bg-accent/90 text-white px-3 py-1.5 shadow-sm hover:bg-accent">
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-md border border-pink-300 bg-white/70 px-3 py-1.5 text-pink-700 hover:bg-pink-50">
                Logout
              </button>
            )}
          </div>
        </div>
        {/* Search row (always visible, including mobile) */}
        <div className="px-4 pb-3  ">
          <div className="max-w-3xl mx-auto">
            <SearchBar size="lg" placeholder="Search products..." />
          </div>
        </div>
      </header>
    </>
  );
}
