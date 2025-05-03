<?php

namespace App\Providers;

use App\Http\Middleware\IsAdmin;
use App\Http\Middleware\OnBoarding;
use App\Models\FundRequest;
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
        app('router')->aliasMiddleware('onBoard', OnBoarding::class);
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
                    'onBoard' => Auth::check() && Auth::user()->verified === 1,
                ];
            },
        ]);
        Inertia::share([
            'credit_amount' => function () {
                // FundRequest::where('user_id',$id)->first();
                return [
                    'credit_balance' => Auth::check() ? (isset(FundRequest::where('user_id',Auth::id())->first()->credit_balance) ? FundRequest::where([
                        'user_id' => Auth::id(),
                        'status' => 0
                    ])->get()->pluck('credit_balance')->sum() : null) : null,
                    'debit_balance' => Auth::check() ? (isset(FundRequest::where('user_id',Auth::id())->first()->debit_balance) ? FundRequest::where([
                        'user_id' => Auth::id(),
                        'status' => 1
                    ])->get()->pluck('debit_balance')->sum() : null) : null,
                ]; 
            },
        ]);
        Vite::prefetch(concurrency: 3);
    }
}
