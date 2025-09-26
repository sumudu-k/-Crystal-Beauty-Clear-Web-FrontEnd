import axios from "axios";
import { useEffect, useState } from "react";
import { addToCart, deleteItem } from "../utils/cartFunction";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

export default function CartCard(props) {
  const productId = props.productId;
  const qty = props.qty;
  const onChanged = props.onChanged || (() => {});

  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";

  useEffect(() => {
    if (!loaded) {
      axios
        .get(`${API_BASE}/api/products/${productId}`)
        .then((res) => {
          if (res.data != null) {
            setProduct(res.data);
            setLoaded(true);
          } else {
            deleteItem(productId);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const unit = product?.lastPrice ?? product?.price ?? 0;
  const lineTotal = (unit * (qty || 0)).toFixed(2);

  return (
    <div className="relative rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm p-4 flex flex-col items-start  overflow-x-hidden">
      <button
        aria-label="Remove item"
        onClick={() => {
          deleteItem(productId);
          onChanged();
        }}
        className="absolute right-3 flex w-8 h-8  items-center justify-center rounded-md ring-1 ring-pink-200 text-pink-700 hover:bg-pink-50"
        title="Remove">
        <FiTrash2 />
      </button>
      <div className="flex">
        <img
          src={product?.images?.[0]}
          alt={product?.productName}
          className="w-[70px] h-[70px] object-cover rounded-md ring-1 ring-pink-200"
        />
        <p className="text-pink-900 font-medium line-clamp-2 ml-3">
          {product?.productName}
        </p>
      </div>

      <div className="mt-1 flex items-baseline gap-2">
        {product && product.lastPrice < product.price && (
          <span className="text-gray-400 line-through text-sm">
            Rs {product.price.toFixed(2)}
          </span>
        )}
        <span className="text-pink-700 font-semibold">
          Rs {Number(unit).toFixed(2)}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between w-full">
        <div className="inline-flex items-center gap-2">
          <button
            aria-label="Decrease quantity"
            onClick={() => {
              if ((qty || 0) <= 1) {
                toast("Minimum quantity is 1", { icon: "⚠" });
                return;
              }
              addToCart(productId, -1);
              onChanged();
            }}
            className="w-7 h-7 rounded-md ring-1 ring-pink-200 text-pink-700 hover:bg-pink-50">
            −
          </button>
          <span className="text-secondary text-sm min-w-[1.5rem] text-center">
            {qty}
          </span>
          <button
            aria-label="Increase quantity"
            onClick={() => {
              const max = product?.stock ?? Infinity;
              if ((qty || 0) >= max) {
                toast.error("Not enough stock available");
                return;
              }
              addToCart(productId, 1);
              onChanged();
            }}
            className="w-7 h-7 rounded-md ring-1 ring-pink-200 text-pink-700 hover:bg-pink-50">
            +
          </button>
        </div>
        <div className="text-pink-900 font-semibold text-right">
          Total Rs: {lineTotal}
        </div>
      </div>
    </div>
  );
}
