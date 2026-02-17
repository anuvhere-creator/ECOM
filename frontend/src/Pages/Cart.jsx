import React, { useContext } from 'react'
import './CSS/Cart.css'
import { ShopContext } from '../Context/ShopContext'
import CartItems from '../Components/CartItems/CartItems'
import SEOMetaTags from '../Components/SEO/SEOMetaTags'

const Cart = () => {
  const { getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  return (
    <div>
      <SEOMetaTags 
        title="Shopping Cart | Shopper"
        description="Review your shopping cart items and checkout securely. Shopper offers quality fashion at affordable prices."
        keywords="shopping cart, checkout, online shopping, fashion cart, shopper"
      />
      <CartItems />
    </div>
  )
}

export default Cart