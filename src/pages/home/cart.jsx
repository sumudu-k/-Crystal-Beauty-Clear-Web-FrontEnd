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
    <div className="flex flex-col w-full h-full bg-yellow-300 overflow-y-scroll items-center">
      {cart.map((item) => {
        return (
          <CartCard
            key={item.productId}
            productId={item.productId}
            qty={item.qty}
          />
        );
      })}
    </div>
  );
}
