import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Testimonials() {
  useEffect(() => {
    Aos.init({
      duration: 4000,
      once: false,
    });
  }, []);
  const items = [
    {
      name: "Nimali S.",
      quote: "My skin feels refreshed and glowing!",
      tag: "Skincare",
    },
    {
      name: "Tharushi P.",
      quote: "Fast delivery and lovely packaging.",
      tag: "Delivery",
    },
    {
      name: "Ishara K.",
      quote: "Colors are gorgeous and long-lasting!",
      tag: "Makeup",
    },
  ];
  return (
    <section data-aos="fade-right" className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-pink-900 font-semibold text-2xl mb-4">
        What Customers Say
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((t, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm p-5">
            <div className="inline-flex items-center rounded-full bg-pink-50 text-pink-800 px-3 py-1 text-xs font-medium mb-3">
              {t.tag}
            </div>
            <p className="text-secondary">“{t.quote}”</p>
            <p className="text-pink-900 font-semibold mt-3">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
