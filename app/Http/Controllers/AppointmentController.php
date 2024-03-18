<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Services\AppointmentService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    private $appointmentService;

    public function __construct(AppointmentService $appointmentService)
    {
        $this->appointmentService = $appointmentService;
    }

    public function show(string $date_start, string $date_end)
    {
        $appointments = $this->appointmentService->getAllBetweenDates($date_start, $date_end);

        return redirect()->back()->with('appointment', [
            'list' => $appointments,
        ]);
    }

    public function index()
    {
        $appointments = $this->appointmentService->showAppointmentPage();

        return Inertia::render('Auth/Doctor/Appointments', [
            'appointments' => $appointments,
        ]);
    }
}
