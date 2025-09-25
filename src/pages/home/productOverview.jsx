import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductNotFound from "./productNotfound";
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../utils/cartFunction";
import toast from "react-hot-toast";
import Aos from "aos";
import "aos/dist/aos.css";
import Newsletter from "./newsletter";

export default function ProductOverview() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
      once: false,
    });
  }, []);
  const params = useParams();
  // there is a default `id` section to save the params data
  const productId = params.id;

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // not-found, found, loading
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Product ID:", productId);
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5050"
        }/api/products/${productId}`
      )
      .then((res) => {
        console.log(res.data);

        // if null
        if (res.data == null) {
          setStatus("notfound");
        }

        // if product found
        if (res.data != null) {
          // set the product data  if null
          setProduct(res.data);
          setStatus("found");
          // check if product is already in cart
          try {
            const cart = loadCart();
            setInCart(
              Array.isArray(cart) &&
                cart.some((i) => i.productId === res.data.productId)
            );
          } catch {}
        }
      });
  }, []);

  function onAddtoCartClick() {
    addToCart(product.productId, 1);
    toast.success("Product added to cart");
    setInCart(true);
  }

  return (
    <div
      data-aos="fade-up"
      className="w-full min-h-full px-4 py-6 bg-gradient-to-b from-primary/60 to-white">
      {
        // if only status is loading, then show loading message
        status == "loading" && (
          <div className="w-full min-h-[50vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-2 border-pink-300 border-b-pink-600 border-b-4"></div>
          </div>
        )
      }
      {status == "notfound" && <ProductNotFound />}
      {status == "found" && (
        <div className=" mb-20 mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mobile title */}
          <div className="lg:hidden">
            <h1 className="text-pink-900 text-2xl font-bold">
              {product.productName}
            </h1>
            <p className="text-secondary text-sm mt-1">
              {product.altNames.join(" | ")}
            </p>
          </div>

          {/* Gallery */}
          <div className="rounded-2xl bg-white/70 ring-1 ring-black/5 shadow-sm p-3 flex justify-center">
            <div className="w-56 sm:w-64 lg:w-80">
              <ImageSlider images={product.images} />
            </div>
          </div>

          {/* Details */}
          <div className="w-full h-full p-4 bg-white/80 rounded-2xl ring-1 ring-black/5 shadow-sm">
            {/* Desktop title */}
            <h1 className="text-pink-900 text-3xl font-semibold hidden lg:block">
              {product.productName}
            </h1>
            <p className="text-secondary mt-1 hidden lg:block">
              {product.altNames.join(" | ")}
            </p>

            <p className="mt-4 text-secondary leading-7">
              {product.description}
            </p>

            {/* Actions */}
            {/* <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={onAddtoCartClick}
                className="inline-flex items-center justify-center rounded-lg bg-accent/90 text-white font-medium px-5 py-2.5 shadow-sm hover:bg-accent transition-colors">
                Add to cart
              </button>
            </div> */}
            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              {inCart ? (
                <button
                  onClick={() => navigate("/cart")}
                  className="inline-flex items-center justify-center rounded-lg bg-accent/90 text-white font-medium px-5 py-2.5 shadow-sm hover:bg-accent transition-colors">
                  Go to cart
                </button>
              ) : (
                <button
                  onClick={onAddtoCartClick}
                  className="inline-flex items-center justify-center rounded-lg bg-accent/90 text-white font-medium px-5 py-2.5 shadow-sm hover:bg-accent transition-colors">
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <Newsletter />
    </div>
  );
}
