import React, { useState } from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const ComplaintForm = () => {
  const [form, setForm] = useState({
    mobile: "",
    from: "",
    to: "",
    refId: "",
    disposition: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const e = {};
    const aboveFilled = form.mobile && form.from && form.to;
    const belowFilled = form.refId && form.disposition;

    if (!aboveFilled && !belowFilled) {
      e.mobile = "Either this or Transaction Ref ID section is required.";
      e.refId = "Either this or Mobile Number section is required.";
    }

    if (aboveFilled && (!form.mobile || !form.from || !form.to)) {
      if (!form.mobile) e.mobile = "Mobile is required";
      if (!form.from) e.from = "From date is required";
      if (!form.to) e.to = "To date is required";
    }

    if (belowFilled && (!form.refId || !form.disposition)) {
      if (!form.refId) e.refId = "Ref ID is required";
      if (!form.disposition) e.disposition = "Disposition is required";
    }

    if (!form.description) {
      e.description = "Complaint description is required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.get("/bill/complaintRegistration", form); 
        console.log("Response from controller:", response.data);
        // You can show success message or redirect
      } catch (error) {
        console.error("Error sending complaint:", error.response?.data || error.message);
        // Show error popup if needed
      }
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex items-start justify-center min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-200 w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-xl rounded-lg p-8 w-full max-w-6xl mt-6"
          >
            <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Raise Complaint</h2>
            <p className="text-gray-600 mb-6 text-center">Transaction Type Complaint</p>

            <form onSubmit={handleSubmit} className="border p-6 rounded-md bg-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-medium">Enter Mobile Number</label>
                  <input
                    type="text"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-white shadow-sm"
                    placeholder="Mobile"
                  />
                  {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                </div>
                <div>
                  <label className="block font-medium">From</label>
                  <input
                    type="date"
                    name="from"
                    value={form.from}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-white shadow-sm"
                  />
                  {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}
                </div>
                <div>
                  <label className="block font-medium">To</label>
                  <input
                    type="date"
                    name="to"
                    value={form.to}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-white shadow-sm"
                  />
                  {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}
                </div>
              </div>

              <div className="text-center my-6 text-gray-500 font-semibold">-- OR --</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium">Transaction Ref ID</label>
                  <input
                    type="text"
                    name="refId"
                    value={form.refId}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-white shadow-sm"
                    placeholder="Transaction Ref ID"
                  />
                  {errors.refId && <p className="text-red-500 text-sm">{errors.refId}</p>}
                </div>
                <div>
                  <label className="block font-medium">Complaint Disposition</label>
                  <select
                    name="disposition"
                    value={form.disposition}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-white shadow-sm"
                  >
                    <option value="">- Select -</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                    <option value="Success">Success</option>
                  </select>
                  {errors.disposition && <p className="text-red-500 text-sm">{errors.disposition}</p>}
                </div>
              </div>

              <div className="mt-6">
                <label className="block font-medium">Complaint Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md bg-white shadow-sm"
                  placeholder="Complaint Description"
                ></textarea>
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>

              <div className="mt-6 text-right">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  className="bg-green-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-700 transition-all"
                >
                  Submit
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ComplaintForm;
