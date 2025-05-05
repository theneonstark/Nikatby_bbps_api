import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function ProceedtofetchBill({ data }) {
  const [biller, setBiller] = useState(null);

  // Initialize form with dynamic inputs from billerInputParams.paramInfo
  const { data: formData, setData, post } = useForm(() => {
    const initialData = {};
    // Normalize paramInfo to an array (handles single input or multiple)
    const inputs = Array.isArray(data?.billerInputParams?.paramInfo)
      ? data.billerInputParams.paramInfo
      : data?.billerInputParams?.paramInfo
      ? [data.billerInputParams.paramInfo]
      : [];
    inputs.forEach((input) => {
      initialData[input.paramName] = input.paramValue || '';
    });
    // Include billerId if available
    initialData['billerId'] = data?.billerId || '';
    return initialData;
  });

  // Update biller state when data prop changes
  useEffect(() => {
    if (data) {
      setBiller(data);
      console.log('billerName:', data.billerName);
      console.log('paramInfo:', data?.billerInputParams?.paramInfo);
    }
  }, [data]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    post('/bill/fetchbill', {
      preserveScroll: true,
      preserveState: true,
    });
  };

  // Handle input changes
  const handleInputChange = (paramName, value) => {
    setData(paramName, value);
  };

  // Render loading state if biller is not set
  if (!biller) {
    return <div className="p-6 max-w-3xl mx-auto">Loading...</div>;
  }

  // Get inputs array for rendering (normalize to array)
  const billinputs = Array.isArray(data?.billerInputParams?.paramInfo)
    ? data.billerInputParams.paramInfo
    : data?.billerInputParams?.paramInfo
    ? [data.billerInputParams.paramInfo]
    : [];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{biller.billerName}</h1>
      {billinputs.length === 0 ? (
        <p className="text-gray-500">No input fields required for this biller.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {billinputs.map((input) => (
            <div key={input.paramName} className="flex flex-col">
              <label className="mb-1 font-medium capitalize">
                {input.paramName.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="text"
                value={formData[input.paramName] || ''}
                onChange={(e) => handleInputChange(input.paramName, e.target.value)}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${input.paramName}`}
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Fetch Bill
          </button>
        </form>
      )}
    </div>
  );
}