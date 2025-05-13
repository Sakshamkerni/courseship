// src/pages/EditCourse.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCourse = () => {
  const [course, setCourse] = useState({
     imageUrl: '',
    title: '',
    description: '',
    duration: '',
    category: '',
    level: 'Beginner'
  });
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch course data by ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };
    fetchCourse();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Submit the form to update the course
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/courses/${id}`, course);
      navigate(`/admin-dashboard`); // Redirect to Admin Dashboard
    } catch (err) {
      console.error("Error updating course:", err);
    }
  };

  return (
    <div className="container">
      <h1>Edit Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={course.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={course.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            className="form-control"
            value={course.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="level" className="form-label">Level</label>
          <select
            id="level"
            name="level"
            className="form-control"
            value={course.level}
            onChange={handleChange}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Duration</label>
          <input
            type="text"
            id="duration"
            name="duration"
            className="form-control"
            value={course.duration}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Course</button>
      </form>
    </div>
  );
};

export default EditCourse;
