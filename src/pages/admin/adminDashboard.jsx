import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUserFriends, FaBoxOpen, FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";

    async function load() {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          axios.get(`${base}/api/products`),
          axios
            .get(`${base}/api/orders`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
              },
            })
            .catch((e) => {
              return { data: [] };
            }),
        ]);

        const products = Array.isArray(productsRes.data)
          ? productsRes.data
          : [];
        setProductsCount(products.length);
        setLowStockCount(products.filter((p) => (p.stock || 0) < 10).length);

        const orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
        setOrdersCount(orders.length);
        const uniqueEmails = new Set(
          orders.map((o) => o.email).filter(Boolean)
        );
        setCustomersCount(uniqueEmails.size);
      } catch (e) {
        toast.error("Failed to load admin stats");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cards = [
    {
      title: "Customers",
      value: customersCount,
      icon: <FaUserFriends className="text-pink-700" />,
      accent: "bg-pink-50",
    },
    {
      title: "Products",
      value: productsCount,
      icon: <FaBoxOpen className="text-pink-700" />,
      accent: "bg-pink-50",
    },
    {
      title: "Orders",
      value: ordersCount,
      icon: <FaCartPlus className="text-pink-700" />,
      accent: "bg-pink-50",
    },
    {
      title: "Low Stock (<10)",
      value: lowStockCount,
      icon: <FaBoxOpen className="text-pink-700" />,
      accent: "bg-pink-50",
    },
  ];

  return (
    <div className="w-full h-full p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-pink-900">Dashboard</h1>
          <p className="text-secondary">Quick stats at a glance</p>
        </div>
        <Link
          to="/admin/register"
          className="inline-flex items-center rounded-lg bg-accent/90 text-white font-medium px-4 py-2 shadow-sm hover:bg-accent transition-colors">
          + Admin Register
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm p-5 flex items-center gap-4">
            <div
              className={`w-12 h-12 ${c.accent} rounded-lg flex items-center justify-center ring-1 ring-pink-200`}>
              {c.icon}
            </div>
            <div className="flex-1">
              <div className="text-sm text-secondary">{c.title}</div>
              <div className="text-2xl font-semibold text-pink-900">
                {loading ? "—" : c.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
