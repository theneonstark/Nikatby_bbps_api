
export const Dropdown = () => {
    const handleChange = (event) => {
      const value = event.target.value;
  
      if (value === "DMT2") {
        window.location.href = "/dmt2/dashboard";
      } else if (value === "Bus Booking") {
        window.location.href = "/bus-booking/dashboard";
      } else if (value === "Recharge") {
        window.location.href = "/recharge/dashboard";
      } else if (value === "Utilities") {
        window.location.href = "/utilities/dashboard";
      } else if (value === "Main Dashboard")
      {
        window.location.href = "/dashboard";
      }
    };
  
    return (
      <div className="bg-white shadow-md rounded-lg p-0 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-0 text-center">Select Dashboard</h2>
        <select
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Select Individual Dashboard</option>
          <option>Main Dashboard</option>
          <option>DMT2</option>
          <option>Bus Booking</option>
          <option>Recharge</option>
          <option>Utilities</option>
        </select>
      </div>
    );
  };
  
  
//   export const Dropdown = () => {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//         <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-4 text-center">My Dropdown</h2>
//           <div className="w-full">
//             <select className="w-full border border-gray-300 rounded-md p-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500">
//               <option value="">Select...</option>
//               <option value="1">Option 1</option>
//               <option value="2">Option 2</option>
//             </select>
//           </div>
//         </div>
//       </div>
//     );
//   };
  