import React from 'react'
import { useEffect } from "react"
import { useAuth } from '../context/AuthContext'
import { Navigate, useNavigate, useNavigation } from 'react-router-dom'


export default function Home(){

    const navigate = useNavigate();

    const handlePayNow = () => {
        navigate("/payments")
    }

    const handleLogout = () => {
        navigate("/login")
    }

    return(
        <div>
            <h1>Dashboard</h1>
            <div>
                <button onClick={handlePayNow}>Pay Now</button>
                <div><br/>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>   
        
    )
}