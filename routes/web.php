<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\PatientLogInController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Components developing
Route::get('/component', function () {
    return Inertia::render('Component');
})->name('component');

// Route::get('/{date}', function ($date) {
//     return $date;
// });

// Patient
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/patient/redirect', [PatientLogInController::class, 'redirect'])->name('patient.google.redirect');
Route::get('/patient/callback', [PatientLogInController::class, 'callback'])->name('patient.google.callback');
Route::get('/patient/logout', [PatientLogInController::class, 'destroy'])->name('patient.logout');

Route::get('appointment/{date_start}/{date_end}', [AppointmentController::class, 'show'])->name('appointment.show');

// Doctor
Route::get('/doctor/dashboard', function () {
    return Inertia::render('Auth/Doctor/Dashboard');
})->middleware(['auth'])->name('doctor.dashboard');

Route::get('/doctor/appointments', function () {
    return Inertia::render('Auth/Doctor/Appointments');
})->middleware(['auth'])->name('doctor.appointments');

Route::get('doctor/login', [DoctorController::class, 'create'])->name('doctor.login.create');


require __DIR__ . '/auth.php';
