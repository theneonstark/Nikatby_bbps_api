// resources/js/components/OnboardingPopup.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import { router } from '@inertiajs/react';

const defaultData = {
  name: '', country: '', state: '', pincode: '', address: '',
  aadhar_card: null, pan_card: null, user_image: null,
  bank_name: '', ifsc_code: '', account_number: '', branch: ''
};

const OnboardingPopup = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(defaultData);

  useEffect(() => {
    if (open) {
      axios.get('/onboardingUser').then(res => {
        if (res.data) {
          setFormData(prev => ({
            ...prev,
            ...res.data
          }));
        }
      });
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
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
    try{
      let res = await axios.post('/submit-onboarding-form', data);
      onClose();
      let url = res?.data?.redirect;
      router.visit(url)
    }catch(err){
      console.log(err);
      
    }

  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-full max-w-3xl rounded-xl shadow-xl">
        <div className="flex justify-between mb-4">
          <div className="text-xl font-bold">Onboarding Form</div>
          <button onClick={onClose} className="text-gray-600">✖</button>
        </div>

        <div className="mb-4 w-full bg-gray-200 rounded-full">
          <div
            className="h-2 bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        <div className="flex space-x-4 mb-6 text-sm font-semibold">
          <div className={step === 1 ? 'text-blue-600' : 'text-gray-500'}>1. Basic Details</div>
          <div className={step === 2 ? 'text-blue-600' : 'text-gray-500'}>2. Document Upload</div>
          <div className={step === 3 ? 'text-blue-600' : 'text-gray-500'}>3. Account Details</div>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-2 gap-4">
            <input name="name" placeholder="Name" value={formData.name || ''} onChange={handleChange} className="input" />
            <input name="country" placeholder="Country" value={formData.country || ''} onChange={handleChange} className="input" />
            <input name="state" placeholder="State" value={formData.state || ''} onChange={handleChange} className="input" />
            <input name="pincode" placeholder="Pincode" value={formData.pincode || ''} onChange={handleChange} className="input" />
            <textarea name="address" placeholder="Address" value={formData.address || ''} onChange={handleChange} className="input col-span-2" />
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 gap-4">
            <input type="file" name="aadhar_card" onChange={handleChange} className="input" />
            <input type="file" name="pan_card" onChange={handleChange} className="input" />
            <input type="file" name="user_image" onChange={handleChange} className="input" />
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-2 gap-4">
            <input name="bank_name" placeholder="Bank Name" value={formData.bank_name || ''} onChange={handleChange} className="input" />
            <input name="ifsc_code" placeholder="IFSC Code" value={formData.ifsc_code || ''} onChange={handleChange} className="input" />
            <input name="account_number" placeholder="Account Number" value={formData.account_number || ''} onChange={handleChange} className="input" />
            <input name="branch" placeholder="Branch" value={formData.branch || ''} onChange={handleChange} className="input" />
          </div>
        )}

        <div className="mt-6 flex justify-between">
          {step > 1 && <button onClick={() => setStep(step - 1)} className="px-4 py-2 bg-gray-300 rounded">Back</button>}
          {step < 3 && <button onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>}
          {step === 3 && <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">Submit</button>}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPopup;
