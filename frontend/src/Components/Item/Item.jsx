import React from 'react'
import { Link } from 'react-router-dom'
import './Item.css'

const Item = (props) => {
  return (
    <div className='item animate-fade-in hover-lift'>
      <Link to={`/product/${props.id}`}>
        <img 
          src={props.image} 
          alt={props.name} 
          onClick={() => window.scrollTo(0, 0)} 
          className="hover-grow"
        />
      </Link>
      <p className="animate-slide-up delay-200">{props.name}</p>
      
      <div className="item-prices animate-slide-up delay-300">
        <div className="item-price-new">
          ${props.new_price}
        </div>
        <div className="item-price-old">
          ${props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item
