<?php

namespace App\Http\Middleware;

use App\Models\UserIpAdd;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckIpWhitelist
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $clientIp = $request->ip(); // Get the user's IP address

        // Check if the IP is in the whitelist with active status
        $isAllowed = UserIpAdd::where('ip_address', $clientIp)
            ->where('status', true)
            ->exists();

        if (!$isAllowed) {
            abort(403, 'Your IP is not allowed to access this application.');
        }

        return $next($request);
    }
}
