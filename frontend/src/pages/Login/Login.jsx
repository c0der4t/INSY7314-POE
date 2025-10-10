import './Login.css';
import piggyBank from '../../assets/Images/piggy-bank.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loginUser as loginApi } from '../../../services/apiService';
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
    setFormData({ username: '', accountNumber: '', password: '' });
  }, []);
  
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
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Code Attribution
  //This regex pattern for the username was taken from StackOverflow
  //https://stackoverflow.com/questions/9628879/javascript-regex-username-validation
  //Jason McCreary
  //https://stackoverflow.com/users/164998/jason-mccreary
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  //Code Attribution
  //This regex pattern for the account number was taken from StackOverflow
  //https://stackoverflow.com/questions/22749891/regex-validate-an-account-number-with-two-different-patterns
  //eddy
  //https://stackoverflow.com/users/530911/eddy
  const accNumRegex = /^([0-9]{11}|[0-9]{2}-[0-9]{3}-[0-9]{6})$/;
  //Code attribution
   //This Regex pattern for the password was taken from StackOverflow
   //https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
   //Wiktor Stribizew
   //https://stackoverflow.com/users/3832970/wiktor-stribi%c5%bcew
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateClientSide = ({ username, accountNumber, password }) => {
    if (!username || !accountNumber || !password) return 'Please fill in all fields.';
    if (!usernameRegex.test(username.trim())) return 'Invalid username format.';
    if (!accNumRegex.test(accountNumber.trim())) return 'Invalid account number format.';
    if (!passwordRegex.test(password.trim())) return 'Password must be 8+ chars with uppercase, lowercase, number & special char.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateClientSide(formData);
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      const res = await loginApi(formData);
      if (res?.data?.token) {
        login(res.data);
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
