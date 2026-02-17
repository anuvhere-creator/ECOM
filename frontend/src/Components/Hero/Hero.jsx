import React from 'react';
import './Hero.css';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2 className="animate-slide-left">NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon animate-slide-left delay-200">
            <p>new</p>
            <img src={hand_icon} alt="hand icon" />
          </div>
          <p className="animate-slide-left delay-300">collections</p>
          <p className="animate-slide-left delay-400">for everyone</p>
        </div>
        <Link to="/shop" className="hero-latest-btn animate-slide-up delay-500 hover-lift">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="arrow icon" />
        </Link>
      </div>
      <div className="hero-right animate-fade-in">
        <img src={hero_image} alt="hero" className="animate-slide-right" />
      </div>
    </div>
  );
};

export default Hero;