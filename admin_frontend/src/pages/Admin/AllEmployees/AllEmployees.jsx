import { useNavigate } from 'react-router-dom';
import styles from './AllEmployees.module.css';
import React, { useEffect, useState } from 'react';
import { getAllEmployees } from '../services/apiService';

export default function Dashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Frame-buster
    try {
      if (window.top !== window.self) {
        alert('This page cannot be displayed inside a frame.');
        window.top.location.href = window.location.href;
      }
    } catch (err) {
      alert('This page cannot be displayed inside a frame.');
    }

    // Fetch employees
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getAllEmployees(token);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

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
