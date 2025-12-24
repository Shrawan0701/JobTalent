import React, { useEffect, useState } from 'react';
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

  if (loading) return <p className="p-4">Loading profile...</p>;

  if (!profile) return <p className="p-4">No profile found.</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-3">My Profile</h2>
      <div className="card p-3">
        <p><strong>Headline:</strong> {profile.headline || 'Not set'}</p>
        <p><strong>Location:</strong> {profile.location || 'Not set'} </p>
        <p><strong>Availability:</strong> {profile.availability || 'Not set'}</p>
      </div>
    </div>
  );
}
