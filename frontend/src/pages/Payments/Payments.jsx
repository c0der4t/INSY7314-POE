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



  useEffect(() => {
    setFormData({
      amount: '',
      currency: 'USD',
      paymentProvider: 'SWIFT',
      destinationAccount: '',
      swiftCode: '',
    });
  }, []);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };


    const handleSubmit = async (e) => {
      e.preventDefault();
      
            
      try {
        
        const validationError = validateClientSide({
      amount: formData.amount,
      destinationAccount: formData.destinationAccount,
      swiftCode: formData.paymentProviderCode,
      currency: formData.currency
    });
    if (validationError) {
      alert(validationError);
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

  
  const handleReset = () => {
    setFormData({
      amount: '',
      currency: 'USD',
      paymentProvider: 'SWIFT',
      destinationAccount: '',
      swiftCode: '',
    });
  };

  //Code Attribution
  //this regex pattern for the amount was taken from atckOverflow
  //https://stackoverflow.com/questions/7689817/javascript-regex-for-amount
  //Matt Ball
  //https://stackoverflow.com/users/139010/matt-ball
  const amountRegex = /^\d+(\.\d{1,2})?$/;
  //Code Attribution
  //This regex pattern for the account number was taken from StackOverflow
  //https://stackoverflow.com/questions/22749891/regex-validate-an-account-number-with-two-different-patterns
  //eddy
  //https://stackoverflow.com/users/530911/eddy
  const accNumRegex = /^([0-9]{11}|[0-9]{2}-[0-9]{3}-[0-9]{6})$/;
  //Code Attribution
  //This regex pattern for the SWIFT code was taken from StackOverflow
  //https://stackoverflow.com/questions/3028150/what-is-proper-regex-expression-for-swift-codes
  //Klesun
  //https://stackoverflow.com/users/2750743/klesun
  const swiftCodeRegex = /[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?/i; //going to check this
  //Code Attribution
  //This regex pattern for the different accepted currencies was taken from stackoverflow
  //https://stackoverflow.com/questions/57663902/regex-with-iso-currency-and-string-match
  //blhsing
  //https://stackoverflow.com/users/6890912/blhsing
  const currencyRegex = /\b(?:USD|GBP|EUR|ZAR)\b/; //only currencies we use

  const validateClientSide = ({ amount, destinationAccount, swiftCode, currency }) => {

    if (!amount || !destinationAccount || !swiftCode || !currency) {
      return 'Please fill in all required fields.';
    }
    if (!amountRegex.test(String(amount).trim())) {
      return 'Invalid amount. Use numbers (up to 2 decimal places).';
    }
    if (!accNumRegex.test(destinationAccount.trim())) {
      return 'Invalid destination account. Use 11 digits or 12-345-123456 format.';
    }
    if (!swiftCodeRegex.test(swiftCode.trim())) {
      return 'Invalid SWIFT code format.';
    }
    if (!currencyRegex.test(currency)) {
      return 'Invalid currency.';
    }
    return null;
  };
  

  return (
    <div className="container">
      <h1 className="heading">Payments Portal</h1>
      <div className="paymentForm">
        <h2>Enter Payment Details</h2>

        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            name="amount"
            type="text"
            placeholder="Enter amount (e.g. 100 or 100.00)"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="currency">Currency:</label>
          <select id="currency" name="currency" value={formData.currency} onChange={handleInputChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="ZAR">ZAR</option>
          </select>

          <label htmlFor="paymentProvider">Payment Provider:</label>
          <select id="paymentProvider" name="paymentProvider" value={formData.paymentProvider} onChange={handleInputChange}>
            <option value="SWIFT">SWIFT</option>
          </select>

          <label htmlFor="destinationAccount">Destination Account:</label>
          <input
            id="destinationAccount"
            name="destinationAccount"
            type="text"
            placeholder="Enter destination account (11 digits)"
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

          <button type="submit" className="paymentFormBtn">Pay Now</button>
          <button type="button" onClick={handleReset} style={{ marginLeft: '8px' }}>Reset</button>
        </form>
      </div>
    </div>
  );
}
