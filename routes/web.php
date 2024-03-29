<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientBookingController;
use App\Http\Controllers\PatientLogInController;
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

// Patient
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/patient/redirect', [PatientLogInController::class, 'redirect'])->name('patient.google.redirect');
Route::get('/patient/callback', [PatientLogInController::class, 'callback'])->name('patient.google.callback');
Route::get('/patient/logout', [PatientLogInController::class, 'destroy'])->name('patient.logout');
Route::get('/patient/booking', [PatientBookingController::class, 'booking'])->name('patient.booking');
Route::post('/patient/booking', [PatientBookingController::class, 'store'])->name('patient.booking.store');

//Doctor
// Dashboard
Route::middleware(['auth'])->group(function () {
    Route::get('/doctor/dashboard', [DashboardController::class, 'index'])->name('doctor.dashboard');
    Route::get('/doctor/dashboard/appointment/{date}', [DashboardController::class, 'getAppointmentsByDate'])->name('doctor.dashboard.appointment');
    Route::get('/doctor/dashboard/schedule/{start_date}/{end_date}', [DashboardController::class, 'getScheduleByDates'])->name('doctor.dashboard.schedule');

    Route::get('/doctor/appointments', [AppointmentController::class, 'index'])->name('doctor.appointments');
    Route::get('appointment/{date_start}/{date_end}', [AppointmentController::class, 'show'])->name('appointment.show');
    Route::get('appointment/date/{date}', [AppointmentController::class, 'getAllByDate'])->name('appointment.date');

    Route::get('/doctor/schedule', [ScheduleController::class, 'index'])->name('doctor.schedule');
    Route::get('schedule/edit/{id}', [ScheduleController::class, 'edit'])->name('schedule.edit');
    Route::patch('schedule/update/{id}', [ScheduleController::class, 'update'])->name('schedule.update');
    Route::delete('schedule/delete/{id}', [ScheduleController::class, 'delete'])->name('schedule.delete');
    Route::post('schedule/store', [ScheduleController::class, 'store'])->name('schedule.store');

    Route::middleware(['auth'])->group(function () {
        Route::get('/doctor/records', function () {
            return Inertia::render('Auth/Doctor/Records');
        })->name('doctor.records');
    });

    Route::middleware(['auth'])->group(function () {
        Route::get('/doctor/prescriptions', function () {
            return Inertia::render('Auth/Doctor/Prescription');
        })->name('doctor.prescriptions');
    });
});

//Auth
Route::get('doctor/login', [DoctorController::class, 'create'])->name('doctor.login.create');

require __DIR__.'/auth.php';
