<?php

namespace App\Providers;

use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        app('router')->aliasMiddleware('isAdmin', IsAdmin::class);
        Inertia::share([
            'user' => function () {
                return Auth::check() ? Auth::user()->name : null;
            },
        ]);
        Inertia::share([
            'userrole' => function () {
                return Auth::check() ? Auth::user()->role : null;
            },
        ]);
        Inertia::share([
            'auth' => function () {
                return [
                    'user' => Auth::user(),
                    'isAdmin' => Auth::check() && Auth::user()->role === 1,
                ];
            },
        ]);
        Vite::prefetch(concurrency: 3);
    }
}
