// src/pages/AdminUsers.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Alert, Table, Button } from 'react-bootstrap';

const AdminUsers = () => {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // Fallback if REACT_APP_API_URL isn’t set
  const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `${API}/api/admin/users`;
      console.log('Fetching users from:', url);
      const token = localStorage.getItem('token');
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const url = `${API}/api/admin/users/${id}`;
      console.log('Deleting user via:', url);
      const token = localStorage.getItem('token');
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
      alert(err.response?.data?.message || '❌ Delete failed.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // run once on mount

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-5 text-center">
        {error}
      </Alert>
    );
  }

  return (
    <div className="container mt-4">
      <h2>All Users</h2>
      {users.length > 0 ? (
        <Table bordered striped hover responsive className="mt-3">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.city || '—'}</td>
                <td>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="mt-3 text-center">No users found.</p>
      )}
    </div>
  );
};

export default AdminUsers;
