import React from 'react'
import { useEffect } from "react"
import { useAuth } from '../context/AuthContext'
import { Navigate, useNavigate, useNavigation } from 'react-router-dom'


export default function Dashboard(){

    const navigate = useNavigate();

    const handlePayNow = () => {
        handlePayNow();
        navigate("/payments")
    }

    return(
        <div>
            <h1>Dashboard</h1>
            <div>
                <button onClick={handlePayNow}>Pay Now</button>
                <div>
                    <button>Logout</button>
                </div>
            </div>
        </div>   
        
    )
}