import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '15px', backgroundColor: '#282c34', color: 'white' }}>
      <h2>ShopLogo</h2>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart 🛒</Link>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Signup</Link>
      </div>
    </nav>
  )
}

export default Navbar