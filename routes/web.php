<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\Auth\PatientAuthenticateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientBookingController;
use App\Http\Controllers\RecordController;
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

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

//test
Route::get('/send_email', [PatientBookingController::class, 'sendMail'])->name('mail');

// Patient
Route::get('/patient/redirect', [PatientAuthenticateController::class, 'redirect'])->name('patient.google.redirect');
Route::get('/patient/callback', [PatientAuthenticateController::class, 'callback'])->name('patient.google.callback');
Route::get('/patient/logout', [PatientAuthenticateController::class, 'destroy'])->name('patient.logout');
Route::post('/patient/login', [PatientAuthenticateController::class, 'login'])->name('patient.login');
Route::post('/patient/register', [PatientAuthenticateController::class, 'register'])->name('patient.register');
Route::get('/patient/booking', [PatientBookingController::class, 'booking'])->name('patient.booking');
Route::post('/patient/booking', [PatientBookingController::class, 'store'])->name('patient.booking.store');

//Doctor
Route::middleware(['auth'])->group(function () {
    // Dashboard
    Route::get('/doctor/dashboard', [DashboardController::class, 'index'])->name('doctor.dashboard');
    Route::get('/doctor/dashboard/appointment/{date}', [DashboardController::class, 'getAppointmentsByDate'])->name('doctor.dashboard.appointment');
    Route::get('/doctor/dashboard/schedule/{start_date}/{end_date}', [DashboardController::class, 'getScheduleByDates'])->name('doctor.dashboard.schedule');

    // Appointments
    Route::get('/doctor/appointments', [AppointmentController::class, 'index'])->name('doctor.appointments');
    Route::get('appointment/note/{appointment}', [AppointmentController::class, 'showAppointmentNote'])->name('appointment.note');
    Route::post('appointment/note/{appointment}', [AppointmentController::class, 'storeAppointmentNoteData']);
    Route::get('appointment/{date_start}/{date_end}', [AppointmentController::class, 'show'])->name('appointment.show');
    Route::get('appointment/date/{date}', [AppointmentController::class, 'getAllByDate'])->name('appointment.date');

    // Schedule
    Route::get('/doctor/schedule', [ScheduleController::class, 'index'])->name('doctor.schedule');
    Route::get('schedule/edit/{id}', [ScheduleController::class, 'edit'])->name('schedule.edit');
    Route::patch('schedule/update/{id}', [ScheduleController::class, 'update'])->name('schedule.update');
    Route::delete('schedule/delete/{id}', [ScheduleController::class, 'delete'])->name('schedule.delete');
    Route::post('schedule/store', [ScheduleController::class, 'store'])->name('schedule.store');

    // Medical Record
    Route::get('/doctor/records', [RecordController::class, 'index'])->name('doctor.records');

    Route::middleware(['auth'])->group(function () {
        Route::get('/doctor/prescriptions', function () {
            return Inertia::render('Auth/Doctor/Prescription');
        })->name('doctor.prescriptions');
    });
});

// Show doctor login page
Route::get('doctor/login', [DoctorController::class, 'create'])->name('doctor.login.create');

require __DIR__.'/auth.php';
