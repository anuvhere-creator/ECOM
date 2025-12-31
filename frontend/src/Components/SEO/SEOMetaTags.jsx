import React, { useEffect } from 'react';

const SEOMetaTags = ({ title, description, keywords }) => {
  useEffect(() => {
    // Update document title
    document.title = title || 'Shopper - Fashion For Everyone';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || 'Shopper - Discover the latest fashion trends with quality products at affordable prices.');
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords || 'fashion, clothing, online shopping, men\'s fashion, women\'s fashion, kids clothing, shopper, ecommerce');
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title || 'Shopper - Fashion For Everyone');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description || 'Discover the latest fashion trends with quality products at affordable prices.');
    }
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title || 'Shopper - Fashion For Everyone');
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description || 'Discover the latest fashion trends with quality products at affordable prices.');
    }
  }, [title, description, keywords]);
  
  // This component doesn't render anything
  return null;
};

export default SEOMetaTags;