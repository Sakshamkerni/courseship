import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

// Correct imports (assuming all files are inside dashboard/)
import MyCourses from './MyCourses';
import AppliedGigs from './AppliedGigs';
import ProfileSettings from './ProfileSettings';
import PostGig from './PostGig';
import MyGigs from './MyGigs';

const Dashboard = () => {
  const [userType, setUserType] = useState('student'); // student or company
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar */}
        <div className={`bg-light p-3 vh-100 sidebar ${collapsed ? 'collapsed' : ''}`} style={{ transition: '0.3s', width: collapsed ? '80px' : '250px' }}>
          <button className="btn btn-primary mb-3" onClick={toggleSidebar}>
            {collapsed ? '👉' : '👈'}
          </button>
          <h4 className="text-center">{collapsed ? '📋' : 'Dashboard'}</h4>
          <ul className="list-group">
  {userType === 'student' ? (
    <>
      <Link to="/dashboard/my-courses" className="list-group-item list-group-item-action">📚 {!collapsed && 'My Courses'}</Link>
      <Link to="/dashboard/applied-gigs" className="list-group-item list-group-item-action">💼 {!collapsed && 'Applied Gigs'}</Link>
      <Link to="/dashboard/profile" className="list-group-item list-group-item-action">👤 {!collapsed && 'Profile'}</Link>
    </>
  ) : (
    <>
      <Link to="/dashboard/post-gig" className="list-group-item list-group-item-action">📝 {!collapsed && 'Post Gig'}</Link>
      <Link to="/dashboard/my-gigs" className="list-group-item list-group-item-action">🗂️ {!collapsed && 'My Gigs'}</Link>
      <Link to="/dashboard/profile" className="list-group-item list-group-item-action">👤 {!collapsed && 'Profile'}</Link>
    </>
  )}
</ul>
        </div>

        {/* Main content */}
        <div className="col p-4">
          <Routes>
            {userType === 'student' ? (
              <>
                <Route path="my-courses" element={<MyCourses />} />
                <Route path="applied-gigs" element={<AppliedGigs />} />
                <Route path="profile" element={<ProfileSettings />} />
              </>
            ) : (
              <>
                <Route path="post-gig" element={<PostGig />} />
                <Route path="my-gigs" element={<MyGigs />} />
                <Route path="profile" element={<ProfileSettings />} />
              </>
            )}
          </Routes>
        </div>

      </div>
    </div>
  );
};
export default Dashboard;
