import ProductCard from "../../components/productCard";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function PriceDrops({ products = [] }) {
  useEffect(() => {
    Aos.init({
      duration: 2000,
      once: false,
    });
  }, []);
  const items = products.filter(
    (p) =>
      typeof p.price === "number" &&
      typeof p.lastPrice === "number" &&
      p.lastPrice < p.price
  );

  if (!items.length) return null;

  return (
    <section
      data-aos="fade-up"
      className="mx-auto max-w-6xl p-4 py-6 bg-pink-100 rounded">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-pink-900 font-semibold text-2xl">Price Drops</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {items.slice(0, 8).map((p) => (
          <ProductCard key={p.productId} product={p} />
        ))}
      </div>
    </section>
  );
}
