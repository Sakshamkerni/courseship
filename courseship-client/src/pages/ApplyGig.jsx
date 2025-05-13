import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ApplyGig = () => {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', collegeName: '', coverLetter: ''
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  // Prefill from stored profile
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    setForm(f => ({
      ...f,
      name: profile.name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      collegeName: profile.collegeName || ''
    }));
  }, []);

  const onChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onFileChange = e => setResume(e.target.files[0]);

  const onSubmit = async e => {
    e.preventDefault();
    if (!resume) return alert('Please upload your resume');

    const data = new FormData();
    Object.entries(form).forEach(([k,v]) => data.append(k, v));
    data.append('resume', resume);

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post(
        `/api/applications/${gigId}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token
          }
        }
      );
      alert('Application submitted!');
      navigate('/dashboard/applied-gigs');
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Apply for Gig</h2>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        {['name','email','phone','collegeName'].map(field => (
          <div className="mb-3" key={field}>
            <label className="form-label">
              {field.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              className="form-control"
              name={field}
              value={form[field]}
              onChange={onChange}
              required
            />
          </div>
        ))}

        <div className="mb-3">
          <label className="form-label">Resume (PDF/DOC)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="form-control"
            onChange={onFileChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cover Letter</label>
          <textarea
            className="form-control"
            name="coverLetter"
            value={form.coverLetter}
            onChange={onChange}
            rows="4"
          />
        </div>

        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting…' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default ApplyGig;
