import { useNavigate } from 'react-router-dom';
import './EmployeeDashboard.css';
import React, { useEffect } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();

    // Frame-buster: (primary protection should be CSP / X-Frame-Options headers)
    
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


  const handlePendingPayments= () => {
    navigate('/pendingpayments');
  };

    const handlePaymentHistory= () => {
    navigate('/paymenthistory');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <h1 className="heading">Stoinks Employee Dashboard</h1>

      <div>
        <button onClick={handlePendingPayments}>Pending Payments</button>
      </div>

      <div>
        <button onClick={handlePaymentHistory}>Payment History</button>
      </div>

      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
