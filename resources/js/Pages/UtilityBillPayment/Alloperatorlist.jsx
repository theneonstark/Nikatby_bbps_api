import React from 'react';
import { usePage, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const AllOperatorList = () => {
  const { categories = [] } = usePage().props;

  const handleCardClick = (category) => {
    router.visit(`/utility-category/${encodeURIComponent(category)}`);
  };

  return (
    <SidebarProvider>
                        <AppSidebar variant="inset" />
                        <SidebarInset>
                            <SiteHeader />
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Select Operator Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center text-center font-semibold text-gray-800 text-lg cursor-pointer hover:shadow-xl transition"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleCardClick(category)}
          >
            {category}
          </motion.div>
        ))}
      </div>
    </div>
    </SidebarInset>
                </SidebarProvider>
  );
};

export default AllOperatorList;
