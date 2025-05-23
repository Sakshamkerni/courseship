import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ContactUs = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-5">Contact us</h2>
      <Row className="mb-4 text-center">
        <Col md={4}>
          <Card className="p-4 h-100">
            <Card.Body>
              <Card.Title>Students - Internships & Jobs</Card.Title>
              <Card.Text>
                For internships and jobs related queries,<br />
                visit Student Help Center
              </Card.Text>
              <Button variant="primary">Visit student help center</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-4 h-100">
            <Card.Body>
              <Card.Title>Student - Trainings</Card.Title>
              <Card.Text>
                For trainings related queries,<br />
                visit Trainings Help Center
              </Card.Text>
              <Button variant="primary">Visit trainings help center</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-4 h-100">
            <Card.Body>
              <Card.Title>Employers</Card.Title>
              <Card.Text>
                For employer queries,<br />
                visit Employer Help Center
              </Card.Text>
              <Button variant="primary">Visit employer help center</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <h5>For others</h5>
          <p><strong>University/college associations</strong><br />
            Email us: <a href="mailto:university.relations@yourdomain.com">university.relations@yourdomain.com</a></p>
          <p><strong>Media queries</strong><br />
            Email us: <a href="mailto:pr@yourdomain.com">pr@yourdomain.com</a></p>
          <p><strong>Fest sponsorships</strong><br />
            Email us: <a href="mailto:pr@yourdomain.com">pr@yourdomain.com</a></p>
          <p><strong>For everything else</strong><br />
            Email us: <a href="mailto:support@yourdomain.com">support@yourdomain.com</a></p>
        </Col>
        <Col md={6}>
          <h5>Address</h5>
          <p>
            Courseship Pvt. Ltd.<br />
            901A/B, Iris Tech Park, Sector 48,<br />
            Gurugram, Haryana, India - 122018
          </p>
          <p><img src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png" alt="map" width="25" className="me-2" />
            Working Hours: Monday to Friday, 10:00 AM – 6:00 PM
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
