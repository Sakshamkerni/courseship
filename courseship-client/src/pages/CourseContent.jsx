// import React, { useEffect, useState } from 'react';
// import { useParams }               from 'react-router-dom';
// import axios                       from 'axios';
// import {
//   Container, Row, Col,
//   Accordion, Card, Button, Spinner, ListGroup, Form
// } from 'react-bootstrap';
// import './CourseContent.css';

// const CourseContent = () => {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState(null);
//   const [activeLecture, setActiveLecture] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/courses/${courseId}`)
//       .then(res => {
//         setCourse(res.data);
//         setLoading(false);
//       })
//       .catch(err => console.error(err));
//   }, [courseId]);

//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" />
//       </Container>
//     );
//   }

//   const lectures = course.topics;  // flat list
//   const lecture = lectures[activeLecture];

//   return (
//     <Container fluid className="course-content-container">
//       <Row>
//         {/* Sidebar */}
//         <Col md={4} lg={3} className="sidebar p-0">
//           <Accordion defaultActiveKey="0" className="h-100">
//             <Card className="border-0">
//               <Card.Body className="course-overview">
//                 <h4>{course.title}</h4>
//                 <div className="badges mb-2">
//                   <span className="badge bg-info text-dark">{course.category}</span>
//                   <span className="badge bg-secondary ms-1">{course.level}</span>
//                   <span className="badge bg-dark ms-1">{course.duration}</span>
//                 </div>
//                 <p className="text-muted small mb-0">{course.description}</p>
//               </Card.Body>
//             </Card>

//             <Card className="border-0 flex-grow-1">
//               <Card.Header className="section-header">
//                 <strong>Curriculum</strong>
//               </Card.Header>
//               <Accordion.Body className="p-0">
//                 <ListGroup variant="flush" className="lecture-list">
//                   {lectures.map((lec, idx) => (
//                     <ListGroup.Item
//                       key={idx}
//                       action
//                       active={idx === activeLecture}
//                       onClick={() => setActiveLecture(idx)}
//                       className="d-flex justify-content-between align-items-center lecture-item"
//                     >
//                       <div>
//                         <Form.Check 
//                           type="checkbox" 
//                           checked={idx < activeLecture} 
//                           readOnly 
//                           className="me-2" 
//                         />
//                         <span className="lecture-title">{lec.title}</span>
//                       </div>
//                       {/* if you had duration per lecture */}
//                       {/* <small className="text-muted">{lec.duration}</small> */}
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               </Accordion.Body>
//             </Card>
//           </Accordion>
//         </Col>

//         {/* Main video panel */}
//         <Col md={8} lg={9} className="p-4 main-panel">
//           <h5 className="mb-3">{lecture.title}</h5>
//           <div className="video-wrapper mb-4">
//             <iframe
//               src={lecture.videoUrl}
//               title={lecture.title}
//               allowFullScreen
//               frameBorder="0"
//               className="w-100 h-100"
//             />
//           </div>
//           <Button variant="outline-primary" disabled>
//             <i className="bi bi-heart-fill"></i> Bookmark Lecture
//           </Button>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default CourseContent;





// src/pages/CourseContent.jsx
import React, { useEffect, useState } from 'react';
import { useParams }               from 'react-router-dom';
import axios                       from 'axios';
import {
  Container, Row, Col,
  Accordion, Card, Button, Spinner, ListGroup, Form
} from 'react-bootstrap';
import Badge                       from '../components/Badge';
import './CourseContent.css';

const CourseContent = () => {
  const { courseId } = useParams();
  const [course, setCourse]                   = useState(null);
  const [activeLecture, setActiveLecture]     = useState(0);
  const [loading, setLoading]                 = useState(true);
  const [progress, setProgress]               = useState(0);
  const [xp, setXp]                           = useState(0);
  const [completedTopics, setCompletedTopics] = useState([]);

  // 1) Fetch course data
  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${courseId}`)
      .then(res => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [courseId]);

  // 2) Fetch progress & XP once course is loaded
  useEffect(() => {
    if (!course) return;
    const token = localStorage.getItem('token');
    axios.get(
      `http://localhost:5000/api/enrollments/${courseId}/progress`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(res => {
      console.log('Progress response:', res.data);
      setProgress(res.data.progress);
      setXp(res.data.xp);
      setCompletedTopics(res.data.completedTopics || []);
    })
    .catch(err => {
      // If not enrolled yet, ignore
      console.warn('No progress yet:', err.response?.data);
    });
  }, [course, courseId]);

  if (loading || !course) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  const lectures = course.topics;
  const lecture  = lectures[activeLecture];
  const topicId  = lecture._id || lecture.title;

  // 3) Mark this topic complete
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
      console.error(err);
    }
  };

  return (
    <Container fluid className="course-content-container">
      <Row>
        {/* Sidebar */}
        <Col md={4} lg={3} className="sidebar p-0">
          <Accordion defaultActiveKey="0" className="h-100">
            <Card className="border-0">
              <Card.Body className="course-overview">
                <h4>{course.title}</h4>
                <div className="badges mb-2">
                  <span className="badge bg-info text-dark">{course.category}</span>
                  <span className="badge bg-secondary ms-1">{course.level}</span>
                  <span className="badge bg-dark ms-1">{course.duration}</span>
                </div>
                <p className="text-muted small mb-0">{course.description}</p>
              </Card.Body>
            </Card>

            <Card className="border-0 flex-grow-1">
              <Card.Header className="section-header">
                <strong>Curriculum</strong>
              </Card.Header>
              <Accordion.Body className="p-0">
                <ListGroup variant="flush" className="lecture-list">
                  {lectures.map((lec, idx) => (
                    <ListGroup.Item
                      key={idx}
                      action
                      active={idx === activeLecture}
                      onClick={() => setActiveLecture(idx)}
                      className="d-flex justify-content-between align-items-center lecture-item"
                    >
                      <div>
                        <Form.Check
                          type="checkbox"
                          checked={completedTopics.includes(lec._id || lec.title)}
                          readOnly
                          className="me-2"
                        />
                        <span className="lecture-title">{lec.title}</span>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Accordion.Body>
            </Card>
          </Accordion>
        </Col>

        {/* Main panel */}
        <Col md={8} lg={9} className="p-4 main-panel">
          {/* Progress & XP */}
          <div className="mb-4">
            <h5>
              Progress: <strong>{progress}%</strong> &nbsp;|&nbsp; XP: <strong>{xp}</strong>
            </h5>
            <div className="progress mb-3">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>

            {/* Badge Download & Share */}
            {progress === 100 && (
              <Badge
                studentName={JSON.parse(localStorage.getItem('profile') || '{}').name}
                courseTitle={course.title}
              />
            )}
          </div>

          {/* Lecture Title & Video */}
          <h5 className="mb-3">{lecture.title}</h5>
          <div className="video-wrapper mb-4">
            <iframe
              src={lecture.videoUrl}
              title={lecture.title}
              allowFullScreen
              frameBorder="0"
              className="w-100 h-100"
            />
          </div>

          {/* Mark Complete Button */}
          {!completedTopics.includes(topicId) ? (
            <Button variant="success" onClick={markComplete}>
              ✅ Mark Topic Complete
            </Button>
          ) : (
            <span className="badge bg-primary">Topic Completed</span>
          )}

          <Button variant="outline-primary" disabled className="ms-3">
            <i className="bi bi-heart-fill"></i> Bookmark Lecture
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseContent;
