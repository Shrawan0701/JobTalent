import { useNavigate } from 'react-router-dom';
import { saveEmployerProfile } from '../../services/employerService';
import '../../assets/css/employer-boarding.css';

export default function StepReview({ data, back }) {
  const navigate = useNavigate();

  const submit = async () => {
    await saveEmployerProfile({
      name: data.name,
      website: data.website,
      description: data.description,
      industry: data.industry,
      company_size: data.companySize,
      location: data.location,
      logo_url: data.logoUrl || null
    });

    navigate('/employer/dashboard');
  };

  return (
    <div className="employer-onboarding-wrapper">
      <div className="employer-onboarding-card">
        <span className="onboarding-step">Step 4 of 4</span>
        <h2>Review & Finish</h2>

        <ul className="review-list">
          <li><strong>Company:</strong> {data.name}</li>
          <li><strong>Website:</strong> {data.website}</li>
          <li><strong>Industry:</strong> {data.industry}</li>
          <li><strong>Company Size:</strong> {data.companySize}</li>
          <li><strong>Location:</strong> {data.location}</li>
        </ul>

        <div className="onboarding-actions">
          <button className="onboarding-secondary-btn" onClick={back}>
            Back
          </button>
          <button className="onboarding-primary-btn" onClick={submit}>
            Finish Setup
          </button>
        </div>
      </div>
    </div>
  );
}
