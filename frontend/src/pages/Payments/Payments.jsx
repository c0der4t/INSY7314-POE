import './Payments.css';
import React, { useState, useEffect } from 'react';
import { createPayment as paymentApi } from '../../../services/apiService'; // adjust path if needed
import { useNavigate } from 'react-router-dom';

export default function Payments() {
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'USD',
    paymentProvider: 'SWIFT',
    destinationAccount: '',
    swiftCode: '',
  });

  const navigate = useNavigate();

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

  const handleReset = () => {
    setFormData({
      amount: '',
      currency: 'USD',
      paymentProvider: 'SWIFT',
      destinationAccount: '',
      swiftCode: '',
    });
  };

  const amountRegex = /^\d+(\.\d{1,2})?$/;
  const accNumRegex = /^([0-9]{11}|[0-9]{2}-[0-9]{3}-[0-9]{6})$/;
  const swiftCodeRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/i;
  const currencyRegex = /\b(?:USD|AUD|BRL|GBP|CAD|CNY|DKK|AED|EUR|HKD|INR|MYR|MXN|NZD|PHP|SGD|THB|ARS|COP|CLP|PEN|VEF|ZAR)\b/;

  const validateClientSide = ({ amount, destinationAccount, swiftCode, currency }) => {
    if (!amount || !destinationAccount || !swiftCode) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateClientSide({
      amount: formData.amount,
      destinationAccount: formData.destinationAccount,
      swiftCode: formData.swiftCode,
      currency: formData.currency
    });
    if (validationError) {
      alert(validationError);
      return;
    }

    const payload = {
      amount: formData.amount,
      currency: formData.currency,
      provider: formData.paymentProvider,
      accNum: formData.destinationAccount,
      swiftCode: formData.swiftCode
    };

    try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      let res;
      try {
        res = await paymentApi(payload, config);
      } catch (err) {
        if (err?.message?.includes('config') || err?.response?.status === 400 || err?.response?.status === 401) {
          res = await paymentApi(payload);
        } else {
          throw err;
        }
      }

      if (res?.data) {
        alert('Payment submitted successfully (pending verification).');
        handleReset();
        //nav back to dash on success
         navigate('/dashboard');
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Payment failed. Please check your details or try again.';
      alert(msg);
    }
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
          

          <label htmlFor="swiftCode">SWIFT Code:</label>
          <input
            id="swiftCode"
            name="swiftCode"
            type="text"
            placeholder="Enter SWIFT code (e.g. ABSAZAJJ)"
            value={formData.swiftCode}
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
