import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Payments from './pages/Payments.jsx'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/payments" element={<Payments/>}/>
      </Routes>
    </Router>
  )
}


export default App;
