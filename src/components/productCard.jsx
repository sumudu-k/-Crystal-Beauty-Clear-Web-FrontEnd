export default function ProductCard(props) {
    console.log(props)
    return (
        <div>
            <h1>{props.name}</h1>
            <h4>Price: {props.price}</h4>
            <button>Add to Cart</button>
        </div>
    )
}