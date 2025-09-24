import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";
import AOS from "aos";
import "aos/dist/aos.css";
import Newsletter from "./newsletter";

export default function ProductPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const [products, setProducts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");

  useEffect(() => {
    if (loadingStatus == "loading") {
      axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
          }/api/products`
        )
        .then((res) => {
          console.log(res.data);
          setLoadingStatus == "loaded";
          setProducts(res.data);
        })
        .catch((e) => {
          toast.error("failed to load products");
        });
    }
  }, []);

  return (
    <div className="mb-20 w-full">
      <div
        data-aos="fade-up"
        className=" w-full h-full overflow-y-auto flex flex-wrap justify-center gap-2 p-4">
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
      <Newsletter />
    </div>
  );
}
