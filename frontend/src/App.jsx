import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Payments from './pages/Payments/Payments.jsx'
import Login from './pages/Login/Login.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Signup from './pages/Signup/Signup.jsx'
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="/payments" element={
          <ProtectedRoute>
            <Payments/>
          </ProtectedRoute>
          }/>

        <Route path="/login" element={<Login/>}/>

        <Route path="/dashboard" element={
           <ProtectedRoute>
          <Dashboard/>
          </ProtectedRoute>
          }/>

        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
    </AuthProvider>
  )
}


export default App;
// References
// React protected routes in 4 minutes 2024. [Online]. Available at: https://www.youtube.com/watch?v=pyfwQUc5Ssk [Accessed 10 October 2025].
