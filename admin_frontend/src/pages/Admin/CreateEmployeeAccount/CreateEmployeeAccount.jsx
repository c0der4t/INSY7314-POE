import styles from './CreateEmployeeAccount.module.css';
import piggyBank from '../../../assets/Images/piggy-bank.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createEmployee } from '../../../../services/apiService';

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    accountnumber: '',
    password: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Frame-buster
    try {
      if (window.top !== window.self) {
        alert('This page cannot be displayed inside a frame.');
        window.top.location.href = window.location.href;
      }
    } catch {
      alert('This page cannot be displayed inside a frame.');
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const accNumRegex = /^([0-9]{11}|[0-9]{2}-[0-9]{3}-[0-9]{6})$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

  const validateClientSide = ({ username, accountnumber, password, email }) => {
    if (!username || !accountnumber || !password || !email) return 'Please fill in all fields.';
    if (!usernameRegex.test(username.trim())) return 'Invalid username format.';
    if (!accNumRegex.test(accountnumber.trim())) return 'Invalid account number format.';
    if (!passwordRegex.test(password.trim())) return 'Password must be 8+ chars with uppercase, lowercase, number & special char.';
    if (!emailRegex.test(email.trim())) return 'Invalid email format.';
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
      const token = localStorage.getItem('token'); // admin token
      const res = await createEmployee(formData, token);

      if (res.status === 201 || res.status === 200) {
        alert('Employee created successfully!');
        navigate('/dashboard');
      } else {
        alert('Failed to create employee. Please try again.');
      }
    } catch (error) {
      console.error('Error creating employee:', error.response?.data || error.message);
      alert('Failed to create employee. Please check your details or token.');
    }
  };

  return (
    <div className={styles["container-d"]}>
      <h1 className={styles["heading"]}>Stoinks</h1>
      <img src={piggyBank} alt="Piggy Bank" />
      <h2 className="sub-heading">Create Employee Account</h2>

      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="accountnumber">Account Number:</label>
        <input
          type="text"
          name="accountnumber"
          placeholder="Enter account number"
          value={formData.accountnumber}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <button type="submit" className={styles["createBtn"]}>Create Employee</button>
      </form>
    </div>
  );
}
