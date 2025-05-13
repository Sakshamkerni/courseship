import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css'; // Optional if you want to add styling
import defaultImage from '../assets/default-course.jpg'; // Add a placeholder image in case no imageUrl

const CourseCard = ({ course, onEnroll, isEnrolled }) => {
  const imageSrc = course.imageUrl || defaultImage;

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={imageSrc}
          alt={course.title}
          className="card-img-top"
          style={{ height: '180px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{course.title}</h5>
          <p className="card-text text-muted">
            {course.description?.substring(0, 100)}...
          </p>
          <div className="mt-auto">
            <span className="badge bg-primary me-2">{course.category}</span>
            <span className="badge bg-secondary">{course.level}</span>
          </div>
        </div>
        <div className="card-footer bg-transparent border-top-0 d-flex justify-content-between">
          <Link to={`/courses/${course._id}`} className="btn btn-outline-info btn-sm">
            View Details
          </Link>
          {isEnrolled ? (
            <button className="btn btn-success btn-sm" disabled>Enrolled</button>
          ) : (
            <button onClick={() => onEnroll(course._id)} className="btn btn-primary btn-sm">
              Enroll
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
