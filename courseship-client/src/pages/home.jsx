// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="home-hero d-flex align-items-center justify-content-center text-center"
        style={{ height: '90vh', backgroundColor: '#f0f8ff' }}
      >
        <div>
          <h1 className="display-4 fw-bold mb-4">Learn Skills. Get Hired. Fast.</h1>
          <p className="lead mb-5">Nano-courses • Freelance Gigs • Verified Skills Wallet</p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/courses" className="btn btn-primary btn-lg">
              🚀 Explore Courses
            </Link>
            <Link to="/register" className="btn btn-outline-primary btn-lg">
              🏢 Join as Company
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <h2 className="text-center mb-5">Why Choose Courseship?</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 p-4">
              <div className="mb-3" style={{ fontSize: '2.5rem' }}>📚</div>
              <h5 className="card-title">Nano-Courses</h5>
              <p className="card-text">Learn real skills in just 15–20 days with expert-designed nano-courses.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 p-4">
              <div className="mb-3" style={{ fontSize: '2.5rem' }}>💼</div>
              <h5 className="card-title">Direct Gigs</h5>
              <p className="card-text">Apply instantly to freelance gigs, micro-jobs, and internships.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 p-4">
              <div className="mb-3" style={{ fontSize: '2.5rem' }}>🏆</div>
              <h5 className="card-title">Verified Skills Wallet</h5>
              <p className="card-text">Show off your certified skills to companies directly from your profile.</p>
            </div>
          </div>
        </div>
      </div>

 {/* Featured Courses Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">🔥 Featured Courses</h2>
        <div className="row">
          {[
            { title: "Frontend Development", desc: "Learn HTML, CSS, JS & React in 20 days.", color: "#e3f2fd" },
            { title: "Data Analytics", desc: "Excel, SQL, and Power BI in 15 days.", color: "#fff3e0" },
            { title: "UI/UX Design", desc: "Figma, wireframes & design systems.", color: "#e8f5e9" }
          ].map((course, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100 p-4 border-0 shadow-sm" style={{ backgroundColor: course.color }}>
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.desc}</p>
                <Link to="/courses" className="btn btn-outline-primary btn-sm">View Course</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works Section */}
      <div className="container my-5">
        <h2 className="text-center mb-5">How Courseship Works</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm p-4">
              <div className="mb-3" style={{ fontSize: '2.5rem' }}>🎯</div>
              <h5 className="card-title">Learn Skills</h5>
              <p className="card-text">Enroll in expert-designed nano-courses and master practical skills in 15–20 days.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm p-4">
              <div className="mb-3" style={{ fontSize: '2.5rem' }}>💼</div>
              <h5 className="card-title">Apply for Gigs</h5>
              <p className="card-text">Complete a course and get instantly matched with freelance gigs and internships.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm p-4">
              <div className="mb-3" style={{ fontSize: '2.5rem' }}>🚀</div>
              <h5 className="card-title">Grow Your Career</h5>
              <p className="card-text">Build real-world experience, grow your verified skills wallet, and get hired faster.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container my-5">
        <h2 className="text-center mb-5">What Learners Say</h2>
        <div className="row">
          {[
            {
              name: "Amit (Frontend Intern)",
              quote: "I landed a paid gig within 3 weeks after completing a nano-course. Thanku Saksham Kerni and Sahil Sharma..",
              img: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Neha (BCA Student)",
              quote: "Courseship made learning so easy. I now have a verified skills badge! And the Founder and Co-founder are really sweet they  helped me alot. Thankyou Saksham Kerni and Sahil Sharma..",
              img: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
              name: "Ravi (Fresher)",
              quote: "From zero to hired – Courseship changed my career!. Thanku Saksham Kerni and Sahil Sharma..",
              img: "https://randomuser.me/api/portraits/men/45.jpg",
            },
          ].map((t, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card p-4 h-100 shadow-sm border-0">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="rounded-circle mb-3"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <p className="text-muted">“{t.quote}”</p>
                  <h6 className="mt-2 text-primary">{t.name}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-dark text-light pt-5 pb-3 mt-5">
        <div className="container">
          <div className="row text-center text-md-start">
            <div className="col-md-4 mb-4">
              <h5>Courseship</h5>
              <p>Your bridge from learning real skills to getting hired faster.</p>
            </div>
            <div className="col-md-4 mb-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
                <li><Link to="/courses" className="text-light text-decoration-none">Courses</Link></li>
                <li><Link to="/dashboard" className="text-light text-decoration-none">Dashboard</Link></li>
              </ul>
            </div>
            <div className="col-md-4 mb-4">
              <h5>Contact</h5>
              <p>Email: support@courseship.com</p>
            </div>
          </div>
          <div className="text-center pt-3">
            <small>© 2025 Courseship. All rights reserved.</small>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
