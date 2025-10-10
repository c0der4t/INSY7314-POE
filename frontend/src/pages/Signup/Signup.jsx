import './Signup.css';
import piggyBank from '../../assets/Images/piggy-bank.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { registerUser as signupApi } from '../../../services/apiService';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    idNum: '',
    accNum: '',
    password: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({ username: '', idNum: '', accNum: '', password: '' });
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
  //This regex pattern for an id number was taken from StackOverflow
  //https://stackoverflow.com/questions/29383955/how-to-write-a-regex-javascript-for-an-id-validation
  //Ishettyl
  //https://stackoverflow.com/users/572827/lshettyl
  const idNumRegex = /^\d{6}-?\d{7}$/;
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
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  const validateClientSide = ({ username, idNum, accNum, password }) => {
    if (!username || !idNum || !accNum || !password) return 'Please fill in all fields.';
    if (!usernameRegex.test(username.trim())) return 'Invalid username format.';
    if (!idNumRegex.test(idNum.trim())) return 'Invalid ID number format.';
    if (!accNumRegex.test(accNum.trim())) return 'Invalid account number format.';
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
      const res = await signupApi(formData);
      if (res?.data?.token) {
        localStorage.setItem('token', res.data.token);
        alert('Signup successful!');
        navigate('/dashboard');
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      alert('Signup failed. Please check your details.');
    }
  };

  const handleReset = () => {
    setFormData({ username: '', idNum: '', accNum: '', password: '' });
  };

  return (
    <div className="container">
      <h1 className="heading">Stoinks</h1>
      <img src={piggyBank} alt="Piggy Bank" />
      <h2 className="sub-heading">Signup</h2>

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

        <label htmlFor="idNum">ID Number:</label>
        <input
          type="text"
          id="idNum"
          name="idNum"
          placeholder="Enter your ID number"
          value={formData.idNum}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="accNum">Account Number:</label>
        <input
          type="text"
          id="accNum"
          name="accNum"
          placeholder="Enter your account number"
          value={formData.accNum}
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

        <button type="submit" className="signupBtn">Signup</button>
      </form>

      <button onClick={() => navigate('/login')} className="loginBtn">Login</button>
    </div>
  );
}
