import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function NavSlider(props) {
  const closeSlider = props.closeSlider;
  const navigate = useNavigate();
  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("token");
  function handleLogout() {
    localStorage.removeItem("token");
    toast.success("Logged out");
    closeSlider();
    navigate("/");
  }
  return (
    <div className="fixed w-screen h-screen bg-black/40 z-50 lg:hidden ">
      <div className="bg-white w-[300px] h-screen flex flex-col relative shadow-xl">
        <IoMdClose
          onClick={closeSlider}
          className="text-2xl text-pink-700 absolute right-[10px] top-[10px] cursor-pointer"
        />
        <div className="h-[60px]" />
        <Link
          to="/"
          className="text-pink-700 font-semibold text-[18px] px-4 py-3 hover:bg-pink-50">
          Home
        </Link>

        <Link
          to="/products"
          className="text-pink-700 font-semibold text-[18px] px-4 py-3 hover:bg-pink-50">
          Products
        </Link>

        <Link
          to="/about"
          className="text-pink-700 font-semibold text-[18px] px-4 py-3 hover:bg-pink-50">
          About Us
        </Link>

        <Link
          to="/contact"
          className="text-pink-700 font-semibold text-[18px] px-4 py-3 hover:bg-pink-50">
          Contact Us
        </Link>

        <Link
          to="/cart"
          className="text-pink-700 font-semibold text-[18px] px-4 py-3 hover:bg-pink-50">
          My Cart
        </Link>

        <div className="mt-auto mb-4 px-4">
          {!isLoggedIn ? (
            <div className="flex gap-2">
              <Link
                to="/login"
                onClick={closeSlider}
                className="flex-1 inline-flex items-center justify-center rounded-md border border-pink-300 bg-white px-3 py-2 text-pink-700 hover:bg-pink-50">
                Login
              </Link>
              <Link
                to="/signup"
                onClick={closeSlider}
                className="flex-1 inline-flex items-center justify-center rounded-md bg-accent/90 text-white px-3 py-2 shadow-sm hover:bg-accent">
                Register
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full inline-flex items-center justify-center rounded-md border border-pink-300 bg-white px-3 py-2 text-pink-700 hover:bg-pink-50">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
