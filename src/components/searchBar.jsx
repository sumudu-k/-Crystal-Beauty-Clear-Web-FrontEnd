import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({
  initial = "",
  placeholder = "Search products...",
  size = "md",
}) {
  const [term, setTerm] = useState(initial);
  const navigate = useNavigate();

  useEffect(() => {
    setTerm(initial);
  }, [initial]);

  function onSubmit(e) {
    e.preventDefault();
    const q = term.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  const sizeClasses =
    size === "lg"
      ? "h-12 text-base px-4"
      : size === "sm"
      ? "h-9 text-sm px-3"
      : "h-10 text-sm px-3";

  return (
    <form onSubmit={onSubmit} className="w-full flex items-center gap-2">
      <div
        className={`flex-1 flex items-center rounded-lg border border-pink-200 bg-white/80 ${sizeClasses} focus-within:ring-2 focus-within:ring-pink-300`}>
        <FiSearch className="mx-2 text-pink-700" />
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg bg-accent/90 text-white font-medium px-4 py-2 shadow-sm hover:bg-accent transition-colors">
        Search
      </button>
    </form>
  );
}
