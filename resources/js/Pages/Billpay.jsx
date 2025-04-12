import { motion } from "framer-motion";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const services = [
  { id: 1, title: "Water Bill", image: "/images/water.png", description: "Pay your monthly water bill online." },
  { id: 2, title: "Electricity Bill", image: "/images/electricity.png", description: "Quick & easy electricity bill payments." },
  { id: 3, title: "Mobile Prepaid", image: "/images/mobile-prepaid.png", description: "Recharge your mobile instantly.", url: "page" },
  { id: 4, title: "Mobile Postpaid", image: "/images/mobile-postpaid.png", description: "Pay your postpaid mobile bills." },
  { id: 5, title: "Gas Bill", image: "/images/gas.png", description: "Secure gas bill payments online." },
  { id: 6, title: "Broadband", image: "/images/broadband.png", description: "Pay for your high-speed internet." },
  { id: 7, title: "DTH Recharge", image: "/images/dth.png", description: "Instant DTH recharge with offers." },
  { id: 8, title: "Insurance Premium", image: "/images/insurance.png", description: "Pay insurance premiums hassle-free." },
  { id: 9, title: "Loan EMI", image: "/images/loan-emi.png", description: "Make your monthly EMI payments." },
  { id: 10, title: "Education Fees", image: "/images/education.png", description: "Secure education fee payments." },
  { id: 11, title: "Municipal Tax", image: "/images/tax.png", description: "Pay your property & municipal tax." },
  { id: 12, title: "Metro Recharge", image: "/images/metro.png", description: "Recharge your metro travel card." },
  { id: 13, title: "FASTag Recharge", image: "/images/fastag.png", description: "Instant toll recharge for FASTag." },
  { id: 14, title: "Cable TV", image: "/images/cable-tv.png", description: "Pay for your cable TV connection." },
  { id: 15, title: "Water Tanker", image: "/images/tanker.png", description: "Book a water tanker online." },
  { id: 16, title: "Gas Cylinder", image: "/images/gas-cylinder.png", description: "Book your gas cylinder instantly." },
  { id: 17, title: "Hospital Bill", image: "/images/hospital.png", description: "Settle hospital & medical bills." },
  { id: 18, title: "Club Membership", image: "/images/membership.png", description: "Renew your club memberships." },
  { id: 19, title: "Parking Charges", image: "/images/parking.png", description: "Pay your parking fees online." },
  { id: 20, title: "Credit Card Bill", image: "/images/credit-card.png", description: "Clear your monthly credit card dues." },
];

export default function BillPay() {
  return (
    (<SidebarProvider>
              <AppSidebar variant="inset" />
              <SidebarInset>
                <SiteHeader />
                <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br text-white">
  {/* Title */}
  <h1 className="text-4xl font-bold text-black mb-8 text-center drop-shadow-lg">
    Bill Payment Services
  </h1>

  {/* Cards Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
    {services.map((service) => (
      <a href={service.url} className="block">
      <motion.div
        key={service.id}
        className="flex flex-col items-center bg-gradient-to-r from-gray-800 to-gray-800 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all p-6 border border-red-200"
        whileHover={{ scale: 1.05 }}
      >
        {/* Service Image */}
        <div className="bg-white rounded-full p-4 shadow-md">
          <img src={service.image} alt={service.title} className="w-20 h-20 object-contain" />
        </div>

        {/* Service Title */}
        <h2 className="text-lg font-semibold text-yellow-100 mt-4">{service.title}</h2>

        {/* Service Description */}
        <p className="text-yellow-200 text-sm mt-1 text-center">{service.description}</p>

        {/* Pay Now Button */}
        {/* <button className="mt-4 px-5 py-2 bg-black-300 text-white-900 rounded-lg hover:bg-gray-400 transition-all font-semibold shadow-md">
          Pay Now
        </button> */}
      </motion.div>
      </a>
    ))}
  </div>
</div>

    </SidebarInset>
            </SidebarProvider>)
  );
}
