import { useForm } from '@inertiajs/react';

export default function ProceedtofetchBill({ inputs, billerId }) {
    // Prepare form state with dynamic inputs + billerId
    const { data, setData, post } = useForm(() => {
        const initialData = {};
        inputs.forEach(input => {
            initialData[input.paramName] = input.paramValue || '';
        });

        // Include billerId in form data
        initialData['billerId'] = billerId;

        return initialData;
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Submit form data to Laravel
        post('/bill/fetchbill', {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Fetch Bill for Biller ID: {billerId}</h1>

            <form onSubmit={handleSubmit}>
                {inputs.map((input, idx) => (
                    <div key={idx} className="mb-4">
                        <label className="block mb-1 font-medium">{input.paramName}</label>
                        <input
                            type="text"
                            value={data[input.paramName] || ''}
                            onChange={(e) => setData(input.paramName, e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    </div>
                ))}

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
}
