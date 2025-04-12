<?php

namespace App\Http\Controllers\Controllers\Auth;

use App\Models\ExternalUser;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthanticationController
{
    // public function registration(){
    //     return Inertia::render('registrationForm');
    // }
    public function store(Request $request){
        // Validate the request
        // dd(Auth::User());
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
        ]);
        
        if ($validator->fails()) {
            // dd("HI");
            return back()->withErrors($validator)->withInput();
        }

        // Create the user
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return Inertia::render('/');
    }
    public function login(Request $request)
    {
        // dd('Coming');
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if (Auth::attempt($request->only('email', 'password'))) {
            // dd('Good');
            $request->session()->regenerate();
            if(Auth::user()->role === 2){               
                return Inertia::location('/adminDashboard');

            }
            return Inertia::location('/dashboard');
            // return view('test');
            // return redirect()->intended('/dashboard');
        //     // Use Inertia redirect instead of Laravel redirect
        }
        
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
    public function logout(Request $request){
        // dd(Auth::user());
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return Inertia::location('/');
    }
}
