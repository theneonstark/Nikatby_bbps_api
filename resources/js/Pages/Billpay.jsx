import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { router } from "@inertiajs/core";


export default function BillPay({ services }) {
  // `services` here is assumed to be an array of category strings like ["Loan Repayment", "Electricity", ...]

  const handleCategoryClick = (category) => {
    // const encodedCategory = encodeURIComponent(category);
    // console.log(encodeURIComponent(category));
    // console.log(decodeURIComponent(category));
    
    // Inertia.get(`/bill/services/list/${encodeURIComponent(category)}`);
    router.visit(`/bill/services/list/${encodeURIComponent(category)}`);

  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br text-white">
          <h1 className="text-4xl font-bold text-black mb-8 text-center drop-shadow-lg">
            Bill Payment Services
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
            {services.map((category, index) => (
              <div
                key={index}
                className="bg-gray-800 text-yellow-100 shadow-lg rounded-xl p-6 text-center hover:scale-105 transition-transform cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                <h2 className="text-lg font-semibold">{category}</h2>
              </div>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
