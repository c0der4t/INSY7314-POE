import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  const handlePayNow = () => {
    navigate('/payments');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <h1 className="heading">Dashboard</h1>

      <div>
        <button onClick={handlePayNow}>Pay Now</button>
      </div>

      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
