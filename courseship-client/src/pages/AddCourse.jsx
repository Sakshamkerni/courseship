import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    duration: '',
    category: '',
    level: 'Beginner',
    topics: [{ title: '', videoUrl: '', pdfUrl: '' }]
  });
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  // Load course if editing
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/courses/${id}`)
        .then((res) => {
          setCourse(res.data);
          setImageFile(null); // don't set file input for editing
        })
        .catch((err) => console.error('Failed to fetch course:', err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleTopicChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTopics = [...course.topics];
    updatedTopics[index][name] = value;
    setCourse({ ...course, topics: updatedTopics });
  };

  const handleAddTopic = () => {
    setCourse({
      ...course,
      topics: [...course.topics, { title: '', videoUrl: '', pdfUrl: '' }]
    });
  };

  const handleRemoveTopic = (index) => {
    const updatedTopics = course.topics.filter((_, i) => i !== index);
    setCourse({ ...course, topics: updatedTopics });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  try {
    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('description', course.description);
    formData.append('duration', course.duration);
    formData.append('category', course.category);
    formData.append('level', course.level);
    formData.append('topics', JSON.stringify(course.topics));
    if (imageFile) formData.append('image', imageFile);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    if (id) {
      await axios.put(`http://localhost:5000/api/courses/${id}`, formData, config);
      navigate(`/courses/${id}`);
    } else {
      await axios.post('http://localhost:5000/api/courses', formData, config);
      alert('✅ Course added!');
      navigate('/courses');
    }
  } catch (error) {
    console.error('❌ Error saving course:', error);
    alert('Failed to save course. Check console for errors.');
  }
};


  return (
    <Container className="mt-4">
      <h2 className="mb-4">{id ? '✏️ Edit Course' : '➕ Add New Course'}</h2>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Course Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course title"
            name="title"
            value={course.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter course description"
            name="description"
            value={course.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDuration" className="mb-3">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. 10 days"
            name="duration"
            value={course.duration}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategory" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Web Development"
            name="category"
            value={course.category}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formLevel" className="mb-3">
          <Form.Label>Level</Form.Label>
          <Form.Select name="level" value={course.level} onChange={handleChange}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formImage" className="mb-4">
          <Form.Label>Course Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </Form.Group>

        <h5 className="mt-4">🎥 Course Topics & Videos</h5>
        {course.topics.map((topic, index) => (
          <div key={index} className="mb-3 border p-3 rounded bg-light">
            <Form.Group controlId={`topic-title-${index}`} className="mb-2">
              <Form.Label>Topic Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter topic title"
                name="title"
                value={topic.title}
                onChange={(e) => handleTopicChange(e, index)}
                required
              />
            </Form.Group>

            <Form.Group controlId={`topic-videoUrl-${index}`} className="mb-2">
              <Form.Label>Video URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Paste video URL (YouTube, etc.)"
                name="videoUrl"
                value={topic.videoUrl}
                onChange={(e) => handleTopicChange(e, index)}
                required
              />
            </Form.Group>

            <Form.Group controlId={`topic-pdfUrl-${index}`} className="mb-2">
              <Form.Label>PDF URL (Optional)</Form.Label>
              <Form.Control
                type="url"
                placeholder="Paste PDF URL (e.g. Google Drive link)"
                name="pdfUrl"
                value={topic.pdfUrl}
                onChange={(e) => handleTopicChange(e, index)}
              />
            </Form.Group>

            {course.topics.length > 1 && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveTopic(index)}
              >
                Remove Topic
              </Button>
            )}
          </div>
        ))}

        <Button variant="secondary" className="mb-4" onClick={handleAddTopic}>
          ➕ Add Another Topic
        </Button>

        <br />
        <Button variant="primary" type="submit">
          {id ? 'Update Course' : 'Add Course'}
        </Button>
      </Form>
    </Container>
  );
};

export default AddCourse;
