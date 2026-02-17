import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'   
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import SEOMetaTags from '../Components/SEO/SEOMetaTags';

const Product = () => {
  const { all_product } = useContext(ShopContext); 
  const { productId } = useParams();              
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const foundProduct = all_product.find(e => e.id == productId);
    setProduct(foundProduct);
    window.scrollTo(0, 0);
  }, [productId, all_product]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SEOMetaTags 
        title={`${product.name} | Shopper`}
        description={`Shop ${product.name} - ${product.category}'s fashion at Shopper. Original price: $${product.old_price}, now: $${product.new_price}.`}
        keywords={`${product.name}, ${product.category} fashion, clothing, shopper, fashion product`}
      />
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts category={product.category} currentProductId={product.id} />
    </div>
  )
}

export default Product;
