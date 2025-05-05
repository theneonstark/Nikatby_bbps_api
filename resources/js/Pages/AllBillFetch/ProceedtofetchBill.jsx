import { router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePage } from '@inertiajs/react';

const ProceedToBillFetch = () => {
  const { props } = usePage();
  const { allData } = props;
  console.log(allData); 
  console.log(allData.billerInputParams.paramInfo.paramName); 
  

  const {data, setData, post, processing, errors } = useForm({
    inputField: '',
    feildName: allData.billerInputParams.paramInfo.paramName,
    billerId: allData.billerId,
  });

  const [localError, setLocalError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const validateInput = (value) => {
    const regex = /^[A-Za-z0-9@\s\-]{8,35}$/;
    if (value.length < 8) return "Minimum 8 characters required.";
    if (value.length > 35) return "Maximum 35 characters allowed.";
    if (!regex.test(value)) return "Only letters, numbers, @, space and hyphens are allowed.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateInput(data.inputField);
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    setLocalError('');
    setSubmitError('');
    // console.log(feildName);
    try {
        await post('/bill/fetchbill/', 
          {
            inputField: data.inputField,
            // feildName: feildName  // ✅ sending feildName to Laravel
          },
          {
            preserveScroll: true,
            onError: () => {
              setSubmitError('Server-side validation failed. Please check your input.');
            },
            onSuccess: () => {
              // e.g., redirect or clear form
            }
          }
        );
      } catch (error) {
        console.error("Unexpected error during form submission:", error);
        setSubmitError('An unexpected error occurred. Please try again later.');
      }
      
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
          <form
            onSubmit={handleSubmit}
            name="ProceedToBillFetch"
            className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
          >
            <label htmlFor="inputField" className="block text-sm font-semibold text-gray-700 mb-2">
            Enter  {allData.billerInputParams.paramInfo.paramName ?? "Code"}
            </label>
            <input
              id="inputField"
              name="inputField"
              type="text"
              value={data.inputField}
              onChange={(e) => setData('inputField', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="E.g., ABC12345"
              autoComplete="off"
            />
            <small className="text-gray-500 text-xs mt-1 block">
              {/* {min ?? 8}–{max ?? 35} characters. Letters, numbers, @, space, hyphen allowed. */}
            </small>

            {localError && <div className="text-red-600 text-sm mt-1">{localError}</div>}
            {errors.inputField && <div className="text-red-600 text-sm mt-1">{errors.inputField}</div>}
            {submitError && <div className="text-red-600 text-sm mt-1">{submitError}</div>}

            <button
              type="submit"
              disabled={processing}
              className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              Proceed
            </button>
          </form>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProceedToBillFetch;
