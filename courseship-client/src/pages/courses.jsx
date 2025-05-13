// src/pages/courses.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';

const Courses = () => {
  const [courses, setCourses]       = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const navigate                    = useNavigate();
  const token                       = localStorage.getItem('token');

  // Fallback if REACT_APP_API_URL is undefined
  const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const url = `${API}/api/courses`;
        console.log('Fetching courses from:', url);
        const res = await axios.get(url);
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses.');
      } finally {
        setLoading(false);
      }
    };

    const fetchEnrolled = async () => {
      if (!token) return;
      try {
        const url = `${API}/api/enrollments/my-courses`;
        console.log('Fetching enrolled courses from:', url);
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEnrolledIds(res.data.map(c => c._id));
      } catch (err) {
        console.error('Error fetching enrolled courses:', err);
        // don't treat as fatal
      }
    };

    fetchCourses();
    fetchEnrolled();
  }, [API, token]);

  const handleEnroll = async (courseId) => {
    if (!token) return navigate('/login');
    try {
      await axios.post(
        `${API}/api/enrollments`,
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEnrolledIds(prev => [...prev, courseId]);
      alert('🎉 Enrolled successfully!');
    } catch (err) {
      console.error('Enrollment error:', err);
      alert(err.response?.data?.message || '❌ Enrollment failed.');
    }
  };

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
    <div className="container mt-5">
      <h2 className="mb-4 text-center fw-bold">📚 Available Nano Courses</h2>
      <div className="row">
        {courses.length > 0 ? (
          courses.map(course => {
            const isEnrolled = enrolledIds.includes(course._id);
            const topicCount = course.topics?.length || 0;
            const imgSrc = course.imageUrl
              ? `${API}${course.imageUrl}`
              : '/default-course-image.jpg';

            return (
              <div className="col-md-4 mb-4" key={course._id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={imgSrc}
                    alt={course.title}
                    className="card-img-top"
                    style={{ height: '180px', objectFit: 'cover' }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5
                      className="card-title fw-bold text-primary"
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/courses/${course._id}`)}
                    >
                      {course.title}
                    </h5>

                    <p className="card-text text-muted">
                      {course.description.length > 100
                        ? course.description.slice(0, 100) + '…'
                        : course.description}
                    </p>

                    <div className="mb-2 d-flex flex-wrap gap-1">
                      <span className="badge bg-primary">{course.category}</span>
                      <span className="badge bg-secondary">{course.level}</span>
                      <span className="badge bg-info text-dark">
                        {topicCount} {topicCount === 1 ? 'Topic' : 'Topics'}
                      </span>
                    </div>

                    <div className="mt-auto">
                      <button
                        className={
                          isEnrolled
                            ? 'btn btn-success w-100'
                            : 'btn btn-outline-success w-100'
                        }
                        onClick={() => !isEnrolled && handleEnroll(course._id)}
                        disabled={isEnrolled}
                      >
                        {isEnrolled ? '✅ Already Enrolled' : '✅ Enroll Now'}
                      </button>
                    </div>
                  </div>

                  <div className="card-footer text-muted text-center">
                    ⏱️ Duration: {course.duration}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
