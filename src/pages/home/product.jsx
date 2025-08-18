import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");

  useEffect(() => {
    if (loadingStatus == "loading") {
      axios
        .get("http://localhost:5000/api/products")
        .then((res) => {
          console.log(res.data);
          setLoadingStatus == "loaded";
          setProducts(res.data);
        })
        .catch((e) => {
          toast.error("failed to load products");
        });
    }
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <p>{product.productName}</p>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <p>{product.lastPrice}</p>
          <img src={product.images[0]} alt="image" />
        </div>
      ))}
    </div>
  );
}
