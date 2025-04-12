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
    {
      title: "Dashboard",
      icon: LayoutDashboardIcon,
      url: userrole === 1 ? "/adminDashboard" : "/dashboard",
    },
    {
      title: "Services",
      icon: ListIcon,
      url: "/services",
      // subItems: [{ title: "All Services", url: "/services" }],
    },
    {
      title: "Complaint",
      icon: AlertTriangleIcon,
      url: "/complaint",
      // subItems: [{ title: "Complaint Registarion & Track", url: "/complaint" }],
    },
    {
      title: "DMT 2",
      icon: IndianRupeeIcon,
      subItems: [
        {
          title: "Dashboard",
          url: "/dmt2/dashboard",
        },
        {
          title: "Remitter",
          subItems: [
            { title: "Query Remitter", url: "/DMT/queryRemitter" },
            { title: "Remitter Aadhar verify API", url: "/DMT/remitterAadharVerify" },
            { title: "Register Remitter", url: "/DMT/registerRemitter" },
          ],
        },
        {
          title: "Beneficiary",
          subItems: [
            { title: "Register Beneficiary", url: "/DMT/registerBeneficiary" },
            { title: "Delete Beneficiary", url: "/DMT/deleteBeneficiary" },
            { title: "Fetch Beneficiary", url: "/DMT/fetchBeneficiary" },
            { title: "Fetch Beneficiary By Beneid", url: "/DMT/searchByBeneId" },
          ],
        },
        {
          title: "Transaction",
          subItems: [
            { title: "Penny Drop", url: "/DMT/pennyDropForm" },
            { title: "Transaction Sent Otp", url: "/DMT/transactionSendOtpForm" },
            { title: "Transaction", url: "/DMT/TranSaction" },
            { title: "Transaction Status", url: "/DMT/transactionStatus" },
          ],
        },
        {
          title: "Refund",
          subItems: [
            { title: "Refund Otp", url: "/DMT/refund" },
            { title: "Claim Refund", url: "/DMT/claimRefund" },
          ],
        },
      ],
    },
    {
      title: "Bus Booking",
      icon: BusFrontIcon,
      subItems: [
        { title: "Dashboard", url: "/bus-booking/dashboard" },
        { title: "Get Source City", url: "/Busticket/getSourceCity" },
        { title: "Get Available Trip", url: "/Busticket/getAvailableTrip" },
        { title: "Get Current Trip Details", url: "/Busticket/getCurrentTripDetails" },
        { title: "Book Tickets", url: "/Busticket/getbookTicket" },
        { title: "Get Boarding Point Details", url: "/Busticket/getboardingpointdetails" },
        { title: "Check Booked Tickets", url: "/Busticket/checkBookedTicket" },
      ],
    },
    {
      title: "Recharge",
      url : userrole === 1 ? "/admin/rechargeDashboard" : undefined,
      icon: ZapIcon,
      subItems:  userrole != 1 ? [
        { title: "Dashboard", url: "/recharge/dashboard" },
        { title: "Do Recharge", url: "/Recharge/dorecharge" },
        { title: "Status Enquiry", url: "/Recharge/recharge2" },
        { title: "Manage Operator", url: "/Recharge/manageOperator" },
      ]: undefined,
    },
    {
      title: "LIC",
      url :"/admin/lic",
      icon: BriefcaseIcon,
    },
    {
      title: "Roles & Permission",
      icon: SettingsIcon ,
      subItems: [
        {
          title: "Roles",
          url: "/admin/displayroles",
        },
        {
          title: "Permissions",
          url: "/admin/displaypermissions",
        },
      ]
    },
    {
      title: "Commission",
      icon: PercentIcon ,
      url: "/admin/commission",
    },
    {
      title: "Member Details",
      icon: UsersIcon ,
      url: "admin/members",
    },
    {
      title: "Bank Details",
      icon: LandmarkIcon ,
      url: "/admin/bank",
    },
    {
      title: "Fund Request",
      icon: BanknoteIcon ,
      url: "/admin/fund/request",
    },
    {
      title: "IP Whitelisting",
      icon: ShieldCheckIcon ,
      url: "/admin/ip-whitelisting",
    },
    {
      title: "Utilities",
      icon: SettingsIcon,
      subItems: [
        {
          title: "Dashboard",
          url: "/utilities/dashboard",
        },
        {
          title: "Bill Payment",
          subItems: [
            { title: "Operator List", url: "/admin/utility-bill-payment/operator-list" },
            { title: "Fetch Bill Details", url: "/admin/utility-bill-payment/fetch-bill-details" },
            { title: "Pay Bill", url: "/admin/utility-bill-payment/pay-bill" },
            { title: "Status Enquiry", url: "/admin/utility-bill-payment/utility-status-enquiry" },
          ],
        },
        {
          title: "Insurance Payment",
          subItems: [
            { title: "Fetch Insurance Bill Details", url: "/admin/InsurancePremiumPayment/FetchInsuranceBillDetails" },
            { title: "Pay Insurance Bill", url: "/pay-insurance-bill" },
            { title: "Insurance Status Enquiry", url: "/admin/InsurancePremiumPayment/InsuranceStatusEnquiry" },
          ],
        },
        {
          title: "Fastag Recharge",
          subItems: [
            { title: "Operator List", url: "/admin/FastagRecharge/FastagOperatorList" },
            { title: "Fetch Consumer Details", url: "/admin/FastagRecharge/fetchConsumerDetails" },
            { title: "Recharge", url: "/admin/FastagRecharge/fastagRecharge" },
            { title: "Status", url: "/admin/FastagRecharge/FastagStatus" },
          ],
        },
        {
          title: "LPG Booking & Payment",
          subItems: [
            { title: "Operator List", url: "/admin/LPG/LPGOperator" },
            { title: "Fetch LPG Details", url: "/admin/LPG/FetchLPGDetails" },
            { title: "Pay Bill", url: "/admin/LPG/LPGBill" },
            { title: "Status", url: "/admin/LPG/LPGStatus" },
          ],
        },
        {
          title: "Municipality Payment",
          subItems: [
            { title: "Operator List", url: "/admin/Municipality/MunicipalityOperator" },
            { title: "Fetch Municipality Details", url: "/admin/Municipality/FetchMunicipalityDetails" },
            { title: "Pay Bill", url: "/admin/Municipality/MunicipalityBill" },
            { title: "Status", url: "/admin/Municipality/MunicipalityStatus" },
          ],
        },
      ],
    },
  ];

  const visibleNavItems =
    userrole === 1
      ? navItems.filter((item) => ["Dashboard", "Recharge", "LIC", "Roles & Permission", "Commission", "Member Details", "Bank Details", "Fund Request", "IP Whitelisting"].includes(item.title))
      : navItems.filter((item) => ["Dashboard", "Services", "Complaint", "DMT 2", "Bus Booking", "Recharge", "Utilities"].includes(item.title));

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
