import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MyCourses.css'; // ← Import the new styles

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
          {courses.map(course => (
            <div className="col-md-4 mb-4" key={course._id}>
              <div
                className="card h-100 shadow-sm course-card"
                onClick={() => (window.location.href = `/courses/${course._id}`)}
              >
                {course.imageUrl && (
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="card-img-top course-img"
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="course-title">{course.title}</h5>

                  <p className="course-desc mt-2 mb-4">
                    {course.description?.length > 100
                      ? `${course.description.slice(0, 100)}...`
                      : course.description}
                  </p>

                  {/* Static 0% progress bar – replace with real data when ready */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <small className="text-muted">0% Complete</small>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: '0%' }}
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>

                  <Link
                    to={`/courses/${course._id}`}
                    className="btn btn-primary mt-auto"
                  >
                    Continue Course
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
