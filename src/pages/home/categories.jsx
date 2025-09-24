import { Link } from "react-router-dom";

const CATS = [
  { key: "skincare", label: "Skincare" },
  { key: "makeup", label: "Makeup" },
  { key: "haircare", label: "Haircare" },
  { key: "fragrance", label: "Fragrance" },
  { key: "tools", label: "Tools" },
];

export default function Categories() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <h2 className="text-pink-900 font-semibold text-2xl mb-3">
        Shop by Category
      </h2>
      <div className="flex flex-wrap gap-2">
        {CATS.map((c) => (
          <Link
            key={c.key}
            to={`/products?cat=${c.key}`}
            className="inline-flex items-center rounded-full bg-pink-50 text-pink-800 px-4 py-2 ring-1 ring-pink-200 hover:bg-pink-100">
            {c.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
