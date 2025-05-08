<?php

namespace App\Http\Controllers\Paysprint;

use App\Http\Controllers\Controller;
use App\Models\UserIpAdd;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IpAndBankController extends Controller
{
    public function index()
    {
        return Inertia::render('Ip/Ipwhitelist');
    }
    public function ipFetch(){
        $user = Auth::user();
        // dd($user->id);
        $IpList = UserIpAdd::where('user_id', $user->id)->get();
        if(isset($IpList)){
            return response()->json([
                'status' => true,
                'data' => $IpList,
            ]);
        }
    }
    public function ipAdd(Request $request)
    {
        // dd(Auth::id());
        $request->validate([
            'ip_address' => 'required|ip|unique:user_ip_adds,ip_address',
        ]);
    
        UserIpAdd::create([
            'user_id' => Auth::id(),
            'ip_address' => $request->ip_address,
            'status' => false,
        ]);
    
        return response()->json(['success' => true]);
    }
    public function editIp(Request $request, $id){
        $request->validate([
            'ip_address' => 'required|ip|unique:user_ip_adds,ip_address',
        ]);
        $edit = UserIpAdd::firstOrCreate(['id' => $id]);
        if(isset($edit)){
            $data = $request->only([
                'ip_address'
            ]);
            $edit->update($data);
            return response()->json(['success' => true]);
        }
        return response()->json(['success' => false]);
    }
    
}
