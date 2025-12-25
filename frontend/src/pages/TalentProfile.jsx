import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as profileService from '../services/profileService.js';

export default function TalentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await profileService.getTalentProfile();
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
          <div className="profile-avatar-large">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="profile-header-content">
            <h1 className="profile-name">My Professional Profile</h1>
            <p className="profile-tagline">Manage your career information</p>
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
                <label className="field-label">Professional Headline</label>
                <div className="field-value">
                  {profile.headline || (
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
                  {profile.location || (
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
                <label className="field-label">Availability Status</label>
                <div className="field-value">
                  {profile.availability ? (
                    <span className="availability-badge">
                      <span className="availability-dot"></span>
                      {profile.availability}
                    </span>
                  ) : (
                    <span className="field-empty">
                      <svg className="empty-icon-sm" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      Not set
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
                <button className="action-item">
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

                <button className="action-item">
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

                <button className="action-item">
                  <div className="action-icon-wrapper">
                    <svg className="action-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="action-content">
                    <div className="action-title">Settings</div>
                    <div className="action-description">Manage preferences</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-blue">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">0</div>
              <div className="stat-label">Active Applications</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-green">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">0%</div>
              <div className="stat-label">Profile Completion</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-purple">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.622 10.395C19.8719 10.8912 20.0027 11.4411 20.0027 12C20.0027 12.5589 19.8719 13.1088 19.622 13.605L21.447 15.43C21.6286 15.6116 21.7379 15.8537 21.7552 16.1125C21.7724 16.3713 21.6966 16.6261 21.541 16.831L19.916 19.169C19.7604 19.3739 19.5331 19.5172 19.2763 19.5725C19.0194 19.6278 18.7511 19.5915 18.518 19.47L16.353 18.388C15.673 18.885 14.914 19.272 14.104 19.53V21.875C14.104 22.1402 13.999 22.3946 13.8115 22.5821C13.624 22.7696 13.3696 22.8746 13.104 22.875H9.854C9.58879 22.8746 9.33442 22.7696 9.14691 22.5821C8.95941 22.3946 8.85437 22.1402 8.854 21.875V19.53C8.044 19.272 7.285 18.885 6.605 18.388L4.44 19.47C4.20693 19.5915 3.93857 19.6278 3.68173 19.5725C3.42489 19.5172 3.19758 19.3739 3.042 19.169L1.417 16.831C1.26143 16.6261 1.18561 16.3713 1.20285 16.1125C1.22009 15.8537 1.32937 15.6116 1.511 15.43L3.336 13.605C3.08611 13.1088 2.9553 12.5589 2.9553 12C2.9553 11.4411 3.08611 10.8912 3.336 10.395L1.511 8.57C1.32937 8.38837 1.22009 8.14626 1.20285 7.88748C1.18561 7.62869 1.26143 7.37391 1.417 7.169L3.042 4.831C3.19758 4.62609 3.42489 4.48281 3.68173 4.42752C3.93857 4.37224 4.20693 4.40854 4.44 4.53L6.605 5.612C7.285 5.115 8.044 4.728 8.854 4.47V2.125C8.85437 1.85978 8.95941 1.60542 9.14691 1.41791C9.33442 1.23041 9.58879 1.12537 9.854 1.125H13.104C13.3696 1.12537 13.624 1.23041 13.8115 1.41791C13.999 1.60542 14.104 1.85978 14.104 2.125V4.47C14.914 4.728 15.673 5.115 16.353 5.612L18.518 4.53C18.7511 4.40854 19.0194 4.37224 19.2763 4.42752C19.5331 4.48281 19.7604 4.62609 19.916 4.831L21.541 7.169C21.6966 7.37391 21.7724 7.62869 21.7552 7.88748C21.7379 8.14626 21.6286 8.38837 21.447 8.57L19.622 10.395Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">New</div>
              <div className="stat-label">Profile Status</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}