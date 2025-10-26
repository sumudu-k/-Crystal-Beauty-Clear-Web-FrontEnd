import React, { useState, useEffect } from "react";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("");

  const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";

  useEffect(() => {
    fetchCustomers();
  }, []);

  const showMessage = (text, type = "info") => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE}/api/orders`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const orders = Array.isArray(res.data) ? res.data : [];

      const map = new Map();
      for (const o of orders) {
        const email = o?.email || "";
        if (!email) continue;
        if (!map.has(email)) {
          map.set(email, {
            _id: email,
            name: o?.name || "",
            email,
            phone: o?.phone || "",
            address: o?.address || "",
            createdAt: o?.createdAt || o?.date || new Date().toISOString(),
            ordersCount: 1,
          });
        } else {
          const c = map.get(email);
          c.ordersCount += 1;
          if (!c.name && o?.name) c.name = o.name;
          if (!c.phone && o?.phone) c.phone = o.phone;
          if (!c.address && o?.address) c.address = o.address;
          map.set(email, c);
        }
      }
      setCustomers(Array.from(map.values()));
    } catch (error) {
      showMessage("Failed to fetch customers", "error");
      setCustomers([]);
    }
    setLoading(false);
  };

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setIsModalVisible(true);
  };

  const handleDelete = async (customerId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/api/users`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        data: { email: customerId },
      });
      setCustomers((prev) =>
        Array.isArray(prev) ? prev.filter((c) => c._id !== customerId) : []
      );
      showMessage("Customer deleted successfully", "success");
    } catch (error) {
      showMessage("Failed to delete customer", "error");
    }
  };

  const filteredCustomers = (Array.isArray(customers) ? customers : []).filter(
    (customer) =>
      (customer.name || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (customer.email || "").toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
        }}>
        <h2>Customer Management</h2>

        {message && (
          <div
            style={{
              padding: "8px",
              marginBottom: "16px",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
            }}>
            {message}
          </div>
        )}

        <div style={{ marginBottom: "16px" }}>
          <input
            type="text"
            placeholder="Search customers..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: "300px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Email
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Phone
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Registration Date
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "16px" }}>
                  Loading...
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr key={customer._id}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {customer.name || "N/A"}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {customer.email || "N/A"}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {customer.phone || "N/A"}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {customer.createdAt
                      ? new Date(customer.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    <button
                      onClick={() => handleView(customer)}
                      style={{
                        marginRight: "8px",
                        padding: "4px 8px",
                        backgroundColor: "#1890ff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}>
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(customer._id)}
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#ff4d4f",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {isModalVisible && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "8px",
                width: "600px",
                maxWidth: "90%",
              }}>
              <h3>Customer Details</h3>
              {selectedCustomer && (
                <div>
                  <p>
                    <strong>Name:</strong> {selectedCustomer.name || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedCustomer.email || "N/A"}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedCustomer.phone || "N/A"}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {selectedCustomer.address || "N/A"}
                  </p>
                  <p>
                    <strong>Registration Date:</strong>{" "}
                    {selectedCustomer.createdAt
                      ? new Date(selectedCustomer.createdAt).toLocaleString()
                      : "-"}
                  </p>
                </div>
              )}
              <button
                onClick={() => setIsModalVisible(false)}
                style={{
                  marginTop: "16px",
                  padding: "8px 16px",
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
