import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";
import UspStrip from "./uspStrip";
import Categories from "./categories";
import NewArrivals from "./newArrivals";
import BestSellers from "./bestSellers";
import Testimonials from "./testimonials";
import Newsletter from "./newsletter";
import PriceDrops from "./priceDrops";

import Aos from "aos";
import "aos/dist/aos.css";

import image1 from "../../images/1.webp";
import image2 from "../../images/2.webp";
import image3 from "../../images/3.webp";
import image4 from "../../images/4.webp";
import image5 from "../../images/5.webp";
import image6 from "../../images/6.webp";

import cover1 from "../../images/cover1.jpg";
import cover2 from "../../images/cover2.jpeg";
import cover3 from "../../images/cover3.jpg";

export default function HomeLanding() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | loaded | error

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5050"
        }/api/products`
      )
      .then((res) => {
        setProducts(res.data || []);
        setStatus("loaded");
      })
      .catch(() => {
        toast.error("Failed to load products");
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div className="w-full">
      {/* Image Slider */}
      <section
        data-aos="fade-up"
        className="w-full h-[70vh] relative overflow-hidden">
        <div className="relative w-full h-full">
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl sm:text-5xl md:text-6xl font-bold bg-black bg-opacity-40 px-4 pb-5 pt-2 rounded-lg z-10 text-center">
            Embrace Your Natural Beauty
          </h1>
          <button className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-pink-700 z-10 font-bold">
            {" "}
            <a href="/products">Shop Now</a>
          </button>

          <div className="flex transition-transform duration-500 ease-in-out h-full animate-[slide_9s_infinite]">
            <div className="w-full h-full flex-shrink-0">
              <img
                src={cover1}
                alt="Beauty Products 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-full flex-shrink-0">
              <img
                src={cover2}
                alt="Beauty Products 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-full flex-shrink-0">
              <img
                src={cover3}
                alt="Beauty Products 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slide {
          0%,
          30% {
            transform: translateX(0%);
          }
          33%,
          63% {
            transform: translateX(-100%);
          }
          66%,
          96% {
            transform: translateX(-200%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
          <div
            data-aos="fade-up"
            className="z-50 rounded-3xl bg-gradient-to-br from-pink-200 via-primary to-white ring-1 ring-pink-200/60 shadow-sm p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-pink-900 text-3xl sm:text-4xl font-semibold leading-tight">
                Crystal Beauty Clear
              </h1>
              <p className="mt-2 text-secondary sm:text-lg">
                Discover your glow with our curated beauty collection.
              </p>
              <div className="mt-5 flex gap-3 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center rounded-lg bg-accent/90 text-white font-medium px-5 py-2.5 shadow-sm hover:bg-accent transition-colors">
                  Shop Now
                </Link>
                <a
                  href="#featured"
                  className="inline-flex items-center justify-center rounded-lg border border-pink-300 text-pink-700 font-medium px-5 py-2.5 hover:bg-pink-50">
                  Explore
                </a>
              </div>
            </div>
            <div className="flex-1 max-w-md w-full grid grid-cols-3 gap-2 opacity-90">
              <div className="h-24 sm:h-28 rounded-xl bg-white/80 ring-1 ring-black/5 overflow-hidden">
                <img
                  src={image1}
                  alt="Skincare"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-24 sm:h-28 rounded-xl bg-white/80 ring-1 ring-black/5 overflow-hidden">
                <img
                  src={image2}
                  alt="Makeup"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-24 sm:h-28 rounded-xl bg-white/80 ring-1 ring-black/5 overflow-hidden">
                <img
                  src={image3}
                  alt="Perfume"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-24 sm:h-28 rounded-xl bg-white/80 ring-1 ring-black/5 overflow-hidden">
                <img
                  src={image4}
                  alt="Moisturizer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-24 sm:h-28 rounded-xl bg-white/80 ring-1 ring-black/5 overflow-hidden">
                <img src={image5} className="w-full h-full object-cover" />
              </div>
              <div className="h-24 sm:h-28 rounded-xl bg-white/80 ring-1 ring-black/5 overflow-hidden">
                <img
                  src={image6}
                  alt="Face Mask"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section
        data-aos="fade-left"
        id="featured"
        className="mx-auto max-w-6xl p-4 pb-10 bg-white rounded">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-pink-900 font-semibold text-2xl">Featured</h2>
          <Link
            to="/products"
            className="text-pink-700 hover:text-pink-900 font-medium">
            View all
          </Link>
        </div>

        {status === "loading" && (
          <div className="w-full py-10 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-pink-300 border-b-pink-600 border-b-4"></div>
          </div>
        )}

        {status === "error" && (
          <div className="w-full py-10 text-center text-secondary">
            Could not load products. Please try again.
          </div>
        )}

        {status === "loaded" && (
          <div className="flex flex-wrap justify-center gap-2">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.productId} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* USPs */}
      <UspStrip />

      {/* Categories */}
      <Categories />

      {/* New Arrivals */}
      {status === "loaded" && <NewArrivals products={products} />}

      {/* Best Sellers */}
      {status === "loaded" && <BestSellers products={products} />}

      {/* Price Drops */}
      {status === "loaded" && <PriceDrops products={products} />}

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
