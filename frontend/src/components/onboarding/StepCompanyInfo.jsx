import '../../assets/css/employer-boarding.css';
import { isValidWebsite } from '../../utils/validators';

export default function StepCompanyInfo({ data, update, next }) {
  const websiteValid = isValidWebsite(data.website);
  const nameValid = data.name?.trim();

  return (
    <div className="employer-onboarding-wrapper">
      <div className="employer-onboarding-card">
        <span className="onboarding-step">Step 1 of 4</span>
        <h2>Company Basics</h2>

        <div className="onboarding-field">
          <label>Company Name *</label>
          <input
            value={data.name || ''}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="Acme Technologies"
          />
        </div>

        <div className="onboarding-field">
          <label>Company Website *</label>
          <input
            value={data.website || ''}
            onChange={(e) => update({ website: e.target.value })}
            placeholder="https://acme.com"
          />

          {!websiteValid && data.website && (
            <span className="field-error">
              Enter a valid website URL (https://example.com)
            </span>
          )}
        </div>

        <button
          className="onboarding-primary-btn"
          disabled={!nameValid || !websiteValid}
          onClick={next}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
