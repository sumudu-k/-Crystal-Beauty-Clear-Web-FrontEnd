import { Link } from "react-router-dom";

export default function ProductCard(props) {
  console.log(props);
  return (
    <Link to={`/productinfo/${props.product.productId}`}>
      <div className="bg-white w-[300px] h-[450px]  rounded-xl  shadow-md  shadow-gray-400 hover:bg-yellow-100  hover:scale-105 overflow-hidden flex flex-col m-5  relative ">
        <div key={props.product.id}>
          <img
            className="w-full object-cover"
            src={props.product.images[0]}
            alt="image"
          />
          <div className="p-2">
            <p className="text-sky-950 text-2xl font-bold text-center line-clamp-2">
              {props.product.productName}
            </p>
            <p className="line-through text-1xl ">
              {props.product.lastPrice < props.product.price && (
                <p>Rs {props.product.price.toFixed(2)}</p>
              )}
            </p>
            <p className="font-bold text-orange-600 text-2xl absolute bottom-0 mb-1 ">
              Rs &nbsp;
              {props.product.lastPrice.toFixed(2)}
            </p>
            <p className="font-bold text-gray-500 text-1xl absolute bottom-0 right-0 mb-1 me-2 ">
              {props.product.productId}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
