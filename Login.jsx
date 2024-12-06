import React, { useState, useEffect } from 'react';
import './index.css'; // Ensure your styles are applied
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Register, setRegister] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRegister();
  }, []);

  const fetchRegister = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Registers');
      console.log("Fetched Users:", response.data); // Log the fetched data
      setRegister(response.data);
    } catch (error) {
      setError('Error fetching registered users. Please try again later.');
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(''); // Reset error before validation

    console.log("Attempting to log in with:", Username, Password);

    // Check if the user exists with the provided credentials
    const user = Register.find(user => 
      user.Username === Username && String(user.Password) === String(Password)
    );

    if (user) {
      alert("We're logging in now ...");
      onLogin();
      window.location.href = '/'; // Redirect to home
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='bg-img'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          {error && <p className="error">{error}</p>}
          <div className="input-box">
            <input
              type="text"
              placeholder='Username'
              value={Username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className='input-box'>
            <input
              type="password"
              placeholder='Password'
              value={Password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className='forgot'>Forgot password?</a>
          </div>
          <button type='submit' className='log'>Login</button>
        </form>
        <button className='reg' onClick={() => window.location.href = '/Registered'}>
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
};

export default Login;
