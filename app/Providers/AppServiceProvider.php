<?php

namespace App\Providers;

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
        Vite::prefetch(concurrency: 3);
    }
}
