import { useNavigate } from 'react-router-dom';
import styles from './AllEmployees.module.css';
import React, { useEffect } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();

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

  // Dummy employees list
  const employees = [
    { userName: 'PP001', accountNumber: '123-456-789' },
    { userName: 'PP002', accountNumber: '234-567-890' },
    { userName: 'PP003', accountNumber: '345-678-901' },
    { userName: 'PP004', accountNumber: '456-789-012' },
    { userName: 'PP005', accountNumber: '567-890-123' },
  ];

  const handleDelete = (accountNumber) => {
    alert(`Employee ${accountNumber} deleted`);
  };

  return (
    <div className="container-d">
      <h1 className="heading">All Employees</h1>

      {employees.map((employee) => (
        <div key={employee.accountNumber} className={styles["employee-item"]}>
          <p><strong>Name:</strong> {employee.userName}</p>
          <p><strong>Account Number:</strong> {employee.accountNumber}</p>

          <div className="actions">
            <button
              className={styles["deleteBtn"]}
              onClick={() => handleDelete(employee.accountNumber)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
