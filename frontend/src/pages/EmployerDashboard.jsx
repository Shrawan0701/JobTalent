import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import * as jobService from '../services/jobService.js';
import * as applicationService from '../services/applicationService.js';
import '../assets/css/dashboard.css';

export default function EmployerDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('jobs');
  const [showPostForm, setShowPostForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    jobType: 'full-time',
    skills: '',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobService.getJobs({ source: 'direct' });
      setJobs(response.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (jobId) => {
    try {
      const response = await applicationService.getApplicationsForJob(jobId);
      setApplications(response.applications || []);
      setSelectedJobId(jobId);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      await jobService.createJob({
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()),
      });
      alert('Job posted successfully!');
      setFormData({
        title: '',
        description: '',
        location: '',
        salary: '',
        jobType: 'full-time',
        skills: '',
      });
      setShowPostForm(false);
      fetchJobs();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to post job');
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
              className={"nav-link" + (activeTab === 'jobs' ? ' active' : '')}
              onClick={() => setActiveTab('jobs')}
            >
              📋 My Jobs
            </button>
          </li>
          <li className="nav-item">
            <button
              className={"nav-link" + (activeTab === 'applications' ? ' active' : '')}
              onClick={() => setActiveTab('applications')}
            >
              👥 Applications
            </button>
          </li>
          <li className="nav-item ms-auto">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setShowPostForm(!showPostForm)}
            >
              ➕ Post Job
            </button>
          </li>
        </ul>

        {showPostForm && (
          <div className="card mb-4 p-4">
            <h4 className="mb-3">Post a New Job</h4>
            <form onSubmit={handlePostJob}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Job Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Salary</label>
                  <input
                    type="text"
                    className="form-control"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Job Type</label>
                  <select
                    className="form-select"
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleInputChange}
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Skills (comma separated)</label>
                <input
                  type="text"
                  className="form-control"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="e.g. React, Node.js, PostgreSQL"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Post Job
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setShowPostForm(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div>
            <h2 className="mb-4">My Job Postings</h2>
            {loading ? (
              <p>Loading...</p>
            ) : jobs.length === 0 ? (
              <p className="text-muted">No job postings yet</p>
            ) : (
              <div className="row">
                {jobs.map((job) => (
                  <div key={job.id} className="col-md-6 mb-4">
                    <div className="card shadow-sm h-100">
                      <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <p className="card-text text-muted">{job.location}</p>
                        <p className="card-text">{job.salary || 'Salary not mentioned'}</p>
                        <p className="card-text small">{job.description?.substring(0, 100)}...</p>
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => {
                            setActiveTab('applications');
                            fetchApplications(job.id);
                          }}
                        >
                          View Applications
                        </button>
                        <button className="btn btn-danger btn-sm ms-2">Delete</button>
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
            <h2 className="mb-4">Applications for Selected Job</h2>
            {selectedJobId ? (
              loading ? (
                <p>Loading...</p>
              ) : applications.length === 0 ? (
                <p className="text-muted">No applications yet</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Applied On</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.id}>
                          <td>{app.first_name} {app.last_name}</td>
                          <td>{app.email}</td>
                          <td>
                            <span className="badge bg-info">{app.status}</span>
                          </td>
                          <td>{new Date(app.created_at).toLocaleDateString()}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary">
                              Review
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              <p className="text-muted">Select a job to view applications</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
