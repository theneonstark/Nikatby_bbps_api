import React from "react";
import { motion } from "framer-motion";
import { Briefcase, DollarSign, PieChart, CreditCard, BarChart2, Shield } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const services = [
  {
    id: 1,
    title: "Investment Planning",
    description: "Maximize your wealth with expert investment strategies tailored to your goals.",
    icon: <DollarSign size={28} className="text-white" />, 
    bgColor: "from-gray-600 to-gray-800",
  },
  {
    id: 2,
    title: "Pay Bill",
    description: "Find Every Type of Recharges and Bill Payment like DTH, Gas, and Water Bill.",
    icon: <Briefcase size={28} className="text-white" />,
    bgColor: "from-blue-600 to-blue-800",
    url: "/billPay",
  },
  {
    id: 3,
    title: "Wealth Management",
    description: "Manage and grow your financial assets with strategic wealth management.",
    icon: <PieChart size={28} className="text-white" />,
    bgColor: "from-green-600 to-green-800",
  },
  {
    id: 4,
    title: "Credit Services",
    description: "Get the best deals on credit cards and financial loans tailored to you.",
    icon: <CreditCard size={28} className="text-white" />,
    bgColor: "from-purple-600 to-purple-800",
  },
  {
    id: 5,
    title: "Market Insights",
    description: "Stay updated with the latest market trends and investment opportunities.",
    icon: <BarChart2 size={28} className="text-white" />,
    bgColor: "from-orange-600 to-orange-800",
  },
  {
    id: 6,
    title: "Insurance Planning",
    description: "Protect your future with comprehensive insurance plans tailored to your needs.",
    icon: <Shield size={28} className="text-white" />,
    bgColor: "from-red-600 to-red-800",
  },
  {
    id: 7,
    title: "Credit Services",
    description: "Get the best deals on credit cards and financial loans tailored to you.",
    icon: <CreditCard size={28} className="text-white" />,
    bgColor: "from-purple-600 to-purple-800",
  },
  {
    id: 8,
    title: "Market Insights",
    description: "Stay updated with the latest market trends and investment opportunities.",
    icon: <BarChart2 size={28} className="text-white" />,
    bgColor: "from-orange-600 to-orange-800",
  }
];

export default function Services() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-col items-center justify-center min-h-screen p-10 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
          <h1 className="text-5xl font-bold mb-12 text-center text-gray-900 drop-shadow-xl">Our Services</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
            {services.map((service) => (
              <motion.div
                key={service.id}
                className={`flex flex-col justify-center items-center bg-gradient-to-br ${service.bgColor} text-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 p-6 w-64 h-48`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
              >
                <div className="w-full flex items-center justify-center p-4 bg-opacity-80">
                  {service.icon}
                </div>
                <a href={service.url} className="w-full h-full flex flex-col items-center justify-center text-center">
                  <h2 className="text-xl font-semibold drop-shadow-md">{service.title}</h2>
                  <p className="text-gray-300 mt-2 text-sm drop-shadow-md">{service.description}</p>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
