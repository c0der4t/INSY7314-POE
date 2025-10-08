import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />       
        <Route path="/login" element={<Login />} />  
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;