import React from 'react'

import {useState,useEffect} from 'react'

import {useParams,useHistory} from 'react-router-dom'

function SingleProduct() {
 
    const [product,setProduct] =useState({});

    const params = useParams();

    const history = useHistory()


    useEffect(()=>{

        // let data =fetch(`https://ecom-rest-apis.herokuapp.com/api/products/${params._id}`)
        fetch(`https://star-spark-pasta.glitch.me/api/products/${params._id}`)

    
      .then(res => res.json())

      .then(product=>{

        console.log(product)
        setProduct(product)
      })

    },[params._id])



  return (
    <div className='container mx-auto mt-12'>

        <button className='mb-12 font-bold ml-16' onClick={()=>{history.goBack()}}>Back</button> 

        <div className="flex ">
            <img src={product.image} alt="pizza" />

            <div className='ml-16'>

                <h1 className='text-xl font-bold'>{product.name}</h1>
                <div className='text-md'>{product.size}</div>

                <div className='font-bold mt-2'>$ {product.price}</div>

                <button className='bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4'>Add To Cart</button>
                        
                </div>

        </div>
                    

    </div>
  )
}

export default SingleProduct
 