<?php

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

// Patient
Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/patient/redirect', [PatientLogInController::class, 'redirect'])->name('patient.google.redirect');
Route::get('/patient/callback', [PatientLogInController::class, 'callback'])->name('patient.google.callback');

// Doctor
Route::get('/doctor/dashboard', function () {
    return Inertia::render('Auth/Doctor/Dashboard');
})->middleware(['auth'])->name('doctor.dashboard');

Route::get('doctor/login', [DoctorController::class, 'create'])->name('doctor.login.create');


require __DIR__ . '/auth.php';
// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });
