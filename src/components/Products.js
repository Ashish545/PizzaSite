import Product from './Product';
import {useState,useEffect,useContext} from 'react';

import { CartContext } from '../pages/CartContext';



const Products = () => {

  //  const{name} =  useContext(CartContext);

    const [products,setProducts] = useState([]);

    useEffect(()=>{

      // fetch('/api/products')
      // fetch(' https://ecom-rest-apis.herokuapp.com/api/products')
      // .then(response => response.json())
      // .then(products =>{
      //   // setProducts(products)
      //   console.log(products)
      // });

      // let data =fetch(' https://ecom-rest-apis.herokuapp.com/api/products')
      let data =fetch('https://star-spark-pasta.glitch.me/api/products')
      data.then((item)=>{

        return item.json()
     

      }).then((products)=>{
        setProducts(products);
        console.log(products)
      })
      
      

    },[])
  return (
    <div className="container mx-auto pb-24">
        <h1 className="text-lg font-bold my-8">Products</h1>

        <div className=" grid grid-cols-5 my-8 gap-24">

        

                      {

                        // products.map((item)=>  <Product key={item._id} id={item.id} name={item.name} price={item.price} image={item.image} size={item.size}/>
                        products.map((product)=>  <Product key={product._id} product={product}/>
                        
                        )
                      }
            
            </div>

        </div>
        
      
    
  )
}

export default Products
