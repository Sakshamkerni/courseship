// src/pages/dashboard/MyCourses.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(
          'http://localhost:5000/api/enrollments/my-courses',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching enrolled courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading your enrolled courses...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📚 My Enrolled Courses</h2>
      {courses.length === 0 ? (
        <div className="text-muted">You haven't enrolled in any courses yet.</div>
      ) : (
        <div className="row">
          {courses.map((course) => (
            <div className="col-md-4 mb-4" key={course._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">
                    {course.description?.substring(0, 80)}...
                  </p>
                  <Link
                    to={`/courses/${course._id}`}
                    className="btn btn-primary mt-auto"
                  >
                    Go to Course
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
