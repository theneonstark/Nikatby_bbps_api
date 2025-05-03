import React from 'react';
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePage } from '@inertiajs/react';
import { FaWallet } from 'react-icons/fa';

export function SiteHeader() {
    const { props } = usePage();
    const user = props.user;
    const creditBalance = props.credit_amount.credit_balance || 0; // Assuming passed from backend
    const debitBalance = props.credit_amount.debit_balance || 0;   // Assuming passed from backend

    return (
        <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
            <div className="flex w-full items-center justify-between px-4 lg:px-6">
                <div className="flex items-center gap-1">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
                    <h1 className="text-base font-bold">Dashboard</h1>
                </div>

                {user && (
                    <div className="flex items-center gap-4">
                        {/* Balances */}
                        <div className="flex items-center gap-2">
                            {/* Credit Balance */}
                            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-semibold">
                                <FaWallet className="text-green-500" />
                                <span>Credit Balance: ₹ {creditBalance}</span>
                            </div>

                            {/* Debit Balance */}
                            <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-md text-xs font-semibold">
                                <FaWallet className="text-red-500" />
                                <span>Debit Balance: ₹ {debitBalance}</span>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex items-center gap-2">
                            <span className="text-gray-800 font-bold">{user}</span>
                            <span className="text-red-800 font-semibold"><a href='/logout'>Logout</a></span>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
