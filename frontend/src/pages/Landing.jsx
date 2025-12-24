import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/landing.css";

export default function Landing() {
  return (
    <div className="landing-container">
      {/* ================= NAVBAR ================= */}
      <header className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            Curson
          </Link>

          <nav className="navbar-nav ms-auto d-flex align-items-center">
            <Link className="nav-link me-3" to="/login">
              Login
            </Link>
            <Link to="/signup" className="btn btn-nav-signup">
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="hero-section">
        <div className="container text-center">
          <h1>
            Find Your Dream Job or Perfect Talent
          </h1>
          <p>
            Connect with skilled professionals and verified employers on a
            trusted global hiring platform. Your next opportunity awaits.
          </p>
          <div className="d-flex justify-content-center gap-3 hero-buttons flex-wrap">
            <Link
              to="/signup?role=talent"
              className="btn btn-hero-primary btn-lg"
            >
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

      {/* ================= STATS ================= */}
      <section className="stats-section">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-6">
              <div className="stat-card">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Active Jobs</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card">
                <div className="stat-number">200K+</div>
                <div className="stat-label">Professionals</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card">
                <div className="stat-number">15K+</div>
                <div className="stat-label">Companies</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card">
                <div className="stat-number">98%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOR TALENT ================= */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">For Talent</span>
            <h2 className="section-title">Everything You Need to Succeed</h2>
            <p className="section-subtitle">
              Powerful tools and features designed to accelerate your career growth
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h5 className="feature-title">Smart Job Discovery</h5>
              <p className="feature-text">
                Discover global and local job opportunities tailored to
                your skills, experience, and preferences with our AI-powered matching algorithm.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h5 className="feature-title">Skill Verification</h5>
              <p className="feature-text">
                Validate your skills through comprehensive assessments and improve
                visibility with verified badges that employers trust.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h5 className="feature-title">Application Tracking</h5>
              <p className="feature-text">
                Track applications, interviews, and employer responses
                from a single intuitive dashboard with real-time updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOR EMPLOYERS ================= */}
      <section className="employer-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">For Employers</span>
            <h2 className="section-title">Hire Smarter, Not Harder</h2>
            <p className="section-subtitle">
              Streamline your hiring process with advanced tools and verified talent
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <h5 className="feature-title">Easy Job Posting</h5>
              <p className="feature-text">
                Create job listings in minutes and reach qualified candidates
                across multiple locations with intelligent distribution.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <h5 className="feature-title">Advanced Candidate Search</h5>
              <p className="feature-text">
                Search and filter candidates by skills, experience,
                availability, and verification status with powerful filters.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h5 className="feature-title">Direct Communication</h5>
              <p className="feature-text">
                Communicate directly with candidates and manage your entire hiring
                pipeline efficiently from one centralized platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Pricing</span>
            <h2 className="section-title">Choose Your Plan</h2>
            <p className="section-subtitle">
              Transparent pricing with no hidden fees. Start free, upgrade anytime.
            </p>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="card">
                <div className="pricing-header">
                  <h5 className="pricing-name">Talent Premium</h5>
                  <div className="pricing-price">
                    ₹9
                    <span className="pricing-period">/ month</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  <li>Skill verification badges</li>
                  <li>Profile boost & priority visibility</li>
                  <li>Advanced job alerts</li>
                  <li>Application insights & analytics</li>
                  <li>Resume builder tools</li>
                  <li>24/7 priority support</li>
                </ul>
                <Link 
                  to="/signup?role=talent" 
                  className="btn btn-primary w-100"
                >
                  <span>Get Started</span>
                </Link>
              </div>
            </div>

            <div className="pricing-card featured">
              <div className="pricing-badge">Most Popular</div>
              <div className="card">
                <div className="pricing-header">
                  <h5 className="pricing-name">Employer Access</h5>
                  <div className="pricing-price">
                    Custom
                  </div>
                </div>
                <ul className="pricing-features">
                  <li>Unlimited job postings</li>
                  <li>Advanced candidate search filters</li>
                  <li>Direct messaging & scheduling</li>
                  <li>Analytics dashboard & reports</li>
                  <li>Team collaboration tools</li>
                  <li>Dedicated account manager</li>
                </ul>
                <Link 
                  to="/signup?role=employer" 
                  className="btn btn-primary w-100"
                >
                  <span>Contact Sales</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content text-center">
            <h2 className="cta-title">Ready to Transform Your Career?</h2>
            <p className="cta-subtitle">
              Join thousands of professionals and employers building their future on JobTalent.
              Sign up today and discover your next opportunity.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
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
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h5>JobTalent</h5>
              <p className="mb-0">
                Connecting talent with opportunity worldwide.
              </p>
            </div>
            <div className="footer-section">
              <h5>For Talent</h5>
              <ul className="footer-links">
                <li><Link to="/jobs">Find Jobs</Link></li>
                <li><Link to="/companies">Browse Companies</Link></li>
                <li><Link to="/resources">Career Resources</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>For Employers</h5>
              <ul className="footer-links">
                <li><Link to="/post-job">Post a Job</Link></li>
                <li><Link to="/candidates">Search Candidates</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Company</h5>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="mb-0">© 2024 JobTalent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}