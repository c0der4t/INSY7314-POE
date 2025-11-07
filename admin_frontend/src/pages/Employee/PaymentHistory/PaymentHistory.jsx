import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PaymentHistory.module.css';
import { getAllPayments } from '../../../../services/apiService';

export default function Dashboard() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Frame-buster
  useEffect(() => {
    try {
      if (window.top !== window.self) {
        alert('This page cannot be displayed inside a frame.');
        window.top.location.href = window.location.href;
      }
    } catch (err) {
      alert('This page cannot be displayed inside a frame.');
    }
  }, []);

  // Fetch payments from API
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await getAllPayments(token);
        setPayments(response.data); 
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError('Failed to load payments.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="container-d">
        <h2>Loading payments...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-d">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="container-d">
      <h1 className="heading">Reviewed Payments</h1>

      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        payments.map((payment) => {
          const statusClass = 
            payment.status === 'APPROVED' ? styles.approved :
            payment.status === 'DENIED' ? styles.denied :
            styles.pending;

          return (
            <div
              key={payment.transactionHash || payment._id}
              className={`${styles['payment-item']} ${statusClass}`}
            >
              <p><strong>Provider:</strong> {payment.paymentProvider}</p>
              <p><strong>Code:</strong> {payment.paymentProviderCode}</p>
              <p><strong>Destination:</strong> {payment.destinationAccount}</p>
              <p><strong>Amount:</strong> {payment.amount} {payment.currency}</p>
              <p><strong>Status:</strong> {payment.status}</p>
              <p><strong>Created At:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
            </div>
          );
        })
      )}
    </div>
  );
}
