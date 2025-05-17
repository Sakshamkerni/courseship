// src/pages/dashboard/AppliedGigs.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppliedGigs = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          'http://localhost:5000/api/applications/my-applications',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setApplications(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchApps();
  }, []);

  return (
    <div className="container mt-5">
      <h2>My Applications</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Gig Title</th>
            <th>Applicant Name</th>
            <th>College</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Status</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app._id}>
              <td>{app.gig?.title || '—'}</td>
              <td>{app.name}</td>
              <td>{app.collegeName}</td>
              <td>{app.phone}</td>
              <td>{app.email}</td>
              <td>{app.status}</td>
              <td>
                <a
                  href={`http://localhost:5000${app.resumeUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedGigs;
