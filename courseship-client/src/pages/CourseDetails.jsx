import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container, Row, Col, Accordion, Card, Spinner, Alert, Badge
} from 'react-bootstrap';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(data);
      } catch (err) {
        setError('Error fetching course details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error || !course) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error || 'Course not found.'}</Alert>
      </Container>
    );
  }

  const current = course.topics[activeTopicIndex];

  return (
    <Container fluid className="mt-4 px-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">{course.title}</h2>
          <p className="text-muted">{course.description}</p>
          <div className="d-flex flex-wrap gap-2">
            <Badge bg="info">📂 {course.category}</Badge>
            <Badge bg="secondary">🎯 {course.level}</Badge>
            <Badge bg="dark">⏱️ {course.duration}</Badge>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Left Sidebar: Curriculum */}
        <Col md={4} lg={3} className="mb-4">
          <h5 className="fw-semibold mb-3">🧩 Course Curriculum</h5>
          <Accordion defaultActiveKey="0" flush>
            {course.topics.map((topic, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header onClick={() => setActiveTopicIndex(index)}>
                  {topic.title}
                </Accordion.Header>
                <Accordion.Body>
                  <small>Click to view video</small>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>

        {/* Right: Video and Content */}
        <Col md={8} lg={9}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h4 className="mb-3">{current.title}</h4>
              {current.videoUrl ? (
                <div className="ratio ratio-16x9 mb-3">
                  <iframe
                    src={current.videoUrl}
                    title={current.title}
                    allowFullScreen
                  />
                </div>
              ) : (
                <Alert variant="warning">No video available for this topic.</Alert>
              )}

              {current.pdfUrl && (
                <p>
                  📄 <a href={current.pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>
                </p>
              )}
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>About this course</h5>
              <p>{course.description}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetails;
