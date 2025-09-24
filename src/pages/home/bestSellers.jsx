import ProductCard from "../../components/productCard";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function BestSellers({ products = [] }) {
  useEffect(() => {
    Aos.init({
      duration: 2000,
      once: false,
    });
  }, []);
  const scored = [...products].map((p) => ({
    p,
    score:
      typeof p.ordersCount === "number"
        ? p.ordersCount
        : 100000 - (p.lastPrice || 0),
  }));
  const sorted = scored.sort((a, b) => b.score - a.score).map((x) => x.p);

  return (
    <section
      data-aos="fade-up"
      className="mx-auto max-w-6xl p-4 py-6 bg-white  rouned">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-pink-900 font-semibold text-2xl">Best Sellers</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {sorted.slice(0, 8).map((p) => (
          <ProductCard key={p.productId} product={p} />
        ))}
      </div>
    </section>
  );
}
