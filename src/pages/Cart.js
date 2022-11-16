import { useContext, useEffect, useState } from "react"

import { CartContext } from "./CartContext"


const Cart = () => {

  let total = 0;

  const [priceFetched,togglePricedFetched]  = useState(false);

  const[products ,setProducts] =useState([])

  const {cart ,setCart} = useContext(CartContext);

  useEffect(()=>{

    if(!cart.items){

      return;
    }

    if(priceFetched){
      return;
    }

    fetch('https://star-spark-pasta.glitch.me/api/products/cart-items',{
      method:'POST',
      headers:{
       'Content-Type': 'application/json'
      } ,
      body: JSON.stringify({ids:Object.keys(cart.items)})
    }).then(res=>res.json())
    .then(products =>{
      console.log(products)
      setProducts(products)

      togglePricedFetched(true)

    })

  },[cart])

   function getQty(productId){

    return cart.items[productId]

  }

  function increment(productId){

    const existingQty =cart.items[productId];

    const _cart = {...cart};

    _cart.items[productId] = existingQty + 1;
    _cart.totalItems += 1;

    setCart(_cart)



  }

  function decrement(productId){



    const existingQty =cart.items[productId];

    if(existingQty === 1){
      return;
    }

    const _cart = {...cart};

    _cart.items[productId] = existingQty - 1;
    _cart.totalItems -= 1;

    setCart(_cart)

   



  }

      function getSum(productId,price){

        const sum = price * getQty(productId);
        total += sum;
        return sum;
      }


      function handleDelete(productId){

            const _cart ={...cart}
            const qty = _cart.items[productId];

            delete _cart.items[productId];

            _cart.totalItems =qty;

            setCart(_cart);

            const updateProductList = products.filter((product)=>product._id !== productId)

            setProducts(updateProductList);

      }

      function handleOrderNow(){
        window.alert('Order Placed Successfully')
        setProducts([]);
        setCart({});
      }

  return (

    products.length?
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      <h1 className="my-12 font-bold">Cart Item</h1>

      <ul>

        {
          products.map(product=>{
            return         <li className="mb-12" key={product._id}>
            <div className="flex items-center justify-between">
              <div className="flex item-center">
                <img className="h-16" src={product.image}alt="pizza" />
                <span className="font-bold ml-4 w-48"> {product.name}</span>
              </div>
  
              <div >
  
                <button onClick={()=>{decrement(product._id)}} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">-</button>
                <b className="px-4">{getQty(product._id)}</b>
                <button onClick={()=>{increment(product._id)}} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">+</button>
  
              </div>
              <span>$ {getSum(product._id,product.price)}</span>
  
              <button onClick={()=>{handleDelete(product._id)}} className="bg-red-500 px-4 py-2 rounded-full leading-none text-white"> Delete</button>
  
            </div>
          </li>

          })
        }
 

      </ul>
      <hr className="my-6" />

      <div className="text-right">
         <b>Grand Total : $</b> {total}
      </div>

      <div  className="text-right">
        <button onClick={handleOrderNow} className="bg-yellow-500 px-4 mt-4 py-2 rounded-full leading-none text-white">Order Now</button>
      </div>

    </div>
    : <img className="mx-auto w-1/2 mt-12" src="images/empty-cart.png" alt="pizza"  />
  )
}

export default Cart
