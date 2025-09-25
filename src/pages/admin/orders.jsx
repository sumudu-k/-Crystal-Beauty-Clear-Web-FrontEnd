import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Orders = () => {
  const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE}/api/orders`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      setOrders([]);
      showMessage("Failed to load orders");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const allowedStatuses = useMemo(
    () => ["Preparing", "Shipped", "Delivered", "Canceled"],
    []
  );

  const onStatusChange = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE}/api/orders/${orderId}/status`,
        { status },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      setOrders((prev) =>
        (Array.isArray(prev) ? prev : []).map((o) =>
          o.orderId === orderId ? { ...o, status } : o
        )
      );
      showMessage("Order status updated");
    } catch (e) {
      showMessage("Failed to update status");
    }
  };

  const filtered = (Array.isArray(orders) ? orders : []).filter((o) => {
    const q = searchText.toLowerCase();
    return (
      (o.orderId || "").toLowerCase().includes(q) ||
      (o.email || "").toLowerCase().includes(q) ||
      (o.name || "").toLowerCase().includes(q) ||
      (o.status || "").toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ padding: 24 }}>
      <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16 }}>
        <h2>Orders</h2>
        {message && (
          <div
            style={{
              padding: 8,
              marginBottom: 16,
              backgroundColor: "#f0f0f0",
              borderRadius: 4,
            }}>
            {message}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Search by orderId, email, name, status"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: 360,
              padding: 8,
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Order ID</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Date</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Customer</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Email</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Items</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Total</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: 16 }}>
                  Loading...
                </td>
              </tr>
            ) : (
              filtered.map((o) => {
                const total = (o.orderedItems || []).reduce(
                  (sum, it) => sum + (it.price || 0) * (it.quantity || 0),
                  0
                );
                return (
                  <tr key={o.orderId}>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>
                      {o.orderId}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>
                      {o.date ? new Date(o.date).toLocaleString() : "-"}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>
                      {o.name || "-"}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>
                      {o.email || "-"}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>
                      {(o.orderedItems || []).map((it, idx) => (
                        <div key={idx}>
                          {it.name} x {it.quantity}
                        </div>
                      ))}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>
                      {total.toFixed(2)}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>
                      <select
                        value={o.status || "Preparing"}
                        onChange={(e) =>
                          onStatusChange(o.orderId, e.target.value)
                        }
                        style={{ padding: 6 }}>
                        {allowedStatuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
