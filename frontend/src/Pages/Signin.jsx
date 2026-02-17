import React, { useState } from 'react'
import axios from 'axios'
import './CSS/LoginSignup.css'
import SEOMetaTags from '../Components/SEO/SEOMetaTags'

const Signin = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // login submit
  const onSubmit = async () => {
    setError('')

    if (!formData.email || !formData.password) {
      setError('Email and password are required')
      return
    }

    try {
      setLoading(true)

      const response = await axios.post(
        'http://localhost:4000/api/auth/login', // 🔁 backend login API
        {
          email: formData.email,
          password: formData.password
        }
      )

      console.log('Login Success:', response.data)

      // store token (if backend returns it)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }

      alert('Login successful!')

      // redirect example
      // navigate('/')

    } catch (err) {
      console.error(err)
      setError(
        err.response?.data?.message || 'Invalid email or password'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='loginsignup'>
      <SEOMetaTags 
        title="Login | Shopper"
        description="Login to Shopper and continue shopping with exclusive offers."
        keywords="login, sign in, shopper login, fashion account"
      />

      <div className="loginsignup-container">
        <h1>Login</h1>

        <div className="loginsignup-fields">    
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
          {loading ? 'Please wait...' : 'Login'}
        </button>

        {error && <p className="error-text">{error}</p>}

        <p className="loginsignup-login">
          Don’t have an account? <span>Sign up here</span>
        </p>
      </div>
    </div>
  )
}

export default Signin;
