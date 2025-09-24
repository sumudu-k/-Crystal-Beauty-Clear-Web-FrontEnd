import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadCart } from "../../utils/cartFunction";
import CartCard from "../../components/cartCard";
import axios from "axios";
import toast from "react-hot-toast";
import Newsletter from "./newsletter";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [labledTotal, setLabledTotal] = useState(0);
  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  function refreshCartAndQuote() {
    const current = loadCart();
    setCart(current);
    if (!current || current.length === 0) {
      setTotal(0);
      setLabledTotal(0);
      return;
    }
    axios
      .post(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
        }/api/orders/quote`,
        {
          orderedItems: current,
        }
      )
      .then((res) => {
        setTotal(res.data.total);
        setLabledTotal(res.data.labledTotal);
      })
      .catch(() => {
        // keep previous totals on error
      });
  }

  useEffect(() => {
    refreshCartAndQuote();
  }, []);

  function onOrderCheckoutClick() {
    navigate("/checkout");
  }

  function openOrders() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to see your orders");
      return;
    }
    setShowOrders(true);
    setOrdersLoading(true);
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
        }/api/orders`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => setOrders(res.data || []))
      .catch((e) => {
        toast.error(e?.response?.data?.message || "Failed to load orders");
      })
      .finally(() => setOrdersLoading(false));
  }

  return (
    <div className="w-full min-h-full px-4 py-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.length === 0 && (
            <div className="rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm p-6 text-center text-secondary">
              Your cart is empty.
            </div>
          )}
          {cart.map((item) => (
            <CartCard
              key={item.productId}
              productId={item.productId}
              qty={item.qty}
              onChanged={refreshCartAndQuote}
            />
          ))}
        </div>

        {/* Summary */}
        <div>
          <div className="rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm p-6 sticky top-4">
            <h2 className="text-pink-900 font-semibold text-xl">
              Order Summary
            </h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-secondary">
                <span>Subtotal</span>
                <span>Rs {labledTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Discount</span>
                <span>- Rs {(labledTotal - total).toFixed(2)}</span>
              </div>
              <div className="border-t border-pink-200 my-2" />
              <div className="flex justify-between text-pink-900 font-semibold">
                <span>Grand Total</span>
                <span>Rs {total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => {
                const token = localStorage.getItem("token");
                if (!token) {
                  toast.error("Please log in to checkout");
                  return;
                }
                onOrderCheckoutClick();
              }}
              className="mt-5 w-full inline-flex items-center justify-center rounded-lg bg-accent/90 text-white font-medium px-5 py-2.5 shadow-sm hover:bg-accent transition-colors">
              Checkout
            </button>
            <button
              onClick={openOrders}
              className="mt-3 w-full inline-flex items-center justify-center rounded-lg border border-pink-300 bg-white/70 text-pink-700 font-medium px-5 py-2.5 hover:bg-pink-50 transition-colors">
              My Orders
            </button>
          </div>
        </div>
      </div>

      {showOrders && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowOrders(false)}
          />
          <div className="relative w-full max-w-2xl mx-4 rounded-2xl bg-white ring-1 ring-black/5 shadow-xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-pink-900">My Orders</h3>
              <button
                onClick={() => setShowOrders(false)}
                className="text-pink-700 hover:text-pink-900">
                Close
              </button>
            </div>
            <div className="mt-3 max-h-[60vh] overflow-auto pr-2">
              {ordersLoading ? (
                <div className="py-10 text-center text-secondary">
                  Loading...
                </div>
              ) : orders.length === 0 ? (
                <div className="py-10 text-center text-secondary">
                  No orders yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => {
                    const total = (order.orderedItems || []).reduce(
                      (sum, it) => sum + (it.price || 0) * (it.quantity || 0),
                      0
                    );
                    return (
                      <div
                        key={order._id || order.orderId}
                        className="rounded-xl border border-pink-200 bg-white/80 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="text-pink-900 font-medium">
                            {order.orderId}
                          </div>
                          <div className="text-sm text-secondary">
                            {order.status || "Preparing"} •{" "}
                            {new Date(order.date).toLocaleString()}
                          </div>
                        </div>
                        <div className="mt-2 space-y-1 text-sm">
                          {(order.orderedItems || []).map((it, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between">
                              <span className="text-pink-900">
                                {it.name} × {it.quantity}
                              </span>
                              <span className="text-secondary">
                                Rs {(it.price * it.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-pink-200 my-2" />
                        <div className="flex items-center justify-between text-pink-900 font-semibold">
                          <span>Total</span>
                          <span>Rs {total.toFixed(2)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Newsletter />
    </div>
  );
}
