import React from 'react'
import './CSS/LoginSignup.css'
import SEOMetaTags from '../Components/SEO/SEOMetaTags'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <SEOMetaTags 
        title="Login & Signup | Shopper"
        description="Create an account or login to Shopper. Enjoy personalized shopping experience and exclusive offers."
        keywords="login, signup, register, account, shopper account, fashion account"
      />
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">    
          <input type="text" placeholder='Your Name' />   
          <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='Password' />
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">
          Already have an account? <span>Login here</span>
        </p>
        <div className="loginsignup--agree">
          <input type="checkbox" />
          <p>
            I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
