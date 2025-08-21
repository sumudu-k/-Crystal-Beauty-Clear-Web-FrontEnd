import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cartFunction";
import CartCard from "../../components/cartCard";

export default function Cart() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    // get cart details from the loadCart funtion
    setCart(loadCart());
  }, []);

  return (
    <div className="flex flex-col w-full h-full overflow-y-scroll items-center">
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
    </div>
  );
}
