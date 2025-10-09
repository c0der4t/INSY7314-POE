// based heavily on this: https://github.com/rudderz243/library_api/blob/main/frontend/src/pages/Dashboard.jsx

import React, { useState } from 'react';
import './Payments.css';

export default function Payments() {
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'USD',
    paymentProvider: 'SWIFT',
    destinationAccount: '',
    swiftCode: '',
  });


  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, destinationAccount, swiftCode } = formData;
    if (!amount || !destinationAccount || !swiftCode) {
      setError('Please fill in all required fields.');
    } else {
      setError('');
      alert(`Payment of ${formData.amount} ${formData.currency} validated using ${formData.paymentProvider}!`);
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
            <option value="GBP">ZAR</option>
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
          <label htmlFor="swiftCode">SWIFT Code:</label>
          <input
            id="swiftCode"
            name="swiftCode"
            type="text"
            placeholder="Enter SWIFT code"
            value={formData.swiftCode}
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