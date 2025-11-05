import { useNavigate } from 'react-router-dom';
import styles from './PendingPayments.module.css';
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

     // Dummy payments list
 const payments = [
    {
      paymentProviderCode: 'PP001',
      destinationAccount: '123-456-789',
      paymentProvider: 'PayFast',
      currency: 'ZAR',
      amount: 500,
      transactionHash: 'tx123abc',
      createdAt: '2025-11-04T09:00:00Z',
    },
    {
      paymentProviderCode: 'PP002',
      destinationAccount: '987-654-321',
      paymentProvider: 'Flutterwave',
      currency: 'USD',
      amount: 120,
      transactionHash: 'tx456def',
      createdAt: '2025-11-03T14:30:00Z',
    },
    {
      paymentProviderCode: 'PP003',
      destinationAccount: '555-666-777',
      paymentProvider: 'Stripe',
      currency: 'EUR',
      amount: 250,
      transactionHash: 'lhjiohio',
      createdAt: '2025-11-02T08:15:00Z',
    },
    {
      paymentProviderCode: 'PP003',
      destinationAccount: '555-666-777',
      paymentProvider: 'Stripe',
      currency: 'EUR',
      amount: 250,
      transactionHash: 'qwerqwer',
      createdAt: '2025-11-02T08:15:00Z',
    },
    {
      paymentProviderCode: 'PP003',
      destinationAccount: '555-666-777',
      paymentProvider: 'Stripe',
      currency: 'EUR',
      amount: 250,
      transactionHash: 'sdfgsdfg',
      createdAt: '2025-11-02T08:15:00Z',
    }
  ];

    const handleApprove = (transactionHash) => {
    alert(`Payment ${transactionHash} approved`);

  };

  const handleReject = (transactionHash) => {
    alert(`Payment ${transactionHash} rejected`);
  };


  return (
    <div className="container-d">
      <h1 className="heading">Payments Awaiting Review</h1>

      {payments.map((payment) => (
        <div key={payment.transactionHash} className={styles["payment-item"]} >
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
      ))}
    </div>
  );
}
