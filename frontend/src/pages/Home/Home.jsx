import React from 'react'
import { Navigate, useNavigate, useNavigation } from 'react-router-dom'
import piggyBank from '../../assets/Images/piggy-bank.png'; 
import './Home.css';


export default function Home(){

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("./login")
    }

    return(
        <div className="container">
            <img src={piggyBank} alt="Piggy Bank" />
        <h1 className="heading">Stoinks Home</h1>
        <h3 className='sub-heading'>Welcome to the Stoinks bank payment portal</h3>
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>

      </div>        
    )
}