import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import jsPDF from 'jspdf';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Name: ${formData.name}`, 10, 10);
    doc.text(`Email: ${formData.email}`, 10, 20);
    doc.text(`Phone: ${formData.phone}`, 10, 30);
    doc.text(`Education: ${formData.education}`, 10, 40);
    doc.text(`Experience: ${formData.experience}`, 10, 50);
    doc.text(`Skills: ${formData.skills}`, 10, 60);
    doc.save('resume.pdf');
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Resume Builder</h2>
      <Form>
        <Form.Group as={Row} controlId="formName">
          <Form.Label column sm={2}>Name</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formEmail" className="mt-3">
          <Form.Label column sm={2}>Email</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPhone" className="mt-3">
          <Form.Label column sm={2}>Phone</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formEducation" className="mt-3">
          <Form.Label column sm={2}>Education</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Enter your education details"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formExperience" className="mt-3">
          <Form.Label column sm={2}>Experience</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Enter your work experience"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formSkills" className="mt-3">
          <Form.Label column sm={2}>Skills</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={2}
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Enter your skills"
            />
          </Col>
        </Form.Group>

        <Button variant="primary" className="mt-4" onClick={generatePDF}>
          Download PDF
        </Button>
      </Form>
    </Container>
  );
};

export default ResumeBuilder;
