import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProtectedPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Unauthorized! Please log in.');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Protected Page</h1>
      <p>This is a protected route, only accessible with a valid JWT token.</p>
    </div>
  );
}

export default ProtectedPage;
