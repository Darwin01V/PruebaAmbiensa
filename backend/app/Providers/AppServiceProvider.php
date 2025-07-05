<?php

namespace App\Providers;

use App\Interfaces\UsuarioServiceInterface;
use App\Services\UsuarioServices;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UsuarioServiceInterface::class, UsuarioServices::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
