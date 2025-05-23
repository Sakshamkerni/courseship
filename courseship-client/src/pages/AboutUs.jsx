// src/pages/AboutUs.jsx
import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

const AboutUs = () => {
    return (
        <>
            {/* Hero Section */}
            <div className="bg-white text-dark text-center py-5 border-bottom">
                <h1 className="display-5 fw-bold">Welcome to Courseship</h1>
                <p className="lead text-muted">Empowering Skills, Enabling Futures</p>
            </div>

            <Container className="py-5">
                {/* Mission Section */}
                <Row className="align-items-center mb-5">
                    <Col md={6}>
                        <Image
                            src="/images/mission.jpg"
                            alt="Our Mission"
                            fluid
                            rounded
                            style={{ maxHeight: '350px', objectFit: 'cover' }}
                        />
                    </Col>
                    <Col md={6}>
                        <h3 className="fw-bold mb-3">🚀 Our Mission</h3>
                        <p className="fs-5 text-muted">
                            Courseship bridges the gap between learning and earning by connecting students with nano-courses and freelance gigs. We empower students to build job-ready skills and apply them instantly through real-world micro-jigs.
                        </p>
                    </Col>
                </Row>
            </Container>

            {/* Vision Section */}
            <section style={{ backgroundColor: '#E6F9FF' }} className="py-5">
                <Container>
                    <h3 className="text-center fw-bold mb-3">🌟 Our Vision</h3>
                    <p className="text-center fs-5 mb-5 text-muted">
                        We’re on a mission to equip students with industry-ready skills and real-world experience—so they can launch the careers they’ve dreamed of.
                    </p>
                    <Row className="g-4">
                        <Col md={6}>
                            <Card className="flex-row align-items-center p-3 border-0 rounded shadow-sm bg-white">
                                <Image
                                    src="/images/vision-trainings.svg"
                                    alt="Trainings"
                                    style={{ width: 80, height: 80, objectFit: 'contain' }}
                                />
                                <Card.Body className="ps-3">
                                    <Card.Title className="fw-semibold">Trainings</Card.Title>
                                    <Card.Text className="text-muted mb-2">
                                        Courseship bridges the gap between learning and earning by connecting students with nano-courses and freelance gigs. We empower students to build job-ready skills and apply them instantly through real-world micro-jigs.                  </Card.Text>
                                    <a href="#trainings" className="text-primary fw-semibold">
                                        Explore more →
                                    </a>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="flex-row align-items-center p-3 border-0 rounded shadow-sm bg-white">
                                <Image
                                    src="/images/vision-placement.svg"
                                    alt="Placement Guarantee"
                                    style={{ width: 80, height: 80, objectFit: 'contain' }}
                                />
                                <Card.Body className="ps-3">
                                    <Card.Title className="fw-semibold">Placement Guarantee Courses</Card.Title>
                                    <Card.Text className="text-muted mb-2">
                                        Courseship bridges the gap between learning and earning by connecting students with nano-courses and freelance gigs. We empower students to build job-ready skills and apply them instantly through real-world micro-jigs.                  </Card.Text>
                                    <a href="#placement" className="text-primary fw-semibold">
                                        Explore more →
                                    </a>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="flex-row align-items-center p-3 border-0 rounded shadow-sm bg-white">
                                <Image
                                    src="/images/vision-fresher.svg"
                                    alt="Fresher Jobs"
                                    style={{ width: 80, height: 80, objectFit: 'contain' }}
                                />
                                <Card.Body className="ps-3">
                                    <Card.Title className="fw-semibold">Fresher Jobs</Card.Title>
                                    <Card.Text className="text-muted mb-2">
                                        Courseship bridges the gap between learning and earning by connecting students with nano-courses and freelance gigs. We empower students to build job-ready skills and apply them instantly through real-world micro-jigs.                  </Card.Text>
                                    <a href="#jobs" className="text-primary fw-semibold">
                                        Explore more →
                                    </a>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="flex-row align-items-center p-3 border-0 rounded shadow-sm bg-white">
                                <Image
                                    src="/images/vision-internship.jpg"
                                    alt="Internships"
                                    style={{ width: 80, height: 80, objectFit: 'contain' }}
                                />
                                <Card.Body className="ps-3">
                                    <Card.Title className="fw-semibold">Internships</Card.Title>
                                    <Card.Text className="text-muted mb-2">
                                        Courseship bridges the gap between learning and earning by connecting students with nano-courses and freelance gigs. We empower students to build job-ready skills and apply them instantly through real-world micro-jigs.                  </Card.Text>
                                    <a href="#internships" className="text-primary fw-semibold">
                                        Explore more →
                                    </a>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Container className="py-5">
                {/* Team Section */}
                <h3 className="text-center fw-bold mb-4">👨‍💻 Meet the Team</h3>
                <Row className="justify-content-center mb-5">
                    <Col md={4} className="mb-4">
                        <Card className="text-center shadow-sm border-0 hover-shadow transition">
                            <Card.Img
                                variant="top"
                                src="/images/founder.jpg"
                                style={{ height: '300px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title>Saksham Kerni</Card.Title>
                                <Card.Text className="text-muted">
                                    Founder & Full Stack Developer<br />
                                    Visionary behind Courseship
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="text-center shadow-sm border-0 hover-shadow transition">
                            <Card.Img
                                variant="top"
                                src="/images/co-founder.jpg"
                                style={{ height: '300px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title>Sahil Sharma</Card.Title>
                                <Card.Text className="text-muted">
                                    Co-Founder & Developer<br />
                                    Visionary behind Courseship
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Our Milestones Timeline */}
                <section className="position-relative">
                    <h3 className="text-center fw-bold mb-5">🏆 Our Milestones</h3>
                    <div
                        className="position-absolute"
                        style={{
                            left: '16.6667%',
                            top: 0,
                            bottom: 0,
                            borderLeft: '2px dashed #dee2e6',
                            zIndex: 0,
                        }}
                    />
                    {[
                        { year: '2010', icon: '📝', title: 'How it all started', text: 'Our founder Saksham began Courseship as a small blog aiming to connect learners with practical internships. In the first two years, we ran entirely online—no in-office team, just pure passion.' },
                        { year: '2013', icon: '🚀', title: 'Website Launch', text: 'After building a small team, we officially launched our platform—Courseship.com—free for every student in India, focused on hands-on nano-courses and real micro-gigs.' },
                        { year: '2018', icon: '📱', title: 'Mobile App Release', text: 'To reach learners on the go, we released our mobile app on Android and iOS—making Courseship’s nano-courses and gig applications just a tap away.' },
                        { year: '2022', icon: '⭐', title: '1M+ Users', text: 'We crossed the milestone of one million registered users, cementing our place as India’s fastest-growing skill-to-job platform.' }
                    ].map((m, idx) => (
                        <Row key={idx} className="align-items-center mb-5" style={{ zIndex: 1 }}>
                            <Col xs={2} className="text-center">
                                <div className="milestone-icon bg-primary text-white rounded-circle">
                                    {m.icon}
                                </div>
                            </Col>
                            <Col xs={10}>
                                <h4 className="fw-bold">{m.year}</h4>
                                <h5 className="fw-semibold">{m.title}</h5>
                                <p className="text-muted">{m.text}</p>
                            </Col>
                        </Row>
                    ))}
                </section>

                {/* Footer Quote */}
                <div className="text-center mt-5">
                    <p className="text-muted fst-italic">
                        “We believe in skills over degrees, action over theory, and real-world results for every learner.”
                    </p>
                    <p className="text-muted small">
                        © {new Date().getFullYear()} Courseship. Empowering skills, enabling futures.
                    </p>
                </div>
            </Container>

            {/* Inline CSS */}
            <style>{`
        .hover-shadow:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          transform: translateY(-4px);
          transition: all 0.3s ease;
        }
        .transition {
          transition: all 0.3s ease;
        }
        .milestone-icon {
          width: 36px;
          height: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          z-index: 1;
        }
      `}</style>
        </>
    );
};

export default AboutUs;
