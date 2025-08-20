import axios from "axios";
import { useEffect, useState } from "react";

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
          console.log(res.data);
          setProduct(res.data);
          setLoaded(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return (
    <div>
      <p>{productId}</p>
      <p>{qty}</p>
    </div>
  );
}
