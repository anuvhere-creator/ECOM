import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/Newsletter'
import SEOMetaTags from '../Components/SEO/SEOMetaTags'

const Shop = () => {
  return (
    <div>
      <SEOMetaTags 
        title="Shopper - Fashion For Everyone | Home" 
        description="Discover the latest fashion trends with Shopper. Quality products at affordable prices for men, women, and kids."
        keywords="fashion, clothing, online shopping, latest trends, new arrivals, shopper"
      />
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  )
}

export default Shop
