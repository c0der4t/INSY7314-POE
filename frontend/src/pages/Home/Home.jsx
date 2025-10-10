import React, { useEffect } from 'react';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom'
import piggyBank from '../../assets/Images/piggy-bank.png'; 
import './Home.css';


export default function Home(){

    const navigate = useNavigate();

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