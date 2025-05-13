import React, { useState } from 'react';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    age: 22,
    city: 'New Delhi',
    phone: '9876543210',
    email: 'john@example.com'
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Updated:", profile);
    alert('Profile updated successfully! (dummy)');
    // Later: Connect to backend API here
  };

  return (
    <div>
      <h2>👤 Profile Settings</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={profile.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            name="age"
            className="form-control"
            value={profile.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            className="form-control"
            value={profile.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="number"
            name="phone"
            className="form-control"
            value={profile.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email (cannot change)</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={profile.email}
            disabled
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileSettings;
