import './Login.css';
import piggyBank from '../../assets/Images/piggy-bank.png'; 
import { Link } from 'react-router-dom';


export default function Login() {
  return (
    <div className="container">

      <h1 className="heading">Stoinks</h1>

      <img src={piggyBank} alt="Piggy Bank" />

      <h2 className="sub-heading">Login</h2>


      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Enter your username"
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
      />

      <button>Login</button>

      <button>
      <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>
        Signup
      </Link>
    </button>
    
    </div>
  );
}
