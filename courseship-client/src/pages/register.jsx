import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    city: '',
    phone: '',
    email: '',
    password: '',
    role: 'student' // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '90vh' }}>
      <div className="card p-4" style={{ maxWidth: '450px', width: '100%' }}>
        <h2 className="text-center mb-4">Register on Courseship</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input type="number" name="age" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input type="text" name="city" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="number" name="phone" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" name="email" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Register As</label>
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="student">Student</option>
              <option value="company">Company</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
        <div className="text-center mt-3">
          <small>Already have an account? <Link to="/login">Login here</Link></small>
        </div>
      </div>
    </div>
  );
};

export default Register;
