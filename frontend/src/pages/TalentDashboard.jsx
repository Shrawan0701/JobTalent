import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import * as jobService from '../services/jobService.js';
import * as applicationService from '../services/applicationService.js';
import '../assets/css/dashboard.css';
import { Link } from 'react-router-dom';

export default function TalentDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('discover');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'discover') {
        const response = await jobService.getJobs({});
        setJobs(response.jobs || []);
      } else if (activeTab === 'applications') {
        const response = await applicationService.getMyApplications();
        setApplications(response.applications || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await applicationService.applyToJob(jobId);
      alert('Applied successfully!');
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to apply');
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <span className="navbar-brand fw-bold">🚀 JobTalent</span>
          <div className="ms-auto">
            <span className="me-3 text-muted">{user?.email}</span>
            <button className="btn btn-outline-danger btn-sm" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={"nav-link" + (activeTab === 'discover' ? ' active' : '')}
              onClick={() => setActiveTab('discover')}
            >
              🔍 Discover Jobs
            </button>
          </li>
          <li className="nav-item">
            <button
              className={"nav-link" + (activeTab === 'applications' ? ' active' : '')}
              onClick={() => setActiveTab('applications')}
            >
              📋 My Applications
            </button>
          </li>
         <li className="nav-item">
  <Link to="/talent/profile" className="nav-link">
    👤 Profile
  </Link>
</li>
        </ul>

        {activeTab === 'discover' && (
          <div>
            <h2 className="mb-4">Discover Jobs</h2>
            {loading ? (
              <p>Loading...</p>
            ) : jobs.length === 0 ? (
              <p className="text-muted">No jobs found</p>
            ) : (
              <div className="row">
                {jobs.map((job) => (
                  <div key={job.id} className="col-md-6 mb-4">
                    <div className="card shadow-sm h-100">
                      <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <p className="card-text text-muted">{job.company_name}</p>
                        <p className="card-text">{job.location}</p>
                        <p className="card-text">{job.salary || 'Salary not mentioned'}</p>
                        <p className="card-text small">{job.description?.substring(0, 100)}...</p>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleApply(job.id)}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'applications' && (
          <div>
            <h2 className="mb-4">My Applications</h2>
            {loading ? (
              <p>Loading...</p>
            ) : applications.length === 0 ? (
              <p className="text-muted">No applications yet</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Applied On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id}>
                        <td>{app.job_title}</td>
                        <td>{app.company_name}</td>
                        <td>
                          <span className={"badge bg-" + (app.status === 'applied' ? 'info' : 'success')}>
                            {app.status}
                          </span>
                        </td>
                        <td>{new Date(app.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
