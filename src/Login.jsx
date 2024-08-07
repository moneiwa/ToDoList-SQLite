
import React, { useState } from 'react';
import './index.css';
import axios from 'axios';


const Login = ({ onLogin }) => {
const [Username, setUsername] = useState("");
const [Password, setPassword] = useState("");
const [Register,setRegister]=useState([]);

const handleSubmit = (event) => {
event.preventDefault();
fetchRegister();



// Register.length
for (let index = 0; index < Register.length; index++) {
    // const element = array[index];

  
    if (Username == Register[index].Username && Password == Register[index].Password) { 
        alert("We're logging in now ...");
        onLogin();
        window.location.href = '/'; //go to home
       
        }
            
}
};



const fetchRegister= async () => {
    try {
    const response = await axios.get('http://localhost:3001/Registers');
    setRegister(response.data);
    } catch (error) {
    console.error('Error fetching users:', error);
    }
    };


return ( 
<div className='bg-img '>
<div className='wrapper'>

<form onSubmit={handleSubmit}>
<h1>Login</h1>
<div className="input-box">


<input type="text" placeholder='Username' onChange={e => setUsername(e.target.value)} /></div>

<div className='input-box'>
<input type="Password" placeholder='Password' onChange={e => setPassword(e.target.value)} /></div>

<div className="remember-forgot">

<label>
<input type="checkbox"  /> Remember me
</label>

<a href="#" className='forgot'>Forgot password?</a>
</div>

<button type='submit' className='log'>Login</button>
</form>
<button className='reg' onClick={() => window.location.href = '/Registered'}>Don't have an account? Register</button>
</div>
</div>
);
};

export default Login;