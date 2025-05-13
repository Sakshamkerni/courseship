// src/pages/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Spinner, Alert, Table, Button } from 'react-bootstrap';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const location    = useLocation();
  const isUsersPage = location.pathname === '/admin-dashboard/users';

  // Fallback if REACT_APP_API_URL isn’t set
  const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Fetch courses when not on the Users tab
  useEffect(() => {
    if (isUsersPage) {
      setLoading(false);
      return;
    }

    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${API}/api/courses`;
        console.log('Admin: fetching courses from', url);
        const token = localStorage.getItem('token');
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [API, isUsersPage]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      const url = `${API}/api/courses/${id}`;
      console.log('Admin: deleting course via', url);
      const token = localStorage.getItem('token');
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error('Error deleting course:', err);
      alert(err.response?.data?.message || '❌ Delete failed.');
    }
  };

  // Render loading, error, or content
  if (loading && !isUsersPage) {
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
      <h1>Admin Dashboard</h1>

      {/* Sub-nav */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <Link
            className={`nav-link ${!isUsersPage ? 'active' : ''}`}
            to="/admin-dashboard"
          >
            Manage Courses
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${isUsersPage ? 'active' : ''}`}
            to="/admin-dashboard/users"
          >
            Manage Users
          </Link>
        </li>
      </ul>

      {/* Nested Users page */}
      {isUsersPage ? (
        <Outlet />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Manage Courses</h2>
            <Link to="/add-course" className="btn btn-primary">
              Add New Course
            </Link>
          </div>

          {courses.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Level</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, idx) => (
                  <tr key={course._id}>
                    <td>{idx + 1}</td>
                    <td>{course.title}</td>
                    <td>{course.category}</td>
                    <td>{course.level}</td>
                    <td>
                      <Link
                        to={`/edit-course/${course._id}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </Link>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(course._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">No courses found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
