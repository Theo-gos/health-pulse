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
        return $this->appointmentService->show($date_start, $date_end);
    }

    public function index()
    {
        return $this->appointmentService->index();
    }
}
