import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MyCourses.css';

const MyCourses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      const token = localStorage.getItem('token');
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/enrollments/my-courses',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Normalize for safety
        const normalized = data.map(item => {
          return {
            course: item.course || item, // fallback if not nested
            progress: item.progress || 0,
            xp: item.xp || 0
          };
        });

        setEnrollments(normalized);
      } catch (err) {
        console.error('Error fetching enrolled courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status" />
        <p className="mt-2">Loading your enrolled courses...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📚 My Enrolled Courses</h2>

      {enrollments.length === 0 ? (
        <p className="text-muted">You haven't enrolled in any courses yet.</p>
      ) : (
        <div className="row">
          {enrollments.map(({ course, progress, xp }) => (
            <div className="col-md-4 mb-4" key={course._id}>
              <div className="card h-100 shadow-sm course-card">
                {course.imageUrl ? (
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="card-img-top course-img"
                  />
                ) : (
                  <div className="card-img-top no-image-placeholder">
                    No Image
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="course-title">{course.title}</h5>

                  <p className="course-desc mb-3">
                    {course.description?.slice(0, 100)}...
                  </p>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <small className="text-muted">{progress}% Complete</small>
                      <small className="text-muted">XP: {xp}</small>
                    </div>
                    <div className="progress progress-sm">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${progress}%` }}
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>

                  <Link
                    to={`/courses/${course._id}`}
                    className="btn btn-primary mt-auto"
                  >
                    {progress === 100 ? 'Review Course' : 'Continue Course'}
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
