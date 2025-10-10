import './Login.css';
import piggyBank from '../../assets/Images/piggy-bank.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loginUser as loginApi } from '../../../services/apiService'; // updated import
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    accountNumber: '',
    password: ''
  });

  const navigate = useNavigate();
  const { login } = useAuth();

    useEffect(() => {
      try {

        //alert('Frame-buster check running!');
        
        if (window.top !== window.self) {
          alert('This page cannot be displayed inside a frame.');
          window.top.location.href = window.location.href;
        }
      } catch (err) {
        alert('This page cannot be displayed inside a frame.');
      }
    }, []);


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // send payload matching loginUser service
      const res = await loginApi({
        username: formData.username,
        accountNumber: formData.accountNumber,
        password: formData.password
      });

      if (res?.data?.token) {
        // store token in context or localStorage
        login(res.data);
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Stoinks</h1>
      <img src={piggyBank} alt="Piggy Bank" />
      <h2 className="sub-heading">Login</h2>

      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="accountNumber">Account Number:</label>
        <input
          type="text"
          id="accountNumber"
          name="accountNumber"
          placeholder="Enter your account number"
          value={formData.accountNumber}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <button type="submit" className="loginBtn">Login</button>
      </form>

      <Link to="/signup">
        <button className="signupBtn">Signup</button>
      </Link>
    </div>
  );
}
