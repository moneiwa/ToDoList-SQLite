import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registered = () => {
  const [register, setRegister] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchRegister();
  }, []);

  const fetchRegister = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Registers');
      setRegister(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addRegister = async () => {
    if (username.trim() === '' || password.trim() === '') {
      alert('Username and password are required');
      return;
    }

    try {
      await axios.post('http://localhost:3001/Registers', { Username: username, Password: password });
      setUsername('');
      setPassword('');
      fetchRegister();
      alert("Registration successful!");
      navigate('/login'); // to the login page
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addRegister();
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className='input-box'>
          <input
            type="password"
            placeholder='Password'
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="remember-forgot">
          <label><input type="checkbox" /> Remember me</label>
        </div>
        <button type='submit'>Register</button>
      </form>
      <button onClick={() => navigate('/login')}>Already have an account? Login</button>
    </div>
  );
};

export default Registered;
