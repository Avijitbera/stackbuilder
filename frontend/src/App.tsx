
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SiteBuilder from './pages/SiteBuilder';
import Login from './pages/Login';
import Signup from './pages/Signup';
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/projects/:projectId" element={<SiteBuilder />} />
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
    </Router>
  )
}

export default App
