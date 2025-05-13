// src/pages/gigs.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GigCard from '../components/company/Gigcard';  // adjust path if needed

const GigsPage = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/gigs')
      .then(res => setGigs(res.data))
      .catch(err => console.error(err));
  }, []);

  // 1. Define the apply handler
  const handleApply = async (gigId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/applications/apply`,
        { gigId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Applied successfully!');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to apply');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Available Gigs</h2>
      <div className="row">
        {gigs.map(gig => (
          // 2. Pass handleApply as the onApply prop
          <GigCard key={gig._id} gig={gig} onApply={handleApply} />
        ))}
      </div>
    </div>
  );
};

export default GigsPage;
