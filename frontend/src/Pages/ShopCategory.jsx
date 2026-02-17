import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';
import SEOMetaTags from '../Components/SEO/SEOMetaTags';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  
  // Capitalize first letter for title
  const categoryTitle = props.category.charAt(0).toUpperCase() + props.category.slice(1);
  
  return (
    <div className='ShopCategory'>
      <SEOMetaTags 
        title={`Shopper - ${categoryTitle}'s Fashion Collection`}
        description={`Explore our ${props.category}'s fashion collection. Latest styles, trends, and affordable prices.`}
        keywords={`${props.category} fashion, ${props.category} clothing, ${props.category} collection, shopper`}
      />
      <img src={props.banner} alt={`${props.category} banner`} />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="dropdown icon" />
        </div>
      </div>

      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item 
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
