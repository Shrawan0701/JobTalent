import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepCompanyInfo from '../../components/onboarding/StepCompanyInfo';
import StepCompanyDetails from '../../components/onboarding/StepCompanyDetails';
import StepVerification from '../../components/onboarding/StepVerification';
import StepReview from '../../components/onboarding/StepReview';
import '../../assets/css/onboarding.css';

export default function EmployerOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [data, setData] = useState({
  name: '',          // 🔥 REQUIRED
  website: '',
  description: '',
  industry: '',
  company_size: '',
  location: '',
  logo_url: ''
});


  const update = (values) => setData(prev => ({ ...prev, ...values }));
  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div className="onboarding-progress">Step {step} of 4</div>

        {step === 1 && <StepCompanyInfo data={data} update={update} next={next} />}
        {step === 2 && <StepCompanyDetails data={data} update={update} next={next} back={back} />}
        {step === 3 && <StepVerification data={data} update={update} next={next} back={back} />}
        {step === 4 && <StepReview data={data} back={back} />}
      </div>
    </div>
  );
}
