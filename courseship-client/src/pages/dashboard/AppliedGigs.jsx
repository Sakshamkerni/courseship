// courseship-client/src/pages/dashboard/AppliedGigs.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppliedGigs = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/applications/my-applications', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setApps(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Applications</h2>
      {apps.length === 0
        ? <p>You haven’t applied to any gigs yet.</p>
        : apps.map(({ _id, gigId, status, appliedAt }) => (
            <div className="card mb-3" key={_id}>
              <div className="card-body">
                <h5>{gigId.title}</h5>
                <p>Status: <strong>{status}</strong></p>
                <p>Applied on: {new Date(appliedAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))
      }
    </div>
  );
};

export default AppliedGigs;
