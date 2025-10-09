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
    setFormData({
      username: '',
      idNum: '',
      accNum: '',
      password: ''
    });
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
    const res = await signupApi({
      username: formData.username,
      idNum: formData.idNum,
      accNum: formData.accNum,
      password: formData.password
    });

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
    setFormData({
      username: '',
      idNum: '',
      accNum: '',
      password: ''
    });
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

      <button onClick={() => navigate('/login')} className="loginBtn">
        Login
      </button>
    </div>
  );
}
