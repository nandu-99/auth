import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AuthForm from './components/auth';
import ProtectedPage from './components/protected';

// Logout Component
function Logout() {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the JWT token
    toast.success('Logged out successfully');
    window.location.href = '/login'; // Redirect to login after logout
  };

  const token = localStorage.getItem('token');

  return token ? (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  ) : null; // Only show logout if the user is logged in (i.e., token exists)
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/signup" className="nav-link">Signup</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/protected" className="nav-link">Protected</Link> {/* Protected route */}
          <Logout /> {/* Logout Button */}
        </nav>
        <div className="form-container">
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/signup" element={<AuthForm mode="signup" />} />
            <Route path="/login" element={<AuthForm mode="login" />} />
            <Route path="/protected" element={<ProtectedPage />} />
          </Routes>
        </div>
      </div>
      <ToastContainer /> 
    </Router>
  );
}



export default App;
