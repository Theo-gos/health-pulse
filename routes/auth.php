<?php

use App\Http\Controllers\Auth\DoctorAuthenticateController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('login', [DoctorAuthenticateController::class, 'create'])
        ->name('login');

    Route::post('login', [DoctorAuthenticateController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [DoctorAuthenticateController::class, 'destroy'])
        ->name('logout');
});
