import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductNotFound from "./productNotfound";

export default function ProductOverview() {
  const params = useParams();
  // there is a default `id` section to save the params data
  const productId = params.id;

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // not-found, found, loading

  useEffect(() => {
    console.log("Product ID:", productId);
    axios.get("http://localhost:5000/api/products/" + productId).then((res) => {
      console.log(res.data);

      // if null
      if (res.data == null) {
        setStatus("notfound");
      }

      // if product found
      if (res.data != null) {
        // set the product data  if null
        setProduct(res.data);
        setStatus("found");
      }
    });
  }, []);

  return (
    <div>
      {
        // if only status is loading, then show loading message
        status == "loading" && (
          <div>
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-2 border-yellow-300 border-b-yellow-600 border-b-4"></div>
            </div>
          </div>
        )
      }
      {status == "notfound" && <ProductNotFound />}
      {status == "found" && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[35%] h-full">
            <img
              src={product.images[0]}
              alt={product.productname}
              className="w-full h-[300px] object-cover"
            />
          </div>
          <div className="w-[60%] h-full p-4">
            <h1 className="text-red-700 text-3xl font-bold">
              {product.productName}
            </h1>

            <h1 className="text-red-500 text-3xl font-bold">
              {product.altNames.join(" |")}
            </h1>
            <p className="font-bold">${product.price}</p>
            <h1>{product.description}</h1>
          </div>
        </div>
      )}
    </div>
  );
}
