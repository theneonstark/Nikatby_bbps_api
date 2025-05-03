// utils/axiosInstance.js


// components/OnboardingPopup.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';

const defaultData = {
  name: '', country: '', state: '', pincode: '', address: '',
  aadhar_card: null, pan_card: null, user_image: null,
  bank_name: '', ifsc_code: '', account_number: '', branch: ''
};

const OnboardingPopup = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(defaultData);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (open) {
      axios.get('/onboarding/me').then(res => {
        if (res.data) setFormData(res.data);
      });
    }
  }, [open]);

  useEffect(() => {
    setProgress(Math.floor(((step - 1) / 3) * 100));
  }, [step]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const saveProgress = async () => {
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });
    await axios.post('/onboarding/save-step', data);
  };

  const handleNext = async () => {
    await saveProgress();
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });
    await axios.post('/submit-onboarding-form', data);
    alert('Submitted Successfully');
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 w-full max-w-3xl rounded-xl">
        <div className="flex justify-between mb-4">
          <div className="text-xl font-bold">Onboarding Form</div>
          <button onClick={onClose}>✖</button>
        </div>
        <div className="mb-4 w-full bg-gray-200 rounded-full">
          <div className="h-2 bg-green-500 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex space-x-4 mb-4">
          <div className={step === 1 ? 'font-bold' : ''}>Basic Details</div>
          <div className={step === 2 ? 'font-bold' : ''}>Document Upload</div>
          <div className={step === 3 ? 'font-bold' : ''}>Account Details</div>
        </div>
        {step === 1 && (
          <div className="space-y-2">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
            <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
            <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          </div>
        )}
        {step === 2 && (
          <div className="space-y-2">
            <input type="file" name="aadhar_card" onChange={handleChange} />
            <input type="file" name="pan_card" onChange={handleChange} />
            <input type="file" name="user_image" onChange={handleChange} />
          </div>
        )}
        {step === 3 && (
          <div className="space-y-2">
            <input type="text" name="bank_name" placeholder="Bank Name" value={formData.bank_name} onChange={handleChange} />
            <input type="text" name="ifsc_code" placeholder="IFSC Code" value={formData.ifsc_code} onChange={handleChange} />
            <input type="text" name="account_number" placeholder="Account Number" value={formData.account_number} onChange={handleChange} />
            <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} />
          </div>
        )}
        <div className="mt-4 flex justify-between">
          {step > 1 && <button onClick={() => setStep(step - 1)}>Back</button>}
          {step < 3 && <button onClick={handleNext}>Next</button>}
          {step === 3 && <button onClick={handleSubmit}>Submit</button>}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPopup;