import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cartFunction";
import CartCard from "../../components/cartCard";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [labledTotal, setLabledTotal] = useState(0);

  useEffect(() => {
    // get cart details from the loadCart funtion
    setCart(loadCart());
    console.log("load cart" + loadCart());
    axios
      .post("http://localhost:5000/api/orders/quote", {
        orderedItems: loadCart(),
      })
      .then((res) => {
        setTotal(res.data.total);
        setLabledTotal(res.data.labledTotal);
        console.log(res.data);
      });
  }, []);

  function onOrderCheckoutClick() {
    const token = localStorage.getItem("token");

    if (token == null) {
      return;
    }

    axios
      .post(
        "http://localhost:5000/api/orders",
        {
          orderedItems: cart,
          phone: "0764455658",
          address: "karandeniya",
          name: "slk sumudu",
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  }

  return (
    <div className="w-full h-full overflow-y-scroll relative">
      <table className="w-full overflow-x-scroll">
        <thead>
          <tr className="bg-green-100">
            <th>Image</th>
            <th>ProductName</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((item) => {
            return (
              <CartCard
                key={item.productId}
                productId={item.productId}
                qty={item.qty}
              />
            );
          })}
        </tbody>
      </table>

      <div className="text-right pr-3 text-2xl text-yellow-700">
        <p>Total:{labledTotal.toFixed(2)} </p>
        <p>Discount:{(labledTotal - total).toFixed(2)} </p>
        <p>Grand Total:{total.toFixed(2)} </p>
      </div>

      <button
        onClick={onOrderCheckoutClick}
        className="bg-yellow-600 hover:bg-yellow-700 px-5 py-1 font-bold rounded text-white absolute right-0 mr-3 mt-3">
        Checkout
      </button>
    </div>
  );
}
