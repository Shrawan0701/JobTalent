import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/landing.css";

export default function Landing() {
  return (
    <div className="landing-container">
      {/* ================= NAVBAR ================= */}
      <header className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            JobTalent
          </Link>

          <nav className="navbar-nav ms-auto align-items-center">
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="ms-2" to="/signup">
              <button className="btn btn-primary btn-sm">Get Started</button>
            </Link>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="hero-section">
        <div className="container text-center">
          <h1 className="mb-4">
            Find Jobs Faster. <br /> Hire Talent Smarter.
          </h1>
          <p className="mb-5">
            A global hiring platform connecting skilled talent with verified
            employers across remote and local roles.
          </p>

          <div className="d-flex justify-content-center gap-3">
            <Link to="/signup?role=talent" className="btn btn-primary btn-lg">
              Find Jobs
            </Link>
            <Link
              to="/signup?role=employer"
              className="btn btn-outline-primary btn-lg"
            >
              Hire Talent
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TALENT FEATURES ================= */}
      <section className="features-section">
        <div className="container">
          <h2 className="text-center mb-5">For Talent</h2>

          <div className="row">
            <div className="col-12">
              <div className="card feature-group-card">
                <div className="card-body">
                  <div className="feature-item">
                    <h5 className="feature-title">Smart Job Discovery</h5>
                    <p className="feature-text">
                      Discover global and local jobs tailored to your skills,
                      preferences, and availability.
                    </p>
                  </div>

                  <div className="feature-item">
                    <h5 className="feature-title">Skill Verification</h5>
                    <p className="feature-text">
                      Validate your skills through assessments and stand out to
                      recruiters with verified badges.
                    </p>
                  </div>

                  <div className="feature-item">
                    <h5 className="feature-title">Application Tracking</h5>
                    <p className="feature-text">
                      Track job applications, interviews, and employer responses
                      from one dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EMPLOYER FEATURES ================= */}
      <section className="employer-section">
        <div className="container">
          <h2 className="text-center mb-5">For Employers</h2>

          <div className="row">
            <div className="col-12">
              <div className="card feature-group-card">
                <div className="card-body">
                  <div className="feature-item">
                    <h5 className="feature-title">Easy Job Posting</h5>
                    <p className="feature-text">
                      Post jobs in minutes and reach qualified candidates across
                      multiple locations.
                    </p>
                  </div>

                  <div className="feature-item">
                    <h5 className="feature-title">Advanced Candidate Search</h5>
                    <p className="feature-text">
                      Filter candidates by skills, experience, verification
                      status, and availability.
                    </p>
                  </div>

                  <div className="feature-item">
                    <h5 className="feature-title">Direct Communication</h5>
                    <p className="feature-text">
                      Communicate directly with candidates and manage the hiring
                      pipeline efficiently.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="pricing-section">
        <div className="container">
          <h2 className="text-center mb-5">Transparent Pricing</h2>

          <div className="row">
            <div className="col-12">
              <div className="card feature-group-card">
                <div className="card-body">
                  <div className="feature-item">
                    <h5 className="feature-title">Talent Premium</h5>
                    <p className="feature-text">
                      Skill verification, profile boost, and priority visibility
                      for ₹9 per month.
                    </p>
                  </div>

                  <div className="feature-item">
                    <h5 className="feature-title">Employer Access</h5>
                    <p className="feature-text">
                      Post jobs, search candidates, and manage hiring with no
                      upfront cost.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta-section text-center">
        <div className="container">
          <h2 className="mb-4">Ready to get started?</h2>
          <p className="mb-4">
            Join thousands of professionals and employers using JobTalent.
          </p>

          <div className="d-flex justify-content-center gap-3">
            <Link to="/signup?role=talent" className="btn btn-light btn-lg">
              Join as Talent
            </Link>
            <Link
              to="/signup?role=employer"
              className="btn btn-outline-light btn-lg"
            >
              Join as Employer
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center">
        <div className="container">
          <p className="mb-0">© 2024 JobTalent. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
