<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class MemberController extends Controller
{
    public function memberdashboard()
    {
        return Inertia::render('AdminDashboard/members/memberdashboard');
    }

    public function fetchmember(Request $request)
    {
        // dd('sdsd');
        // Fetch all roles from the Roles model
        $roles = Roles::all();
        // dd($roles);
        $roleMap = $roles->pluck('name', 'id')->toArray();
        Log::info('Roles fetched from Roles model:', ['roles' => $roleMap]);
        // dd($roleMap);

        // Fetch all users
        $users = User::all();
        // dd($users);
        Log::info('Users fetched:', ['users' => $users->toArray()]);

        // Map numeric role IDs to role names
        $users = $users->map(function ($user) use ($roleMap) {
            $roleName = isset($roleMap[$user->roling]) ? $roleMap[$user->roling] : 'unknown';
            $user->role_name = $roleName;
            return $user;
        });
        // dd($users);

        Log::info('Users with role names:', ['users' => $users->toArray()]);

        // Group users by their role names
        $data = [];
        foreach ($roleMap as $roleId => $roleName) {
            $key = strtolower($roleName) . 's'; // e.g., "admins", "apiusers", "retailers"
            $data[$key] = $users->where('role_name', $roleName)->values();
        }
        // dd($data);

        Log::info('Grouped data:', ['data' => $data]);

        return response()->json($data, 200);
    }
    public function addMember(Request $request)
    {
        Log::info('Request data received:', $request->all());
    
        $roleNames = Roles::pluck('name')->toArray();
        Log::info('Role names for validation:', ['roleNames' => $roleNames]);
    
        $validated = $request->validate([
            'roling' => 'required',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'company' => 'nullable|string|max:255',
            'pancard_number' => 'nullable|string|max:20',
            'aadhaar_number' => 'nullable|string|max:20',
            'mobile' => 'nullable|string|max:15',
            'address' => 'nullable|string',
            'state' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'pincode' => 'nullable|string|max:10',
        ]);
    
        try {
            // Create a copy of the request data
            $data = $request->all();
            // dd($data['roling']);
            // dd($data['role']);
            if($data['roling'] === 'apiuser'){
                $data['roling'] = '2';
            }
            elseif($data['roling'] === 'whitelable'){
                $data['roling'] = '3';
            }
            elseif($data['roling'] === 'admin'){
                $data['roling'] = '1';
            }
            else{
                $data['roling'] = '5';
            }
            // switch($data['role']){
            //     case 'apiuser':
            //         return $data['role'] = '2';
            //     case 'whitelable':
            //         return $data['role'] = '3';
            //     case 'Demo User':
            //         return $data['role'] = '5';
            //     default:
            //         return 'Check Membercontroller Please Here is Hardcoded for Temporary.';
            // }
            // dd($data['role']);
            
            $generatedPassword = null;
    
            // if ($validated['status'] !== '0') {
                $generatedPassword = "Nikatby";
                // $generatedPassword = Str::upper(Str::random(4)) . rand(1000, 9999) . Str::upper(Str::random(4));
                $data['password'] = Hash::make($generatedPassword);
            // }
    
            // Debug what we're about to save
            Log::info('Data being saved to User model:', $data);
            
            $member = User::create($data);
            Log::info('User created:', $member->toArray());
    
            if ($generatedPassword) {
                Mail::to($member->email)->send(new WelcomeEmail($member, $generatedPassword));
            }
    
            $responseData = [
                'message' => 'Member added successfully',
                'data' => $member,
            ];
            if ($generatedPassword) {
                $responseData['generated_password'] = $generatedPassword;
            }
    
            return response()->json($responseData, 201);
        } catch (\Exception $e) {
            \Log::error("Failed to add member: " . $e->getMessage());
            return response()->json(['error' => 'Failed to add member: ' . $e->getMessage()], 500);
        }
    }
    public function deleteMember(Request $request, $id)
    {
        $mainAdminId = 1;

        try {
            $member = User::findOrFail($id);
            // dd($member->id);

            // Fetch role names to check if the user is an admin
            $roles = Roles::pluck('name', 'id')->toArray();
            $roleName = isset($roles[$member->role]) ? $roles[$member->role] : 'unknown';
            // dd($roleName);

            if ($roleName === 'admin' && $member->role === $mainAdminId) {
                return response()->json(['error' => 'Cannot deactivate the main admin'], 403);
            }
            $member->status = true;
            $member->save();

            // Fetch the ID of the 'deactivated' role
            // $deactivatedRole = Roles::where('name', 'deactivated')->first();
            // dd($deactivatedRole);
            // if (!$deactivatedRole) {
            //     throw new \Exception('Deactivated role not found');
            // }

            // if ($member->role != $deactivatedRole->id) {
            //     $member->role = $deactivatedRole->id;
            //     $member->deactivation_reason = $request->input('deactivation_reason', 'Deactivated on ' . now());
            //     $member->save();
            // }

            return response()->json(['message' => 'Member deactivated successfully'], 200);
        } catch (\Exception $e) {
            \Log::error("Failed to deactivate member: " . $e->getMessage());
            return response()->json(['error' => 'Failed to deactivate member: ' . $e->getMessage()], 500);
        }
    }
    public function reterivedeleteMember(Request $request, $id){
        try{
            $member = User::findOrFail($id);
            $member->status = false;
            // dd($member);
            $member->save();
        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => 'Faild' . $e,
            ]);
        }
    }
}