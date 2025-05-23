// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Container, Row, Col, Accordion, Card, Spinner, Alert, Badge
// } from 'react-bootstrap';

// const CourseDetails = () => {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [activeTopicIndex, setActiveTopicIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const { data } = await axios.get(`http://localhost:5000/api/courses/${id}`);
//         setCourse(data);
//       } catch (err) {
//         setError('Error fetching course details.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCourse();
//   }, [id]);

//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" />
//       </Container>
//     );
//   }

//   if (error || !course) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error || 'Course not found.'}</Alert>
//       </Container>
//     );
//   }

//   const current = course.topics[activeTopicIndex];

//   return (
//     <Container fluid className="mt-4 px-4">
//       {/* Header */}
//       <Row className="mb-4">
//         <Col>
//           <h2 className="fw-bold">{course.title}</h2>
//           <p className="text-muted">{course.description}</p>
//           <div className="d-flex flex-wrap gap-2">
//             <Badge bg="info">📂 {course.category}</Badge>
//             <Badge bg="secondary">🎯 {course.level}</Badge>
//             <Badge bg="dark">⏱️ {course.duration}</Badge>
//           </div>
//         </Col>
//       </Row>

//       <Row>
//         {/* Left Sidebar: Curriculum */}
//         <Col md={4} lg={3} className="mb-4">
//           <h5 className="fw-semibold mb-3">🧩 Course Curriculum</h5>
//           <Accordion defaultActiveKey="0" flush>
//             {course.topics.map((topic, index) => (
//               <Accordion.Item eventKey={index.toString()} key={index}>
//                 <Accordion.Header onClick={() => setActiveTopicIndex(index)}>
//                   {topic.title}
//                 </Accordion.Header>
//                 <Accordion.Body>
//                   <small>Click to view video</small>
//                 </Accordion.Body>
//               </Accordion.Item>
//             ))}
//           </Accordion>
//         </Col>

//         {/* Right: Video and Content */}
//         <Col md={8} lg={9}>
//           <Card className="shadow-sm mb-4">
//             <Card.Body>
//               <h4 className="mb-3">{current.title}</h4>
//               {current.videoUrl ? (
//                 <div className="ratio ratio-16x9 mb-3">
//                   <iframe
//                     src={current.videoUrl}
//                     title={current.title}
//                     allowFullScreen
//                   />
//                 </div>
//               ) : (
//                 <Alert variant="warning">No video available for this topic.</Alert>
//               )}

//               {current.pdfUrl && (
//                 <p>
//                   📄 <a href={current.pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>
//                 </p>
//               )}
//             </Card.Body>
//           </Card>

//           <Card>
//             <Card.Body>
//               <h5>About this course</h5>
//               <p>{course.description}</p>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default CourseDetails;






// src/pages/CourseDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container, Row, Col,
  Accordion, Card, Spinner, Alert,
  Badge as BsBadge, Button, ProgressBar
} from 'react-bootstrap';
import Badge from '../components/Badge';

const CourseDetails = () => {
  const { id: courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [xp, setXp] = useState(0);
  const [completedTopics, setCompletedTopics] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
        setCourse(data);
      } catch {
        setError('Error fetching course details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    if (!course) return;
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:5000/api/enrollments/${courseId}/progress`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setProgress(res.data.progress);
      setXp(res.data.xp);
      setCompletedTopics(res.data.completedTopics || []);
    })
    .catch(() => {});
  }, [course]);

  if (loading) {
    return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;
  }

  if (error || !course) {
    return <Container className="mt-5"><Alert variant="danger">{error || 'Course not found.'}</Alert></Container>;
  }

  const topics = course.topics || [];
  const current = topics[activeTopicIndex];
  const topicId = current._id || activeTopicIndex.toString();

  const markComplete = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        `http://localhost:5000/api/enrollments/${courseId}/complete-topic`,
        { topicId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProgress(res.data.progress);
      setXp(res.data.xp);
      setCompletedTopics(prev => [...prev, topicId]);
    } catch (err) {
      console.error('Error marking complete:', err);
    }
  };

  return (
    <Container fluid className="px-4 mt-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">{course.title}</h2>
          <p className="text-muted fs-6">{course.description}</p>

          <div className="d-flex gap-2 flex-wrap mb-2">
            <BsBadge bg="info">📂 {course.category}</BsBadge>
            <BsBadge bg="secondary">🎯 {course.level}</BsBadge>
            <BsBadge bg="dark">⏱️ {course.duration}</BsBadge>
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">Progress: {progress}%</small>
              <small className="text-muted">XP: {xp}</small>
            </div>
            <ProgressBar now={progress} variant="success" label={`${progress}%`} />
          </div>

          {progress === 100 && (
            <div className="mt-3">
              <Alert variant="success">
                🎉 Congratulations! You’ve completed this course.
              </Alert>
              <Badge
                studentName={JSON.parse(localStorage.getItem('profile') || '{}').name}
                courseTitle={course.title}
              />
            </div>
          )}
        </Col>
      </Row>

      <Row>
        {/* Sidebar Curriculum */}
        <Col md={4} lg={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-semibold mb-3">🧩 Curriculum</h5>
              <Accordion defaultActiveKey={activeTopicIndex.toString()} flush>
                {topics.map((topic, idx) => {
                  const tid = topic._id || idx.toString();
                  const done = completedTopics.includes(tid);
                  const isActive = idx === activeTopicIndex;
                  return (
                    <Accordion.Item eventKey={idx.toString()} key={tid}>
                      <Accordion.Header
                        onClick={() => setActiveTopicIndex(idx)}
                        style={isActive ? { fontWeight: 'bold' } : {}}
                      >
                        {done ? '✅ ' : '▶️ '} {topic.title}
                      </Accordion.Header>
                      <Accordion.Body>
                        <small className={done ? 'text-success' : 'text-muted'}>
                          {done ? 'Completed' : 'Not completed'}
                        </small>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>

        {/* Main Topic Content */}
        <Col md={8} lg={9}>
          <Card className="shadow-sm mb-4 border-0">
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
                  📄 <a href={current.pdfUrl} target="_blank" rel="noopener noreferrer">
                    Download Supplementary PDF
                  </a>
                </p>
              )}

              {/* Mark Complete */}
              {!completedTopics.includes(topicId) ? (
                <Button variant="success" onClick={markComplete}>
                  ✅ Mark This Topic as Complete
                </Button>
              ) : (
                <BsBadge bg="success">✅ Completed</BsBadge>
              )}
            </Card.Body>
          </Card>

          {/* Course Description */}
          <Card className="border-0">
            <Card.Body>
              <h5 className="fw-bold">📘 About this Course</h5>
              <p>{course.description}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetails;
