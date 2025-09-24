import ProductCard from "../../components/productCard";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function NewArrivals({ products = [] }) {
  useEffect(() => {
    Aos.init({
      duration: 2000,
      once: false,
    });
  }, []);
  const sorted = [...products].sort((a, b) => {
    const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return db - da;
  });

  return (
    <section data-aos="fade-up" className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-pink-900 font-semibold text-2xl">New Arrivals</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {sorted.slice(0, 8).map((p) => (
          <ProductCard key={p.productId} product={p} />
        ))}
      </div>
    </section>
  );
}
