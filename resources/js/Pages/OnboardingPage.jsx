// resources/js/Pages/OnboardingPage.jsx
import React, { useState } from 'react';
import OnboardingPopup from '../components/OnboardingPopup';
import { Button } from "@/components/ui/button";
import { usePage } from "@inertiajs/react";

const OnboardingPage = () => {
    const { props: inertiaProps } = usePage();
    const user = inertiaProps.auth?.user;
    const userrole = user?.name || '';
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="p-6 text-center">
    {userrole ?(
        <p className="text-3xl font-bold text-blue-600">Hey, {userrole} </p>) : 'Login Please'}
        <h1 className="text-3xl font-bold text-red-600">Verification will be done before Proceed Furture <a className='text-green-600' href='/dashboard'>Skip For Now.</a> </h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        onClick={() => setShowPopup(true)}
      >
        Start The Onboarding Process Untill Your Profile Become 100%.
      </button>

      <OnboardingPopup open={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default OnboardingPage;
