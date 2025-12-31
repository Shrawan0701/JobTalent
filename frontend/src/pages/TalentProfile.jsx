import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as profileService from '../services/profileService.js';
import { useNavigate } from 'react-router-dom';

export default function TalentProfile() {
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = React.useRef(null);
  const resumeInputRef = React.useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await profileService.getTalentProfile();
        console.log('PROFILE FROM API:', res.profile);
        setProfile(res.profile);
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="container-premium">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-container">
        <div className="container-premium">
          <div className="empty-state">
            <svg className="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>No profile found</h3>
            <p>Unable to load your profile information</p>
          </div>
        </div>
      </div>
    );
  }


const handlePhotoUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const res = await profileService.uploadProfilePhoto(file);

  setProfile((prev) => ({
    ...prev,
    profile_picture_url: res.profile_picture_url
  }));
};
const calculateCompletion = (profile) => {
  if (!profile) return 0;

  const fields = [
    profile.desired_role,
    profile.city,
    profile.experience,
    profile.education,
    profile.resume,
    profile.skills?.length,
    profile.profile_picture_url,
  ];
  
  return Math.round(
    (fields.filter(Boolean).length / fields.length) * 100
  );
};

const completion = calculateCompletion(profile);


  return (
    <div className="profile-container">
      <div className="container-premium">
        {/* Back Navigation */}
        <div className="profile-nav">
          <Link to="/talent/dashboard" className="back-link">
            <svg className="back-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        {/* Profile Header */}
        <div className="profile-header">
  
<div
  className="profile-avatar-large"
  onClick={() => fileInputRef.current.click()}
>
  {profile.profile_picture_url ? (
    <img
      src={profile.profile_picture_url}
      className="profile-avatar-img"
      alt="Profile"
    />
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )}

  {/* 🔥 ADD THIS HERE */}
  <div className="avatar-overlay">Change</div>

  <input
    type="file"
    ref={fileInputRef}
    hidden
    accept="image/*"
    onChange={async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const res = await profileService.uploadProfilePhoto(file);
      setProfile((prev) => ({
        ...prev,
        profile_picture_url: res.profile_picture_url,
      }));
    }}
  />
</div>


  <div className="profile-header-content">
    <h1 className="profile-name">
      {profile.desired_role || 'Talent Profile'}
    </h1>
    <p className="profile-tagline">
      {profile.city} • {profile.experience}
    </p>
  </div>
</div>


        {/* Profile Content */}
        <div className="profile-grid">
          {/* Main Info Card */}
          <div className="profile-card profile-card-main">
            <div className="card-header">
              <div className="card-header-content">
                <svg className="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2 className="card-title">Professional Information</h2>
              </div>
            </div>
            
            <div className="card-content">
              <div className="profile-field">
                <label className="field-label">Desired Role</label>
                <div className="field-value">
                  {profile.desired_role || (
                    <span className="field-empty">
                      <svg className="empty-icon-sm" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      Not set
                    </span>
                  )}
                </div>
              </div>

              <div className="profile-field">
                <label className="field-label">Location</label>
                <div className="field-value field-with-icon">
                  <svg className="field-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                  </svg>
                  {profile.city || (
                    <span className="field-empty">
                      <svg className="empty-icon-sm" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      Not set
                    </span>
                  )}
                </div>
              </div>

              <div className="profile-field">
                <label className="field-label">Experience</label>
                <div className="field-value">
                  {profile.experience || (
                    <span className="field-empty">
                      <svg className="empty-icon-sm" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      Not set
                    </span>
                  )}
                </div>
              </div>

              <div className="profile-field">
                <label className="field-label">Education</label>
                <div className="field-value">
                  {profile.education || (
                    <span className="field-empty">
                      <svg className="empty-icon-sm" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      Not set
                    </span>
                  )}
                </div>
              </div>

              <div className="profile-field">
  <label className="field-label">Skills</label>
  <div className="field-value">
    {profile.skills?.length ? (
      <div className="skills-list">
        {profile.skills.map((skill, index) => (
          <span key={index} className="skill-chip">
            {skill}
          </span>
        ))}
      </div>
    ) : (
      <span className="field-empty">Not set</span>
    )}
  </div>
</div>
    <div className="profile-field">
                <label className="field-label">Resume</label>
                <div className="field-value">
                  {profile.resume ? (
                    <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="resume-link">
                      <svg className="field-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      View Resume
                    </a>
                  ) : (
                    <span className="field-empty">
                      <svg className="empty-icon-sm" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      Not uploaded
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Card */}
          <div className="profile-card profile-card-secondary">
            <div className="card-header">
              <div className="card-header-content">
                <svg className="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2 className="card-title">Quick Actions</h2>
              </div>
            </div>
            
            <div className="card-content">
              <div className="action-list">
                <button
  className="action-item"
  onClick={() => navigate('/profile/edit')}
>
                  <div className="action-icon-wrapper">
                    <svg className="action-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 5H6C5.46957 5 4.96086 5.21071 4.58579 5.58579C4.21071 5.96086 4 6.46957 4 7V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V13M17.5 3.5C17.8978 3.1022 18.4374 2.87868 19 2.87868C19.5626 2.87868 20.1022 3.1022 20.5 3.5C20.8978 3.8978 21.1213 4.43739 21.1213 5C21.1213 5.56261 20.8978 6.1022 20.5 6.5L12 15H9V12L17.5 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="action-content">
                    <div className="action-title">Edit Profile</div>
                    <div className="action-description">Update your information</div>
                  </div>
                </button>

              <button
  className="action-item"
  onClick={() => resumeInputRef.current.click()}
>


                  <div className="action-icon-wrapper">
                    <svg className="action-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="action-content">
                    <div className="action-title">Upload Resume</div>
                    <div className="action-description">Add your latest CV</div>
                  </div>
                </button>

               
              </div>
              <input
  type="file"
  ref={resumeInputRef}
  hidden
  accept="application/pdf"
  onChange={async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Only PDF resumes are allowed');
      return;
    }

    const res = await profileService.uploadResume(file);

    setProfile((prev) => ({
      ...prev,
      resume: res.resume
    }));
  }}
/>

            </div>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="profile-stats">
          
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-green">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-content">
             <div className="progress-bar-wrapper">
  <div
    className="progress-bar-fill"
    style={{ width: `${completion}%` }}
  />
</div>
              <div className="stat-label">Profile Completion</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}