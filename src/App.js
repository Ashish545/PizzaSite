import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import  Navigation from './components/Navigation';


import Home from './pages/Home';
// import About from './pages/About';
// import Products from './pages/ProductsPage'
import Cart from './pages/Cart'

import "./index.css"

import SingleProduct from './pages/SingleProduct';
import ProductsPage from './pages/ProductsPage';
import { CartContext } from './pages/CartContext';
import { useState } from 'react';
import { useEffect } from 'react';
function App(){

    const[cart,setCart] =useState({});

    // fetch from local storage
    useEffect(()=>{

      const cart =  window.localStorage.getItem('cart');

      setCart(JSON.parse(cart))


    },[])

    useEffect(()=>{

      window.localStorage.setItem('cart',JSON.stringify(cart));



    },[cart])

        return(
        <> 
            <Router>

               <CartContext.Provider value={{cart,setCart}}>

               <Navigation/>

        <Switch>


                            <Route path='/' component={Home} exact></Route>
                            {/* <Route path='/about' element={<About/>}></Route> */}
                            <Route path='/products' exact component={ProductsPage}></Route>
                            <Route path='/products/:_id' component={SingleProduct}></Route>


                            <Route path='/cart' component={Cart}></Route>
        </Switch>
 
   

               </CartContext.Provider>
                
            </Router>            


        </>
        )

 

}

export default App;