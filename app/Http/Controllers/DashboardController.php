<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(private DashboardService $dashboardService)
    {
    }

    public function index()
    {
        $data = $this->dashboardService->index();

        return Inertia::render('Auth/Doctor/Dashboard', $data);
    }

    public function getAppointmentsByDate(string $date)
    {
        $appointment = $this->dashboardService->getAppointmentsByDate($date);

        return redirect()->back()->with('appointment', $appointment);
    }

    public function getScheduleByDates(string $start_date, string $end_date)
    {
        $schedule = $this->dashboardService->getScheduleByDates($start_date, $end_date);

        return redirect()->back()->with('schedule', $schedule);
    }
}
