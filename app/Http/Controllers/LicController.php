<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Lic;

use Illuminate\Http\Request;

class LicController extends Controller
{

    public function licdashboard(){
        // dd('LIC');
        return Inertia::render('AdminDashboard/licDashboard');
    }


    public function fetchlicdata(){
        $data= Lic::all();
        return response()->json(['data'=>$data]);

    }
}
