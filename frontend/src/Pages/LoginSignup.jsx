import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './CSS/LoginSignup.css'
import SEOMetaTags from '../Components/SEO/SEOMetaTags'
import { ShopContext } from '../Context/ShopContext'

const LoginSignup = () => {
  const { login, isAuthenticated } = useContext(ShopContext);
  const navigate = useNavigate();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agree: false
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isLogin, setIsLogin] = useState(false)

  // handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  // submit logic
  const onSubmit = async () => {
    setError('')

    // basic validation
    if (!isLogin && !formData.name) {
      setError('Name is required')
      return
    }
    if (!formData.email || !formData.password) {
      setError('Email and password are required')
      return
    }
    if (!isLogin && !formData.agree) {
      setError('Please agree to Terms & Privacy Policy')
      return
    }

    try {
      setLoading(true)

      const endpoint = isLogin ? 'login' : 'register'
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password }

      const response = await axios.post(
        `http://localhost:4000/api/auth/${endpoint}`,
        payload
      )

      console.log(`${isLogin ? 'Login' : 'Signup'} Success:`, response.data)

      if (isLogin) {
        // Store token and set auth state
        login(response.data.token, response.data.user);
        alert('Login successful!');
        navigate('/'); // Redirect to home
      } else {
        alert('Signup successful!')
        // reset form
        setFormData({
          name: '',
          email: '',
          password: '',
          agree: false
        })
      }

    } catch (err) {
      console.error(err)
      setError(
        err.response?.data?.message || 'Something went wrong. Try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='loginsignup'>
      <SEOMetaTags 
        title="Login & Signup | Shopper"
        description="Create an account or login to Shopper. Enjoy personalized shopping experience and exclusive offers."
        keywords="login, signup, register, account, shopper account, fashion account"
      />

      <div className="loginsignup-container">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>

        <div className="loginsignup-fields">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button onClick={onSubmit} disabled={loading}>
          {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Continue')}
        </button>
        

        {error && <p className="error-text">{error}</p>}

        <p className="loginsignup-login">
          {isLogin ? "Don't have an account?" : 'Already have an account?'} <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign up here' : 'Login here'}</span>
        </p>

        {!isLogin && (
          <div className="loginsignup--agree">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <p>
              I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}



export default LoginSignup
