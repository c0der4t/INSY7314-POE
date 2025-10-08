import React from 'react'
import { useEffect } from "react"
import { useAuth } from '../context/AuthContext'
import { Navigate, useNavigate, useNavigation } from 'react-router-dom'


export default function Home(){

    const navigate = useNavigate();

    const handlePayNow = () => {
        navigate("/payments")
    }

    const handleLogin = () => {
        navigate("./login")
    }

    return(
        <div>
            <h1>Home Page</h1>
                <div><br/>
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        
    )
}