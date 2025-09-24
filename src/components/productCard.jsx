import { Link } from "react-router-dom";

export default function ProductCard(props) {
  console.log(props);
  return (
    <Link to={`/productinfo/${props.product.productId}`}>
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm ring-1 ring-black/5 hover:shadow-md transition-all w-[300px] h-[420px] overflow-hidden flex flex-col m-5 relative group">
        <div key={props.product.id} className="flex-1 flex flex-col">
          <div className="relative">
            <img
              className="w-full h-[220px] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              src={props.product.images[0]}
              alt={props.product.productName}
            />
            <span className="inline-flex items-center rounded-full bg-accent/10 text-pink-700 px-2 py-0.5 text-xs font-medium absolute left-3 top-3">
              #{props.product.productId}
            </span>
          </div>
          <div className="p-4 flex-1 flex flex-col gap-2">
            <p className="text-pink-900 text-lg font-semibold text-center line-clamp-2">
              {props.product.productName}
            </p>
            <div className="flex items-baseline justify-center gap-2 mt-1">
              {props.product.lastPrice < props.product.price && (
                <span className="text-gray-400 line-through text-sm">
                  Rs {props.product.price.toFixed(2)}
                </span>
              )}
              <span className="text-pink-700 font-bold text-xl">
                Rs {props.product.lastPrice.toFixed(2)}
              </span>
            </div>
            <button className="inline-flex items-center justify-center rounded-lg bg-accent/90 text-white font-medium px-4 py-2 shadow-sm hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-auto">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
