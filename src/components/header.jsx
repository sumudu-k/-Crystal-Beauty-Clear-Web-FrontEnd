import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-accent w-full h-[80px] relative flex  items-center justify-center">
      <img
        src="../public/l.jpg"
        alt=""
        className="h-[80%] rounded-full cursor-pointer absolute left-[20px]"
      />
      <div className="h-full flex  items-center w-[500px] justify-between">
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
  );
}
