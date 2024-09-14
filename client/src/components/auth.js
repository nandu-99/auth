import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup, login } from './api'; 

function AuthForm({ mode }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const isSignup = mode === 'signup';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    
    try {
      const response = isSignup ? await signup({ name, email, password }) : await login({ email, password });
      toast.success(isSignup ? 'Signup successful!' : 'Login successful!');
      clearForm();

      if (isSignup) {
        navigate('/login');
      } else {
        localStorage.setItem('token', response.token); // Store JWT token
        navigate('/protected');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{isSignup ? 'Signup' : 'Login'}</h2>
      {isSignup && (
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
      )}
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        {isSignup ? 'Signup' : 'Login'}
      </button>
    </form>
  );
}

export default AuthForm;
