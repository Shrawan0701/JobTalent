import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import * as jobService from '../services/jobService.js';
import * as applicationService from '../services/applicationService.js';
import '../assets/css/dashboard.css';
import { Link, useNavigate } from 'react-router-dom';

export default function TalentDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('discover');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);

      if (activeTab === 'discover') {
        const res = await jobService.getJobs({});
        setJobs(res.jobs || []);
      }

      if (activeTab === 'applications') {
        const res = await applicationService.getMyApplications();
        setApplications(res.applications || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await applicationService.applyToJob(jobId);
      alert('Applied successfully!');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to apply');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* ================= NAVBAR ================= */}
      <nav className="navbar-premium">
        <div className="container-premium">
          <div className="navbar-content">
            {/* BRAND */}
            <div 
              className="brand-logo"
              onClick={() => setActiveTab('discover')}
            >
              <svg className="brand-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="brand-text">JobTalent</span>
            </div>

            {/* RIGHT NAV */}
            <div className="navbar-actions">
              <button
                className={`nav-btn ${activeTab === 'applications' ? 'nav-btn-active' : ''}`}
                onClick={() => setActiveTab('applications')}
              >
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Applications</span>
              </button>

              <div className="profile-dropdown">
                <button
                  className="profile-trigger"
                  onClick={() => setShowProfileMenu((p) => !p)}
                >
                  <div className="avatar">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="profile-label">Profile</span>
                  <svg className={`chevron ${showProfileMenu ? 'chevron-open' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {showProfileMenu && (
                  <div className="dropdown-content">
                    <Link
                      to="/talent/profile"
                      className="dropdown-link"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      View Profile
                    </Link>
                    <button
                      className="dropdown-link dropdown-danger"
                      onClick={handleLogout}
                    >
                      <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= CONTENT ================= */}
      <main className="main-content">
        <div className="container-premium">
          {/* ========= DISCOVER JOBS ========= */}
          {activeTab === 'discover' && (
            <div className="content-section">
              <div className="section-header">
                <div>
                  <h1 className="section-title">Discover Opportunities</h1>
                  <p className="section-subtitle">Find your next career move from top companies</p>
                </div>
                <div className="header-stats">
                  <span className="stat-badge">{jobs.length} Positions</span>
                </div>
              </div>

              {loading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading opportunities...</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="empty-state">
                  <svg className="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3>No positions available</h3>
                  <p>Check back soon for new opportunities</p>
                </div>
              ) : (
                <div className="jobs-grid">
                  {jobs.map((job, index) => (
                    <div key={job.id} className="job-card" style={{ animationDelay: `${index * 50}ms` }}>
                      <div className="job-header">
                        <div className="company-avatar">
                          {job.company_name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="job-header-info">
                          <h3 className="job-title">{job.title}</h3>
                          <p className="company-name">{job.company_name}</p>
                        </div>
                      </div>

                      <div className="job-details">
                        <div className="job-detail-item">
                          <svg className="detail-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                          </svg>
                          <span>{job.location}</span>
                        </div>

                        {job.salary && (
                          <div className="job-detail-item">
                            <svg className="detail-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="salary">{job.salary}</span>
                          </div>
                        )}
                      </div>

                      {job.description && (
                        <p className="job-description">
                          {job.description.substring(0, 120)}...
                        </p>
                      )}

                      <button
                        className="apply-btn"
                        onClick={() => handleApply(job.id)}
                      >
                        Apply Now
                        <svg className="btn-arrow" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========= MY APPLICATIONS ========= */}
          {activeTab === 'applications' && (
            <div className="content-section">
              <div className="section-header">
                <div>
                  <h1 className="section-title">My Applications</h1>
                  <p className="section-subtitle">Track your application progress</p>
                </div>
                <div className="header-stats">
                  <span className="stat-badge">{applications.length} Active</span>
                </div>
              </div>

              {loading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading applications...</p>
                </div>
              ) : applications.length === 0 ? (
                <div className="empty-state">
                  <svg className="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3>No applications yet</h3>
                  <p>Start applying to positions to see them here</p>
                </div>
              ) : (
                <div className="table-container">
                  <table className="applications-table">
                    <thead>
                      <tr>
                        <th>Position</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Applied</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.id}>
                          <td>
                            <div className="table-cell-primary">{app.job_title}</div>
                          </td>
                          <td>
                            <div className="table-cell-secondary">{app.company_name}</div>
                          </td>
                          <td>
                            <span className={`status-badge status-${app.status}`}>
                              {app.status}
                            </span>
                          </td>
                          <td>
                            <div className="table-cell-date">
                              {new Date(app.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}