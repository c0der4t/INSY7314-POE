import { useNavigate } from 'react-router-dom';
import styles from './PendingPayments.module.css';
import React, { useEffect, useState } from 'react';
import { getPendingPayments } from '../../../../services/apiService';

export default function PendingPayments() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Frame-buster
  useEffect(() => {

     // Frame-buster: (primary protection should be CSP / X-Frame-Options headers)
    try {
      if (window.top !== window.self) {
        alert('This page cannot be displayed inside a frame.');
        window.top.location.href = window.location.href;
      }
    } catch (err) {
      alert('This page cannot be displayed inside a frame.');
    }
  }, []);

  // Fetch pending payments from API
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getPendingPayments();
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching pending payments:', error);
        alert('Failed to load pending payments.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleApprove = (transactionHash) => {
    alert(`Payment ${transactionHash} approved`);
  };

  const handleReject = (transactionHash) => {
    alert(`Payment ${transactionHash} rejected`);
  };

  if (loading) return <p>Loading pending payments...</p>;

  return (
    <div className="container-d">
      <h1 className="heading">Payments Awaiting Review</h1>

      {payments.length === 0 ? (
        <p>No pending payments found.</p>
      ) : (
        payments.map((payment) => (
          <div key={payment.transactionHash} className={styles["payment-item"]}>
            <p><strong>Provider:</strong> {payment.paymentProvider}</p>
            <p><strong>Code:</strong> {payment.paymentProviderCode}</p>
            <p><strong>Destination:</strong> {payment.destinationAccount}</p>
            <p><strong>Amount:</strong> {payment.amount} {payment.currency}</p>
            <p><strong>Created At:</strong> {new Date(payment.createdAt).toLocaleString()}</p>

            <div className="payment-actions">
              <button
                className={styles["acceptBtn"]}
                onClick={() => handleApprove(payment.transactionHash)}
              >
                Approve
              </button>
              <button
                className={styles["rejectBtn"]}
                onClick={() => handleReject(payment.transactionHash)}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

