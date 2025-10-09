import './Signup.css';
import piggyBank from '../../assets/Images/piggy-bank.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signupApi } from '../../Methods/Signup';

export default function Signup() {
  const [userName, setUserName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  
  async function mySignup() {
    const result = await signupApi({ userName, idNumber, accountNumber, password });
    if (result.success) {
      navigate('/dashboard'); 
    } else {
      alert(result.message || 'Signup failed');
    }
  }

  return (
    <div className="container">
      <h1 className="heading">Stoinks</h1>
      <img src={piggyBank} alt="Piggy Bank" />
      <h2 className="sub-heading">Signup</h2>

      <label>Username:</label>
      <input type="text" onChange={e => setUserName(e.target.value)} placeholder="Enter your username" />

      <label>ID Number:</label>
      <input type="text" onChange={e => setIdNumber(e.target.value)} placeholder="Enter your ID number" />

      <label>Account Number:</label>
      <input type="text" onChange={e => setAccountNumber(e.target.value)} placeholder="Enter your account number" />

      <label>Password:</label>
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />

      <button onClick={mySignup} className="signupBtn">Signup</button>



      <Link to="/login">
        <button className="loginBtn">Login</button>
      </Link>
    </div>
  );
}
