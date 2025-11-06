import { useNavigate } from 'react-router-dom';
import styles from './PendingPayments.module.css';
import React, { useEffect, useState } from 'react';
import { getPendingPayments, decidePayment as apiDecidePayment } from '../../../../services/apiService';

export default function PendingPayments() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Fetch pending payments
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await getPendingPayments(token);
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

  // Handle payment decision
  const handleDecision = async (id, decision) => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiDecidePayment(id, decision, token);

    // Remove the approved/denied payment from the UI
    setPayments((prev) => prev.filter((p) => p._id !== id));

    alert(`Payment ${decision.toLowerCase()}`);
  } catch (error) {
    console.error(`Error ${decision.toLowerCase()} payment:`, error);
    alert(`Failed to ${decision.toLowerCase()} payment.`);
  }
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
                onClick={() => handleDecision(payment._id, 'APPROVED')}
              >
                Approve
              </button>
              <button
                className={styles["rejectBtn"]}
                onClick={() => handleDecision(payment._id, 'DENIED')}
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
