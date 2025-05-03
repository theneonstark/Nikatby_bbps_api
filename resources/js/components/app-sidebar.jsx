import * as React from "react";
import { usePage } from "@inertiajs/react";
import {
  AlertTriangleIcon,
  BusFrontIcon,
  ChevronDownIcon,
  IndianRupeeIcon,
  LayoutDashboardIcon,
  ListIcon,
  SettingsIcon,
  ZapIcon,
  BriefcaseIcon,
  PercentIcon ,
  UsersIcon,
  ShieldCheckIcon,
  BanknoteIcon,
  LandmarkIcon,
  HandCoins,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }) {
  const { props: inertiaProps } = usePage();
  const user = inertiaProps.auth?.user;
  const userrole = user?.role || 0;
  const BASE_URL = import.meta.env.VITE_APP_SERVER === "PRODUCTION" 
  ? "https://demo.nikatby.in/userpanel3/public" 
  : "";

  const [collapsedMenus, setCollapsedMenus] = React.useState({});

  const toggleCollapse = (key) => {
    setCollapsedMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderSubItems = (subItems, level = 1) => {
    return subItems.map((subItem, subIndex) => (
      <div key={subItem.title + subIndex} className={`ml-${level * 4}`}>
        <SidebarMenuButton
          onClick={() => toggleCollapse(subItem.title)}
          className="flex items-center justify-between w-full"
        >
          <a href={subItem.url || "#"} className="w-full flex items-center">
            <span>{subItem.title}</span>
          </a>
          {subItem.subItems && (
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${
                collapsedMenus[subItem.title] ? "rotate-180" : "rotate-0"
              }`}
            />
          )}
        </SidebarMenuButton>
        {subItem.subItems && collapsedMenus[subItem.title] && (
          <div className="ml-4">{renderSubItems(subItem.subItems, level + 1)}</div>
        )}
      </div>
    ));
  };

  const navItems = [
    // {
    //   title: "Dashboard",
    //   icon: LayoutDashboardIcon,
    //   url: userrole === 1 ? `${BASE_URL}/adminDashboard` : `${BASE_URL}/dashboard`,
    // },
    {
      title: userrole !== 1 ? "Fund Request": undefined,
      icon: HandCoins,
      url: '/funRequest',
    },
    {
      title: "Services",
      icon: ListIcon,
      url: `${BASE_URL}/bill/services`,
      // subItems: [{ title: "All Services", url: "/services" }],
    },
    {
      title: "Complaint",
      icon: AlertTriangleIcon,
      url: `${BASE_URL}/complaint`,
      // subItems: [{ title: "Complaint Registarion & Track", url: "/complaint" }],
    },
    {
      title: "DMT 2",
      icon: IndianRupeeIcon,
      subItems: [
        {
          title: "Dashboard",
          url: `${BASE_URL}/dmt2/dashboard`,
        },
        {
          title: "Remitter",
          subItems: [
            { title: "Query Remitter", url: `${BASE_URL}/DMT/queryRemitter` },
            { title: "Remitter Aadhar verify API", url: `${BASE_URL}/DMT/remitterAadharVerify` },
            { title: "Register Remitter", url: `${BASE_URL}/DMT/registerRemitter` },
          ],
        },
        {
          title: "Beneficiary",
          subItems: [
            { title: "Register Beneficiary", url: `${BASE_URL}/DMT/registerBeneficiary` },
            { title: "Delete Beneficiary", url: `${BASE_URL}/DMT/deleteBeneficiary` },
            { title: "Fetch Beneficiary", url: `${BASE_URL}/DMT/fetchBeneficiary` },
            { title: "Fetch Beneficiary By Beneid", url: `${BASE_URL}/DMT/searchByBeneId` },
          ],
        },
        {
          title: "Transaction",
          subItems: [
            { title: "Penny Drop", url: `${BASE_URL}/DMT/pennyDropForm` },
            { title: "Transaction Sent Otp", url: `${BASE_URL}/DMT/transactionSendOtpForm` },
            { title: "Transaction", url: `${BASE_URL}/DMT/TranSaction` },
            { title: "Transaction Status", url: `${BASE_URL}/DMT/transactionStatus` },
          ],
        },
        {
          title: "Refund",
          subItems: [
            { title: "Refund Otp", url: `${BASE_URL}/DMT/refund` },
            { title: "Claim Refund", url: `${BASE_URL}/DMT/claimRefund` },
          ],
        },
      ],
    },
    {
      title: "Bus Booking",
      icon: BusFrontIcon,
      subItems: [
        { title: "Dashboard", url: `${BASE_URL}/bus-booking/dashboard` },
        { title: "Get Source City", url: `${BASE_URL}/Busticket/getSourceCity` },
        { title: "Get Available Trip", url: `${BASE_URL}/Busticket/getAvailableTrip` },
        { title: "Get Current Trip Details", url: `${BASE_URL}/Busticket/getCurrentTripDetails` },
        { title: "Book Tickets", url: `${BASE_URL}/Busticket/getbookTicket` },
        { title: "Get Boarding Point Details", url: `${BASE_URL}/Busticket/getboardingpointdetails` },
        { title: "Check Booked Tickets", url: `${BASE_URL}/Busticket/checkBookedTicket` },
      ],
    },
    {
      title: "Recharge",
      url : userrole === 1 ? `${BASE_URL}/admin/rechargeDashboard` : undefined,
      icon: ZapIcon,
      subItems:  userrole != 1 ? [
        { title: "Dashboard", url: `${BASE_URL}/recharge/dashboard` },
        { title: "Do Recharge", url: `${BASE_URL}/Recharge/dorecharge` },
        { title: "Status Enquiry", url: `${BASE_URL}/Recharge/recharge2` },
        { title: "Manage Operator", url: `${BASE_URL}/Recharge/manageOperator` },
      ]: undefined,
    },
    {
      title: "LIC",
      url :`${BASE_URL}/admin/lic`,
      icon: BriefcaseIcon,
    },
    {
      title: "Roles & Permission",
      icon: SettingsIcon ,
      subItems: [
        {
          title: "Roles",
          url: `${BASE_URL}/admin/displayroles`,
        },
        {
          title: "Permissions",
          url: `${BASE_URL}/admin/displaypermissions`,
        },
      ]
    },
    {
      title: "Commission",
      icon: PercentIcon ,
      url: `${BASE_URL}/admin/commission`,
    },
    {
      title: "Member Details",
      icon: UsersIcon ,
       url: `${BASE_URL}/admin/members`,
      url: `${BASE_URL}/admin/members`,
    },
    {
      title: "Bank Details",
      icon: LandmarkIcon ,
      url: `${BASE_URL}/admin/bank`,
    },
    {
      title: userrole === 1 ?"Fund Request" : undefined,
      icon: BanknoteIcon ,
      url: `${BASE_URL}/admin/fund/request`,
    },
    {
      title: "IP Request",
      icon: ShieldCheckIcon ,
      url: `${BASE_URL}/admin/ip-whitelisting`,
    },
    {
      title: "Utilities",
      icon: SettingsIcon,
      subItems: [
        {
          title: "Dashboard",
          url: `${BASE_URL}/utilities/dashboard`,
        },
        {
          title: "Bill Payment",
          url: "/admin/utility-bill-payment/operator-list",
          // subItems: [
          //   { title: "Operator List", url: `${BASE_URL}/admin/utility-bill-payment/operator-list` },
          //   { title: "Fetch Bill Details", url: `${BASE_URL}/admin/utility-bill-payment/fetch-bill-details` },
          //   { title: "Pay Bill", url: `${BASE_URL}/admin/utility-bill-payment/pay-bill` },
          //   { title: "Status Enquiry", url: `${BASE_URL}/admin/utility-bill-payment/utility-status-enquiry` },
          // ],
        },
        {
          title: "Insurance Payment",
          subItems: [
            { title: "Fetch Insurance Bill Details", url: `${BASE_URL}/admin/InsurancePremiumPayment/FetchInsuranceBillDetails` },
            { title: "Pay Insurance Bill", url: `${BASE_URL}/pay-insurance-bill` },
            { title: "Insurance Status Enquiry", url: `${BASE_URL}/admin/InsurancePremiumPayment/InsuranceStatusEnquiry` },
          ],
        },
        {
          title: "Fastag Recharge",
          subItems: [
            { title: "Operator List", url: `${BASE_URL}/admin/FastagRecharge/FastagOperatorList` },
            { title: "Fetch Consumer Details", url: `${BASE_URL}/admin/FastagRecharge/fetchConsumerDetails` },
            { title: "Recharge", url: `${BASE_URL}/admin/FastagRecharge/fastagRecharge` },
            { title: "Status", url: `${BASE_URL}/admin/FastagRecharge/FastagStatus` },
          ],
        },
        {
          title: "LPG Booking & Payment",
          subItems: [
            { title: "Operator List", url: `${BASE_URL}/admin/LPG/LPGOperator` },
            { title: "Fetch LPG Details", url: `${BASE_URL}/admin/LPG/FetchLPGDetails` },
            { title: "Pay Bill", url: `${BASE_URL}/admin/LPG/LPGBill` },
            { title: "Status", url: `${BASE_URL}/admin/LPG/LPGStatus` },
          ],
        },
        {
          title: "Municipality Payment",
          subItems: [
            { title: "Operator List", url: `/admin/Municipality/MunicipalityOperator` },
            { title: "Fetch Municipality Details", url: `${BASE_URL}/admin/Municipality/FetchMunicipalityDetails` },
            { title: "Pay Bill", url: `${BASE_URL}/admin/Municipality/MunicipalityBill` },
            { title: "Status", url: `${BASE_URL}/admin/Municipality/MunicipalityStatus` },
          ],
        },
      ],
    },
    {
      title: "IP Whitelisting",
      icon: ShieldCheckIcon ,
      url: `${BASE_URL}/user/ipwhitelist`,
    },
  ];

  const visibleNavItems =
    userrole === 1
      ? navItems.filter((item) => ["Dashboard", "Recharge", "LIC", "Roles & Permission", "Commission", "Member Details", "Bank Details", "Fund Request", "IP Request"].includes(item.title))
      : navItems.filter((item) => ["Dashboard", "Services", "Complaint", "DMT 2", "Bus Booking", "Recharge", "Utilities", "Fund Request", "IP Whitelisting"].includes(item.title));

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <span className="text-base font-semibold">MY APP</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {visibleNavItems.map((item, index) => {
          const isSimpleItem = !item.subItems;

          return (
            <div key={item.title + index} className="my-2">
              {isSimpleItem ? (
                <SidebarMenuButton className="flex items-center w-full">
                  <a href={item.url || "#"} className="flex items-center w-full">
                    <item.icon className="mr-2" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              ) : (
                <>
                  <SidebarMenuButton
                    onClick={() => toggleCollapse(index)}
                    className="flex items-center justify-between w-full"
                  >
                    <a href={item.url || "#"} className="flex items-center w-full">
                      <item.icon className="mr-2" />
                      <span>{item.title}</span>
                    </a>
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform ${
                        collapsedMenus[index] ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </SidebarMenuButton>
                  {collapsedMenus[index] && (
                    <div className="ml-4">{renderSubItems(item.subItems)}</div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: user?.name || "User", email: user?.email || "", avatar: "/avatars/shadcn.jpg" }} />
      </SidebarFooter>
    </Sidebar>
  );
}
