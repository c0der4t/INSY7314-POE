import './Login.css';
import piggyBank from '../../assets/Images/piggy-bank.png'; 
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginApi } from '../../Methods/Login';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function myLogin() {
    const result = await loginApi({ userName, accountNumber, password });
    if (result.success) {
      navigate('/dashboard');
    } else {
      alert(result.message || 'Login failed');
    }
  }

  return (
    <div className="container">
      <h1 className="heading">Stoinks</h1>
      <img src={piggyBank} alt="Piggy Bank" />
      <h2 className="sub-heading">Login</h2>

      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Enter your username"
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />

      <label htmlFor="accountNumber">Account Number:</label>
      <input
        type="text"
        id="accountNumber"
        name="accountNumber"
        placeholder="Enter your account number"
        value={accountNumber}
        onChange={e => setAccountNumber(e.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button className="loginBtn" onClick={myLogin}>Login</button>

      <Link to="/signup">
        <button className="signupBtn">Signup</button>
      </Link>
    </div>
  );
}