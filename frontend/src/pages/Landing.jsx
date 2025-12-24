import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/landing.css';

export default function Landing() {
  return (
    <div className="landing-container">
      <header className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            🚀 JobTalent
          </Link>
          <nav className="navbar-nav ms-auto">
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link ms-2" to="/signup">
              <button className="btn btn-primary btn-sm">Signup</button>
            </Link>
          </nav>
        </div>
      </header>

      <section className="hero-section py-5 bg-light">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-4">
            Find Your Dream Job or Perfect Talent
          </h1>
          <p className="lead mb-5 text-muted">
            Connect with top talent and employers on the world's most trusted job platform
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/signup?role=talent" className="btn btn-primary btn-lg">
              🎯 Find Jobs
            </Link>
            <Link to="/signup?role=employer" className="btn btn-outline-primary btn-lg">
              🏢 Hire Talent
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">For Talent</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">📋 Smart Job Discovery</h5>
                  <p className="card-text">
                    AI-powered job recommendations based on your skills and preferences
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">✅ Skill Verification</h5>
                  <p className="card-text">
                    Get verified badges for your skills and stand out to employers
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">📊 Application Tracking</h5>
                  <p className="card-text">
                    Track all your applications and interview progress in one place
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="employer-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">For Employers</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">💼 Easy Hiring</h5>
                  <p className="card-text">
                    Post jobs and find qualified candidates instantly
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">🔍 Smart Search</h5>
                  <p className="card-text">
                    Find the perfect candidate with advanced filters and matching
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">📞 Direct Messaging</h5>
                  <p className="card-text">
                    Connect directly with candidates and manage hiring pipeline
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Transparent Pricing</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Talent Premium</h5>
                  <p className="h3 text-primary">₹9<span className="fs-6">/month</span></p>
                  <ul className="list-unstyled">
                    <li>✓ Skill verification badges</li>
                    <li>✓ Profile boosts</li>
                    <li>✓ Priority in job feeds</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm border-primary">
                <div className="card-body">
                  <h5 className="card-title">Employer Pro</h5>
                  <p className="h3 text-primary">Custom</p>
                  <ul className="list-unstyled">
                    <li>✓ Featured job postings</li>
                    <li>✓ Unlimited applications</li>
                    <li>✓ Direct messaging</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section py-5 bg-primary text-white text-center">
        <div className="container">
          <h2 className="mb-4">Ready to get started?</h2>
          <p className="mb-4 lead">Join thousands of talents and employers on JobTalent</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/signup?role=talent" className="btn btn-light btn-lg">
              Join as Talent
            </Link>
            <Link to="/signup?role=employer" className="btn btn-outline-light btn-lg">
              Join as Employer
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white py-4 text-center">
        <div className="container">
          <p className="mb-0">
            © 2024 JobTalent. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
