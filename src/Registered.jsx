import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registered = () => {
  const [register, setRegister] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRegister();
  }, []);

  const fetchRegister = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Registers');
      setRegister(response.data);
    } catch (error) {
      setError('Error fetching registered users. Please try again later.');
      console.error('Error fetching users:', error);
    }
  };

  const addRegister = async () => {
  
    if (username.trim() === '' || password.trim() === '') {
      setError('Username and password are required');
      return;
    }


    if (register.some((user) => user.Username === username)) {
      setError('Username already exists');
      return;
    }

 
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
  
      await axios.post('http://localhost:3001/Registers', {
        Username: username,
        Password: password,
      });

      setUsername('');
      setPassword('');
      setError('');
      setSuccess('Registration successful! Redirecting to login...');

    
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Error adding user:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(''); 
    setSuccess('');
    addRegister();
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password && password.length < 6 && (
            <p className="error">Password must be at least 6 characters long</p>
          )}
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate('/login')}>Already have an account? Login</button>
    </div>
  );
};

export default Registered;
