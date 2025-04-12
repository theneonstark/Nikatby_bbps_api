<?php

namespace App\Http\Controllers\Paysprint;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController
{
    public function dashboardDmt()
    {
        return Inertia::render('dashboard1');
    }
    public function dashboardBusBooking()
    {
        return Inertia::render('busTicket/dashboard');
    }
    public function dashboardRecharge()
    {
        return Inertia::render('Recharge/dashboard');
    }
    public function dashboardUtilities()
    {
        return Inertia::render('utilities');
    }
}
