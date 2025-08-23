import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import NavSlider from "./navSlider";

export default function Header() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  return (
    <>
      {isSliderOpen && (
        <NavSlider
          closeSlider={() => {
            setIsSliderOpen(false);
          }}
        />
      )}
      <header className="bg-accent w-full h-[80px] relative flex  items-center justify-center">
        <img
          src="../public/l.jpg"
          alt=""
          className="h-[80%] rounded-full cursor-pointer absolute left-[20px]"
        />

        <RxHamburgerMenu
          onClick={() => {
            setIsSliderOpen(true);
          }}
          className="text-2xl absolute right-[10px] cursor-pointer text-black lg:hidden "
        />

        <div className="h-full   items-center w-[500px] justify-between hidden lg:flex">
          <Link
            to="/"
            className="text-white font-bold  text-[20px] hover:border-b border-b-white">
            Home
          </Link>

          <Link
            to="/products"
            className="text-white font-bold  text-[20px] hover:border-b border-b-white">
            Products
          </Link>

          <Link
            to="/about"
            className="text-white font-bold  text-[20px] hover:border-b border-b-white">
            About Us
          </Link>

          <Link
            to="/contact"
            className="text-white font-bold  text-[20px] hover:border-b border-b-white">
            Contact Us
          </Link>

          <Link
            to="/cart"
            className="text-white font-bold  text-[20px] hover:border-b border-b-white">
            My Cart
          </Link>
        </div>
      </header>
    </>
  );
}
