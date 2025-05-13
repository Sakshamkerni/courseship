// src/pages/dashboard/MyGigs.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const MyGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyGigs = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return navigate('/login');
      }
      try {
        const res = await axios.get(
          'http://localhost:5000/api/gigs/my-gigs',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setGigs(res.data);
      } catch (err) {
        console.error('Error fetching company gigs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyGigs();
  }, [navigate]);

  if (loading) {
    return <div className="text-center mt-4">Loading your gigs...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🚀 My Posted Gigs</h2>
        <Link to="/post-gig" className="btn btn-primary">+ New Gig</Link>
      </div>

      {gigs.length === 0 ? (
        <p className="text-muted">You haven’t posted any gigs yet.</p>
      ) : (
        <div className="row">
          {gigs.map(gig => (
            <div className="col-md-6 mb-4" key={gig._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{gig.title}</h5>
                  <p className="card-text flex-grow-1">
                    {gig.description.length > 120
                      ? gig.description.substring(0, 120) + '…'
                      : gig.description}
                  </p>
                  <div className="mb-2">
                    {gig.skillsRequired.map((skill, i) => (
                      <span key={i} className="badge bg-info text-dark me-1">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="mb-3"><strong>Stipend:</strong> {gig.stipend || 'N/A'}</p>
                  <div className="mt-auto">
                    <Link
                      to={`/edit-gig/${gig._id}`}
                      className="btn btn-outline-secondary btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={async () => {
                        if (!window.confirm('Delete this gig?')) return;
                        try {
                          await axios.delete(
                            `http://localhost:5000/api/gigs/${gig._id}`,
                            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                          );
                          setGigs(prev => prev.filter(g => g._id !== gig._id));
                        } catch (err) {
                          console.error('Error deleting gig:', err);
                          alert('Failed to delete');
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="card-footer text-muted">
                  Posted on: {new Date(gig.postedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyGigs;
