import React from 'react';
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePage } from '@inertiajs/react';


export function SiteHeader() {
    const { props } = usePage();
    const user = props.user;
    // const { user } = usePage().props;

    return (
        <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
            <div className="flex w-full items-center justify-between px-4 lg:px-6">
                <div className="flex items-center gap-1">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
                    <h1 className="text-base font-bold">Dashboard</h1>
                </div>

                {user && (
                    <div className="flex items-center gap-2">
                        <span className="text-gray-800 font-bold">{user}</span>
                        <span className="text-red-800 font-semibold"><a href='/userpanel3/public/logout'>Logout</a></span>
                    </div>
                )}
            </div>
        </header>
    );
}
