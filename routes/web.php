<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PatientLogInController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleController;
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

// Patient
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/patient/redirect', [PatientLogInController::class, 'redirect'])->name('patient.google.redirect');
Route::get('/patient/callback', [PatientLogInController::class, 'callback'])->name('patient.google.callback');
Route::get('/patient/logout', [PatientLogInController::class, 'destroy'])->name('patient.logout');



//Doctor
// Dashboard
Route::get('/doctor/dashboard', [DashboardController::class, 'index'])->middleware(['auth'])->name('doctor.dashboard');
Route::get('/doctor/dashboard/appointment/{date}', [DashboardController::class, 'getAppointmentsByDate'])->middleware(['auth'])->name('doctor.dashboard.appointment');
Route::get('/doctor/dashboard/schedule/{start_date}/{end_date}', [DashboardController::class, 'getScheduleByDates'])->middleware(['auth'])->name('doctor.dashboard.schedule');

//Appointments
Route::get('/doctor/appointments', [AppointmentController::class, 'index'])->middleware(['auth'])->name('doctor.appointments');
Route::get('appointment/{date_start}/{date_end}', [AppointmentController::class, 'show'])->name('appointment.show');
Route::get('appointment/date/{date}', [AppointmentController::class, 'getAllByDate'])->name('appointment.date');
// Route::get('appointment/hour/{hour}/date/{date}', [AppointmentController::class, 'getByHourAndDate'])->name('appointment.hour');

//Schedules
Route::get('/doctor/schedule', [ScheduleController::class, 'index'])->middleware(['auth'])->name('doctor.schedule');
Route::get('schedule/edit/{id}', [ScheduleController::class, 'edit'])->name('schedule.edit');
Route::patch('schedule/update/{id}', [ScheduleController::class, 'update'])->name('schedule.update');
Route::delete('schedule/delete/{id}', [ScheduleController::class, 'delete'])->name('schedule.delete');
Route::post('schedule/store', [ScheduleController::class, 'store'])->name('schedule.store');
// Route::get('schedule/id/{id}', [ScheduleController::class, 'getById'])->name('schedule.id');
// Route::get('schedule/date/{date}', [ScheduleController::class, 'getAllByDate'])->name('schedule.date');
// Route::get('schedule/{date_start}/{date_end}', [ScheduleController::class, 'getAllBetweenDates'])->name('schedule.show');

// Patients
Route::get('/doctor/patients', function () {
    return Inertia::render('Auth/Doctor/Patient');
})->middleware(['auth'])->name('doctor.patients');

// Prescriptions
Route::get('/doctor/prescriptions', function () {
    return Inertia::render('Auth/Doctor/Prescription');
})->middleware(['auth'])->name('doctor.prescriptions');

// Test results
Route::get('/doctor/test_results', function () {
    return Inertia::render('Auth/Doctor/TestResult');
})->middleware(['auth'])->name('doctor.test_results');


//Auth
Route::get('doctor/login', [DoctorController::class, 'create'])->name('doctor.login.create');


require __DIR__ . '/auth.php';
