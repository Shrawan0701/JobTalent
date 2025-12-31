import { useEffect, useState } from 'react';
import {
  getEmployerProfile,
  updateEmployerProfile
} from '../../services/employerService';
import '../../assets/css/employerProfile.css';

export default function EmployerProfile() {
  const [company, setCompany] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const res = await getEmployerProfile();
    setCompany(res.data);
    setForm(res.data);
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await updateEmployerProfile(form);
    setEditing(false);
    loadProfile();
  };

  if (loading) return <div className="profile-shell">Loading…</div>;
  if (!company) return <div className="profile-shell">No profile found</div>;

  return (
    <div className="profile-shell">
      <div className="profile-card">

        {/* HEADER CARD */}
        <div className="profile-header-card">
          <div className="profile-header-left">
            <div className="profile-logo">
              {company.logo_url
                ? <img src={company.logo_url} alt={company.name} />
                : <span>{company.name?.[0]?.toUpperCase()}</span>
              }
            </div>

            <div>
              {editing ? (
                <input
                  className="profile-title-input"
                  name="name"
                  placeholder="Your company name"
                  value={form.name || ''}
                  onChange={handleChange}
                />
              ) : (
                <h2>{company.name || 'Unnamed Company'}</h2>
              )}

              
            </div>
          </div>

          <button className="edit-btn" onClick={() => setEditing(!editing)}>
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* DETAILS GRID */}
        <div className="profile-section">
          <div className="profile-grid">

            <Field
              label="Company Website"
              hint="Public website or landing page"
              editing={editing}
              name="website"
              placeholder="https://yourcompany.com"
              value={editing ? form.website : company.website}
              onChange={handleChange}
            />

            <Field
              label="Industry"
              hint="E.g. SaaS, Fintech, Healthcare"
              editing={editing}
              name="industry"
              placeholder="Technology"
              value={editing ? form.industry : company.industry}
              onChange={handleChange}
            />

            <Field
              label="Company Size"
              hint="Approximate team size"
              editing={editing}
              name="company_size"
              placeholder="1–10, 11–50, 51–200"
              value={editing ? form.company_size : company.company_size}
              onChange={handleChange}
            />

            <Field
              label="Location"
              hint="Headquarters or main office"
              editing={editing}
              name="location"
              placeholder="Bangalore, India"
              value={editing ? form.location : company.location}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="profile-section">
          <label>Description</label>
          <p className="hint">Short overview of what your company does</p>

          {editing ? (
            <textarea
              name="description"
              placeholder="We build products that help teams hire faster…"
              value={form.description || ''}
              onChange={handleChange}
            />
          ) : (
            <p className="description-text">
              {company.description || 'No description provided'}
            </p>
          )}
        </div>

        {/* ACTION */}
        {editing && (
          <div className="profile-actions">
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, hint, editing, value, name, placeholder, onChange }) {
  return (
    <div className="field">
      <label>{label}</label>
      <span className="hint">{hint}</span>

      {editing ? (
        <input
          name={name}
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
        />
      ) : (
        <p>{value || '—'}</p>
      )}
    </div>
  );
}
