// src/pages/profile.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';

const Profile = () => {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  // Fallback if REACT_APP_API_URL isn’t set
  const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const url = `${API}/api/user/profile`;
        console.log('Fetching user profile from:', url);
        const token = localStorage.getItem('token');
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [API]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-5 text-center">
        {error}
      </Alert>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Header as="h5">Profile Information</Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={6}>
                  <h6>Name</h6>
                  <p>{user.name}</p>
                </Col>
                <Col md={6}>
                  <h6>Email</h6>
                  <p>{user.email}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <h6>Age</h6>
                  <p>{user.age || '—'}</p>
                </Col>
                <Col md={6}>
                  <h6>City</h6>
                  <p>{user.city || '—'}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <h6>Phone</h6>
                  <p>{user.phone || '—'}</p>
                </Col>
                <Col md={6}>
                  <h6>Role</h6>
                  <p>{user.role}</p>
                </Col>
              </Row>
              <Button variant="primary">Edit Profile</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
