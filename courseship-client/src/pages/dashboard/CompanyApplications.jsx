import React, { useEffect, useState } from 'react';
import axios from 'axios';

const STATUS_BADGE = {
  pending: 'secondary',
  accepted: 'success',
  rejected: 'danger',
};

const API_BASE = 'http://localhost:5000/api';

const CompanyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.get(
        `${API_BASE}/applications/company`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(data);
    } catch (err) {
      console.error(
        'Error fetching applications:',
        err.response?.data || err.message
      );
    }
  };

  const updateStatus = async (appId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const { data: updated } = await axios.patch(
        `${API_BASE}/applications/${appId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(apps =>
        apps.map(a => (a._id === updated._id ? updated : a))
      );
    } catch (err) {
      console.error(
        'Error updating status:',
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className="container mt-4">
      <h2>Incoming Applications</h2>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div className="row g-3">
          {applications.map(app => (
            <div key={app._id} className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title">{app.gigId?.title}</h5>
                    <span
                      className={`badge bg-${
                        STATUS_BADGE[app.status] || 'secondary'
                      }`}
                    >
                      {app.status.charAt(0).toUpperCase() +
                        app.status.slice(1)}
                    </span>
                  </div>

                  <p className="mb-1">
                    <strong>Applicant:</strong> {app.studentId?.name} (
                    {app.studentId?.email})
                  </p>
                  <p className="mb-1">
                    <strong>City:</strong> {app.studentId?.city}
                  </p>
                  {app.coverLetter && (
                    <p className="mb-2">
                      <strong>Cover Letter:</strong>
                      <br />
                      <em>{app.coverLetter}</em>
                    </p>
                  )}
                  <p className="mb-3 text-muted">
                    Applied at {new Date(app.createdAt).toLocaleString()}
                  </p>

                  {app.status === 'pending' && (
                    <div>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => updateStatus(app._id, 'accepted')}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => updateStatus(app._id, 'rejected')}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyApplications;
