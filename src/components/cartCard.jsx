import axios from "axios";
import { useEffect, useState } from "react";
import { deleteItem } from "../utils/cartFunction";

export default function CartCard(props) {
  const productId = props.productId;
  const qty = props.qty;

  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get("http://localhost:5000/api/products/" + productId)
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

  return (
    <tr className="hover:bg-yellow-600 hover:text-white ">
      {/* this is a cart card. this fetch only one product details. so, no need to use map() function */}
      <td className="">
        <img
          src={product?.images[0]}
          className="w-[90px] h-[90px] object-cover mx-auto "
        />
      </td>
      <td className="text-center">{product?.productName}</td>

      <td className="text-center">{product?.price.toFixed(2)}</td>

      <td className="text-center">{qty}</td>
      <td className="text-center">{product?.price * qty.toFixed(2)}</td>
    </tr>
  );
}
