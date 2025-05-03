<?php

namespace App\Http\Controllers\Paysprint;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FormProgress;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FormProgressController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        // Create or fetch the onboarding record for the user
        $onboarding = FormProgress::firstOrCreate(['user_id' => $userId]);

        return response()->json($onboarding);
    }

    /**
     * Save or update form step data.
     */
    public function saveStep(Request $request)
    {
        $userId = Auth::id();

        // Create or fetch the onboarding record
        $onboarding = FormProgress::firstOrCreate(['user_id' => $userId]);

        // Collect all form input fields
        $data = $request->only([
            'name', 'country', 'state', 'pincode', 'address',
            'bank_name', 'ifsc_code', 'account_number', 'branch'
        ]);

        // Handle file uploads and store file paths
        foreach (['aadhar_card', 'pan_card', 'user_image'] as $field) {
            if ($request->hasFile($field)) {
                $path = $request->file($field)->store('onboarding', 'public');
                $data[$field] = $path;
            }
        }

        // Save the updated data
        $onboarding->update($data);

        return response()->json(['message' => 'Step saved successfully']);
    }

    /**
     * Final submission of the onboarding form.
     */
    public function submit(Request $request)
    {
        $user = Auth::user();

        // Make sure onboarding record exists
        $onboarding = FormProgress::firstOrCreate(['user_id' => $user->id]);
        $onboarding->bank_name = $request->bank_name;
        $onboarding->ifsc_code = $request->ifsc_code;
        $onboarding->account_number = $request->account_number;
        $onboarding->branch = $request->branch;
        

        // Mark the user as verified
        $verified = User::where('id', $user->id)->first();
        $verified->verified = 1;
        // dd($x);
        $verified->save();
        $onboarding->save();
        return response()->json(['message' => 'User Onboard successfully', 'redirect' => '/dashboard']);
        // return redirect()->route('dashboard');  
        // return Inertia::location('/dashboard');
        // return Inertia::render('dashboard');
    }
}
