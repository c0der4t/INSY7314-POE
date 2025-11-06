import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import React, { useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext.jsx'; 

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

  useEffect(() => {
    //  Frame-buster 
    try {
      if (window.top !== window.self) {
        alert('This page cannot be displayed inside a frame.');
        window.top.location.href = window.location.href;
      }
    } catch {
      alert('This page cannot be displayed inside a frame.');
    }

    //Role-based access check
    if (!user || user.role !== 'ADMIN') {
      alert('Unauthorized access. Redirecting...');
      navigate('/login');
    }
  }, [user, navigate]);



  const handleCreateEmployee= () => {
    navigate('/createemployee');
  };

    const handleAllEmployees= () => {
    navigate('/allemployees');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <h1 className="heading">Stoinks Admin Dashboard</h1>

      <div>
        <button onClick={handleCreateEmployee}>Create Employee</button>
      </div>

      <div>
        <button onClick={handleAllEmployees}>View Employees</button>
      </div>

      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
