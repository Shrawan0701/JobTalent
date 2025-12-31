import '../../assets/css/employer-boarding.css';

export default function StepCompanyDetails({ data, update, next, back }) {
  const isValid =
    data.industry?.trim() &&
    data.companySize?.trim() &&
    data.location?.trim() &&
    data.description?.trim();

  return (
    <div className="employer-onboarding-wrapper">
      <div className="employer-onboarding-card">
        <span className="onboarding-step">Step 2 of 4</span>
        <h2>Company Details</h2>

        <div className="onboarding-field">
          <label>Industry *</label>
          <input
            placeholder="e.g. Fintech, SaaS, Healthcare"
            value={data.industry || ''}
            onChange={(e) => update({ industry: e.target.value })}
            required
          />
        </div>

        <div className="onboarding-field">
          <label>Company Size *</label>
          <input
            placeholder="e.g. 1–10, 11–50, 50+"
            value={data.companySize || ''}
            onChange={(e) => update({ companySize: e.target.value })}
            required
          />
        </div>

        <div className="onboarding-field">
          <label>Location *</label>
          <input
            placeholder="e.g. Bengaluru, Remote"
            value={data.location || ''}
            onChange={(e) => update({ location: e.target.value })}
            required
          />
        </div>

        <div className="onboarding-field">
          <label>Description *</label>
          <textarea
            placeholder="Briefly describe what your company does"
            value={data.description || ''}
            onChange={(e) => update({ description: e.target.value })}
            required
          />
        </div>

        <div className="onboarding-actions">
          <button className="onboarding-secondary-btn" onClick={back}>
            Back
          </button>
          <button
            className="onboarding-primary-btn"
            onClick={next}
            disabled={!isValid}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
