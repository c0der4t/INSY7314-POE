import './Signup.css';
import piggyBank from '../../assets/Images/piggy-bank.png'; 
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div className="container">

      <h1 className="heading">Stoinks</h1>
      
            <img src={piggyBank} alt="Piggy Bank" />
      
      <h2 className="sub-heading">Signup</h2>


      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Enter your username"
      />

      <label htmlFor="idNumber">ID Number:</label>
      <input
        type="text"
        id="idNumber"
        name="idNumber"
        placeholder="Enter your ID number"
      />

      <label htmlFor="accountNumber">Account Number:</label>
      <input
        type="text"
        id="accountNumber"
        name="accountNumber"
        placeholder="Enter your account number"
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
      />

      <button>Signup</button>

      <button>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
            Login
        </Link>
        </button>


      
    </div>
  );
}
