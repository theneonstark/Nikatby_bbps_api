<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        // Define the routes that do not require authentication

        // Check if the user is authenticated or the current route is in the allowed list
        if (Auth::user()->role === 1) {
            return $next($request);
        }

        // Redirect to the login page if not authenticated
        return Inertia::location('/loginPage');
    }
}
