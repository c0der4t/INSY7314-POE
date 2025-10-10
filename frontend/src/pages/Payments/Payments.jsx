// based heavily on this: https://github.com/rudderz243/library_api/blob/main/frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import './Payments.css';
import { createPayment as newPaymentApiCall } from '../../../services/apiService'; 
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function Payments() {

  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'USD',
    paymentProvider: 'SWIFT',
    destinationAccount: '',
    paymentProviderCode: '',
  });

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



  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        
        const { amount, destinationAccount, paymentProviderCode } = formData;
        if (!amount || !destinationAccount || !paymentProviderCode) {
          setError('Please fill in all required fields.');
          return;
        }
        
        const res = await newPaymentApiCall({
          paymentProviderCode: formData.paymentProviderCode,
          destinationAccount: formData.destinationAccount,
          paymentProvider: formData.paymentProvider,
          currency: formData.currency,
          amount: formData.amount
        },token);
  
        if (res?.data?.paymentId) {

          alert('✅ Payment successful!\nPayment ID: ' + res.data.paymentId);
          navigate('/dashboard');

        } else {
          alert('Payment failed. Please check your information.');
        }

      } catch (error) {

        console.error('Payment failed:', error.response?.data || error.message);
        alert('Unexpected error occurred. Your session has likely expired.');
        setError('An error occurred. Please try again later.');
        navigate('/login');

      }
    };

  return (
    <div className="container">
      <h1 className="heading">Payments Portal</h1>
      <div className="paymentForm">
        <h2>Enter Payment Details</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
          <br />
          <label htmlFor="currency">Currency:</label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="ZAR">ZAR</option>

          </select>
          <br />
          <label htmlFor="paymentProvider">Payment Provider:</label>
          <select
            id="paymentProvider"
            name="paymentProvider"
            value={formData.paymentProvider}
            onChange={handleInputChange}
          >
            <option value="SWIFT">SWIFT</option>
          </select>
          <br />
          <label htmlFor="destinationAccount">Destination Account:</label>
          <input
            id="destinationAccount"
            name="destinationAccount"
            type="text"
            placeholder="Enter destination account"
            value={formData.destinationAccount}
            onChange={handleInputChange}
            required
          />
          <br />
          <label htmlFor="paymentProviderCode">SWIFT Code:</label>
          <input
            id="paymentProviderCode"
            name="paymentProviderCode"
            type="text"
            placeholder="Enter SWIFT code"
            value={formData.paymentProviderCode}
            onChange={handleInputChange}
            required
          />
          <br />
          <button className='paymentFormBtn' type="submit">Validate</button>
        </form>
      </div>
      <div className="navigateBack">
        <a href="/Dashboard">Cancel</a>
      </div>
    </div>
  );
}