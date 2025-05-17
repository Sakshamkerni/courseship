import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

// Public Pages
import Home from './pages/home';
import Courses from './pages/courses';
import CourseDetails from './pages/CourseDetails';
import CourseContent from './pages/CourseContent';
import Login from './pages/login';
import Register from './pages/register';

// Protected / Profile
import Profile from './pages/profile';

// Student Dashboard
import Dashboard from './pages/dashboard/dashboard';
import AppliedGigs from './pages/dashboard/AppliedGigs';
import MyCourses from './pages/dashboard/MyCourses';

// Company Dashboard
import CompanyDashboard from './pages/CompanyDashboard';
import CompanyApplications from './pages/dashboard/CompanyApplications';
import PostGig from './pages/PostGig';
import MyGigs from './pages/dashboard/MyGigs';
import GigsPage from './pages/gigs';
import ApplyGig from './pages/ApplyGig';
// Course CRUD
import AddCourse from './pages/AddCourse';
import EditCourse from './pages/EditCourse';

// Admin Dashboard (with nested routes)
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/courses/content/:courseId" element={<CourseContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        {/* Student Dashboard */}
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* Course Management */}
        <Route path="/add-course" element={
          <ProtectedRoute>
            <AddCourse />
          </ProtectedRoute>
        } />
        <Route path="/edit-course/:id" element={
          <ProtectedRoute>
            <EditCourse />
          </ProtectedRoute>
        } />

        {/* Company Routes */}
        <Route path="/post-gig" element={
          <ProtectedRoute roles={['company']}>
            <PostGig />
          </ProtectedRoute>
        } />
        <Route path="/my-gigs" element={
          <ProtectedRoute roles={['company']}>
            <MyGigs />
          </ProtectedRoute>
        } />
        <Route path="/gigs" element={<GigsPage />} />
        <Route path="/dashboard/company" element={
          <ProtectedRoute roles={['company']}>
            <CompanyDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/incoming-applications" element={
          <ProtectedRoute roles={['company']}>
            <CompanyApplications />
          </ProtectedRoute>
        } />

        {/* Student “Apply” page */}
        <Route
          path="/apply-gig/:gigId"
          element={
            <ProtectedRoute roles={['student']}>
              <ApplyGig />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard with nested Manage Courses & Manage Users */}
        <Route path="/admin-dashboard/*" element={
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }>
          {/* index (default) renders Manage Courses inside AdminDashboard */}
          <Route index element={null} />
          {/* /admin-dashboard/users renders Manage Users */}
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
