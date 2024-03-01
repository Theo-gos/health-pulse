<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Doctor/Login');
})->name('auth.doctor.login');

Route::get('/auth/doctor/register', function () {
    return Inertia::render('Auth/Doctor/Register');
})->name('auth.doctor.register');
