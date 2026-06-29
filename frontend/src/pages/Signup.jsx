import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  // Form ka data store karne ke liye state
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", role: "customer" });
  const navigate = useNavigate(); // Page change karne ke liye

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Page refresh hone se rokne ke liye
    
    // Backend API par POST request bhejna (Port 5000 check kar lein)
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        role: credentials.role
      }),
    });

    const json = await response.json();
    console.log("Backend Response:", json); // Console mein check karne ke liye

    if (json.token || json.success) {
      alert("Account Successfully Created! 🎉");
      // Token ko LocalStorage mein save kar lo taaki user login rahe
      localStorage.setItem('token', json.token);
      navigate("/"); // Account banne ke baad Home page par bhej do
    } else {
      alert("Signup failed! " + (json.error || "Please try again."));
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
      <h2>Create an Account 📝</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          name="name" 
          placeholder="Enter Name" 
          onChange={onChange} 
          required 
          style={{ padding: '10px' }}
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Enter Email" 
          onChange={onChange} 
          required 
          style={{ padding: '10px' }}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Enter Password" 
          onChange={onChange} 
          required 
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#282c34', color: 'white', cursor: 'pointer' }}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;