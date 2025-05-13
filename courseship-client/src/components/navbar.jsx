import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';
  const isCompany = user?.role === 'company';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Courseship</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/courses">Courses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gigs">Gigs</Link>
            </li>

            {token && (
              <>
                {isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin-dashboard">Admin Panel</Link>
                  </li>
                )}

                {isCompany && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/dashboard/company">Company Dashboard</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/dashboard/incoming-applications">Applications</Link>
                    </li>
                  </>
                )}

                {!isAdmin && !isCompany && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                )}

                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <span className="nav-link disabled">Hi, {user?.name}</span>
                </li>
                <li className="nav-item">
                  <button
                    onClick={logoutHandler}
                    className="btn btn-sm btn-light ms-2"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
