<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Services\AppointmentService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function __construct(private AppointmentService $appointmentService)
    {
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
        $appointments = $this->appointmentService->index();

        return Inertia::render('Auth/Doctor/Appointments', [
            'appointments' => $appointments,
        ]);
    }
}
