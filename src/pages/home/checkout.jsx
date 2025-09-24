import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { loadCart, clearCart } from "../../utils/cartFunction";
import Aos from "aos";
import "aos/dist/aos.css";

function decodeJwtPayload(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );
    return decoded || {};
  } catch {
    return {};
  }
}

export default function Checkout() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
      once: false,
    });
  }, []);

  const [cart, setCart] = useState([]);
  const [quote, setQuote] = useState({
    total: 0,
    labledTotal: 0,
    orderedItems: [],
  });
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const user = useMemo(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return decodeJwtPayload(token);
  }, []);

  useEffect(() => {
    const c = loadCart();
    setCart(c);
    if (!c || c.length === 0) return;
    axios
      .post(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
        }/api/orders/quote`,
        { orderedItems: c }
      )
      .then((res) => setQuote(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (user) {
      const full = [user.firstName, user.lastName].filter(Boolean).join(" ");
      if (full) setName(full);
    }
  }, [user]);

  function placeOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to place an order");
      return;
    }
    if (!name || !address || !phone) {
      toast.error("Please fill in name, address and phone");
      return;
    }
    if (!cart || cart.length === 0) {
      toast("Your cart is empty", { icon: "🛒" });
      return;
    }
    axios
      .post(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
        }/api/orders`,
        { orderedItems: cart, name, address, phone, notes },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((res) => {
        clearCart();
        setCart([]);
        toast.success("Order placed successfully");
        window.location.href = "/cart";
      })
      .catch((e) => {
        toast.error(e?.response?.data?.message || "Failed to place order");
      });
  }

  return (
    <div data-aos="fade-up" className="w-full min-h-full px-4 py-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm p-6">
            <h1 className="text-pink-900 text-2xl font-semibold">Checkout</h1>
            <p className="text-secondary">Please confirm your details.</p>

            <div className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm text-pink-900">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="mt-1 w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="block text-sm text-pink-900">Address</label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Delivery address"
                  className="mt-1 w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="block text-sm text-pink-900">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07X XXX XXXX"
                  className="mt-1 w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="block text-sm text-pink-900">
                  Notes (optional)
                </label>
                <input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any delivery notes"
                  className="mt-1 w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div>
          <div className="rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm p-6 sticky top-4">
            <h2 className="text-pink-900 font-semibold text-xl">
              Order Summary
            </h2>
            <div className="mt-3 max-h-64 overflow-auto space-y-2 pr-1">
              {quote?.orderedItems?.map((it, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img
                    src={it.image}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-pink-900 text-sm line-clamp-1">
                      {it.name}
                    </p>
                    <p className="text-secondary text-xs">
                      Rs {Number(it.price).toFixed(2)} × {it.quantity}
                    </p>
                  </div>
                  <div className="text-sm text-pink-900 font-semibold">
                    Rs {(it.price * it.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-secondary">
                <span>Subtotal</span>
                <span>Rs {Number(quote.labledTotal || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Discount</span>
                <span>
                  - Rs{" "}
                  {Number(
                    (quote.labledTotal || 0) - (quote.total || 0)
                  ).toFixed(2)}
                </span>
              </div>
              <div className="border-t border-pink-200 my-2" />
              <div className="flex justify-between text-pink-900 font-semibold">
                <span>Grand Total</span>
                <span>Rs {Number(quote.total || 0).toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={placeOrder}
              className="mt-5 w-full inline-flex items-center justify-center rounded-lg bg-accent/90 text-white font-medium px-5 py-2.5 shadow-sm hover:bg-accent transition-colors">
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
