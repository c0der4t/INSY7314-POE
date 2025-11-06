import { useNavigate } from 'react-router-dom';
import styles from './AllEmployees.module.css';
import React, { useEffect, useState } from 'react';
import { getAllEmployees, deleteEmployee } from '../../../../services/apiService';

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
        console.log('API response:', response.data);
        setEmployees(response.data); // should be an array
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (accountNum) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete employee ${accountNum}?`);
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await deleteEmployee(accountNum, token);

      if (response.data.ok) {
        alert(`Employee ${accountNum} deleted successfully`);
        setEmployees((prev) => prev.filter(emp => emp.accountNum !== accountNum));
      }
    } catch (err) {
      if (err.response?.status === 404) {
        alert('Employee not found');
      } else {
        console.error(err);
        alert('Error deleting employee');
      }
    }
  };

  return (
    <div className="container-d">
      <h1 className="heading">All Employees</h1>

      {Array.isArray(employees) && employees.map((employee) => (
        <div key={employee.accountNum} className={styles["employee-item"]}>
          <p><strong>Name:</strong> {employee.username}</p>
          <p><strong>Account Number:</strong> {employee.accountNum}</p>

          <div className="actions">
            <button
              className={styles["deleteBtn"]}
              onClick={() => handleDelete(employee.accountNum)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
