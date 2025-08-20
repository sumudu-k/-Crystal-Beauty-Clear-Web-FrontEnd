export function loadCart(){
    // check already has a cart data
    const cart= localStorage.getItem("cart");
    if(cart !=null){
        //if yes, convert to JSON
        return JSON.parse(cart)
    }else{
        // if no, return empty array
        return[]
    }
}

export function addToCart(productId,qty){

const cart=loadCart()
// check if the product Id is equal to the local storage stored items' product id
// if it couldnot able to find the product `index` variable value gets -1 value
const index=cart.findIndex((item)=>
    {item.productId==productId}
)
// if -1 , add productid and quntity to the end of the array
if(index==-1){
    cart.push({productId,qty})
}else{
    const newQty=cart[index].qty+qty
    if(newQty<=0){
        cart.splice(index,1)
    }else{
        cart[index].qty=newQty
    }
}
saveCart(cart)
}

export function saveCart(cart){
    // cart is an array. need to convrt to String for save in local storage
    localStorage.setItem("cart", JSON.stringify(cart) )
}




