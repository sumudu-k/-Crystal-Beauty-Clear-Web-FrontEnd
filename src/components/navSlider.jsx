import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

export default function NavSlider(props) {
  const closeSlider = props.closeSlider;
  return (
    <div className="fixed w-screen h-screen bg-[#00000099] z-50 lg:hidden ">
      <div className="bg-white w-[300px] h-screen flex flex-col relative">
        <IoMdClose
          onClick={closeSlider}
          className="text-2xl text-red-800  absolute right-[10px] cursor-pointer mb-3"
        />
        <Link
          to="/"
          className="text-yellow-600 font-bold  text-[20px] hover:border-b border-b-white">
          Home
        </Link>

        <Link
          to="/products"
          className="text-yellow-600 font-bold  text-[20px] hover:border-b border-b-white">
          Products
        </Link>

        <Link
          to="/about"
          className="text-yellow-600 font-bold  text-[20px] hover:border-b border-b-white">
          About Us
        </Link>

        <Link
          to="/contact"
          className="text-yellow-600 font-bold  text-[20px] hover:border-b border-b-white">
          Contact Us
        </Link>

        <Link
          to="/cart"
          className="text-yellow-600 font-bold  text-[20px] hover:border-b border-b-white">
          My Cart
        </Link>
      </div>
    </div>
  );
}
