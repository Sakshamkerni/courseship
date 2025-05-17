// src/pages/gigs.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GigCard from '../components/company/Gigcard';

const GigsPage = () => {
  const [gigs, setGigs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/gigs')
      .then(res => setGigs(res.data))
      .catch(err => console.error(err));
  }, []);

  // Navigate to the ApplyGig form instead of POST’ing directly
  const handleApply = (gigId) => {
    navigate(`/apply-gig/${gigId}`);
  };

  return (
    <div className="container mt-4">
      <h2>Available Gigs</h2>
      <div className="row">
        {gigs.map(gig => (
          <GigCard
            key={gig._id}
            gig={gig}
            onApply={handleApply}
          />
        ))}
      </div>
    </div>
  );
};

export default GigsPage;
