import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>

      {/* Hero Section */}
      <div className="home-hero d-flex align-items-center justify-content-center text-center" style={{ height: '90vh', backgroundColor: '#f0f8ff' }}>
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
