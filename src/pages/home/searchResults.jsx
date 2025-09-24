import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/productCard";
import Aos from "aos";
import "aos/dist/aos.css";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function SearchResults() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
      once: false,
    });
  }, []);
  const query = useQuery();
  const q = (query.get("q") || "").trim();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
        }/api/products`
      )
      .then((res) => {
        setProducts(res.data || []);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, [q]);

  const filtered = useMemo(() => {
    if (!q) return products;
    const t = q.toLowerCase();
    return products.filter((p) => {
      const name = (p.productName || "").toLowerCase();
      const alt = Array.isArray(p.altNames)
        ? p.altNames.join(" ").toLowerCase()
        : "";
      const id = String(p.productId || "").toLowerCase();
      return name.includes(t) || alt.includes(t) || id.includes(t);
    });
  }, [products, q]);

  return (
    <div data-aos="fade-up" className="w-full min-h-full px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-pink-900 font-semibold text-2xl mb-2">
          Search Results
        </h1>
        <p className="text-secondary mb-4">
          {q ? `for "${q}"` : "All products"}
        </p>

        {status === "loading" && (
          <div className="w-full py-10 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-pink-300 border-b-pink-600 border-b-4"></div>
          </div>
        )}

        {status === "error" && (
          <div className="w-full py-10 text-center text-secondary">
            Failed to load products.
          </div>
        )}

        {status === "loaded" &&
          (filtered.length ? (
            <div className="flex flex-wrap justify-center gap-2">
              {filtered.map((p) => (
                <ProductCard key={p.productId} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm p-6 text-center text-secondary">
              No products found.
            </div>
          ))}
      </div>
    </div>
  );
}
