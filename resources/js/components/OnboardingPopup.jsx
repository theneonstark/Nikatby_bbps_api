import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultData = {
  name: '', country: '', state: '', pincode: '', address: '',
  aadhar_card: null, pan_card: null, user_image: null,
  bank_name: '', ifsc_code: '', account_number: '', branch: ''
};

const OnboardingPopup = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(defaultData);
  const [errors, setErrors] = useState({});
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
    const updatedValue = files ? files[0] : value;

    setFormData(prev => ({
      ...prev,
      [name]: updatedValue,
    }));

    validateField(name, updatedValue);
  };

  const validateField = (name, value) => {
    let errorMsg = '';

    if (!value) {
      errorMsg = 'This field is required.';
    }

    setErrors(prev => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      ['name', 'country', 'state', 'pincode', 'address'].forEach(field => {
        if (!formData[field]) newErrors[field] = 'This field is required.';
      });
    } else if (step === 2) {
      ['aadhar_card', 'pan_card', 'user_image'].forEach(field => {
        if (!formData[field]) newErrors[field] = 'Please upload this file.';
      });
    } else if (step === 3) {
      ['bank_name', 'ifsc_code', 'account_number', 'branch'].forEach(field => {
        if (!formData[field]) newErrors[field] = 'This field is required.';
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveProgress = async () => {
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });
    await axios.post('/onboarding/save-step', data);
  };

  const handleNext = async () => {
    if (!validateStep()) return;
    await saveProgress();
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });

    await axios.post('/submit-onboarding-form', data);
    toast.success('Onboarding submitted successfully!');
    setTimeout(() => onClose(), 1500);
  };

  const renderInput = (label, name, type = 'text') => (
    <div className="mb-2">
      <input
        type={type}
        name={name}
        placeholder={label}
        value={type === 'file' ? undefined : formData[name]}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      {errors[name] && <p className="text-red-600 text-sm">{errors[name]}</p>}
    </div>
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <ToastContainer />
      <div className="bg-white p-6 w-full max-w-3xl rounded-xl relative">
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
          <>
            {renderInput('Name', 'name')}
            {renderInput('Country', 'country')}
            {renderInput('State', 'state')}
            {renderInput('Pincode', 'pincode')}
            {renderInput('Address', 'address')}
          </>
        )}

        {step === 2 && (
          <>
            {renderInput('Aadhar Card', 'aadhar_card', 'file')}
            {renderInput('PAN Card', 'pan_card', 'file')}
            {renderInput('User Image', 'user_image', 'file')}
          </>
        )}

        {step === 3 && (
          <>
            {renderInput('Bank Name', 'bank_name')}
            {renderInput('IFSC Code', 'ifsc_code')}
            {renderInput('Account Number', 'account_number')}
            {renderInput('Branch', 'branch')}
          </>
        )}

        <div className="mt-4 flex justify-between">
          {step > 1 && <button onClick={() => setStep(step - 1)} className="px-4 py-2 bg-gray-300 rounded">Back</button>}
          {step < 3 && (
            <button onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
          )}
          {step === 3 && (
            <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPopup;
