import { FiTruck, FiRotateCcw, FiShield } from "react-icons/fi";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function UspStrip() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
      once: false,
    });
  }, []);
  const items = [
    {
      icon: <FiTruck className="text-pink-700" />,
      title: "Free Shipping",
      desc: "Orders over Rs 5,000",
    },
    {
      icon: <FiRotateCcw className="text-pink-700" />,
      title: "Easy Returns",
      desc: "Within 7 days",
    },
    {
      icon: <FiShield className="text-pink-700" />,
      title: "Secure Checkout",
      desc: "100% protected",
    },
  ];
  return (
    <section data-aos="fade-down" className="mx-auto max-w-6xl px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((it, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm p-4">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-xl">
              {it.icon}
            </div>
            <div>
              <p className="text-pink-900 font-semibold">{it.title}</p>
              <p className="text-secondary text-sm">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
