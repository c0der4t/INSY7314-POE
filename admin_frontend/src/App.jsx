import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Dashboard from './pages/Employee/EmployeeDashboard/EmployeeDashboard.jsx'
import PendingPayments from './pages/Employee/PendingPayments/PendingPayments.jsx'
import PaymentHistory from './pages/Employee/PaymentHistory/PaymentHistory.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard.jsx'
import CreateEmployeeAccount from './pages/Admin/CreateEmployeeAccount/CreateEmployeeAccount.jsx'
import AllEmployees from './pages/Admin/AllEmployees/AllEmployees.jsx'
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>

        <Route path="/login" element={<Login/>}/>

        <Route path="/employeedashboard" element={
           <ProtectedRoute>
          <Dashboard/>
          </ProtectedRoute>
          }/>

          <Route path="/pendingpayments" element={
           <ProtectedRoute>
          <PendingPayments/>
          </ProtectedRoute>
          }/>

           <Route path="/paymenthistory" element={
           <ProtectedRoute>
          <PaymentHistory/>
          </ProtectedRoute>
          }/>

          <Route path="/admindashboard" element={
           <ProtectedRoute>
          <AdminDashboard/>
          </ProtectedRoute>
          }/>

          <Route path="/createemployee" element={
           <ProtectedRoute>
          <CreateEmployeeAccount/>
          </ProtectedRoute>
          }/>

          <Route path="/allemployees" element={
           <ProtectedRoute>
          <AllEmployees/>
          </ProtectedRoute>
          }/>

      </Routes>
    </Router>
    </AuthProvider>
  )
}


export default App;
// References
// React protected routes in 4 minutes 2024. [Online]. Available at: https://www.youtube.com/watch?v=pyfwQUc5Ssk [Accessed 10 October 2025].
