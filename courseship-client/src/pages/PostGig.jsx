import React, { useState } from 'react';
import axios from 'axios';

const PostGig = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    skillsRequired: '',
    stipend: '',
  });

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      skillsRequired: form.skillsRequired.split(',').map(s => s.trim()),
    };

    try {
      await axios.post('http://localhost:5000/api/gigs', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('🎉 Gig posted successfully!');
      setForm({ title: '', description: '', skillsRequired: '', stipend: '' });
    } catch (err) {
      console.error('Error posting gig:', err);
      alert(err.response?.data?.error || 'Failed to post gig.');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 fw-bold">🚀 Post a New Gig</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={form.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Skills Required (comma-separated)</label>
          <input type="text" className="form-control" name="skillsRequired" value={form.skillsRequired} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Stipend</label>
          <input type="text" className="form-control" name="stipend" value={form.stipend} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Post Gig</button>
      </form>
    </div>
  );
};

export default PostGig;
