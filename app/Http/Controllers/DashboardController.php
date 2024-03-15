<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct(private DashboardService $dashboardService)
    {
    }

    public function index()
    {
        return $this->dashboardService->index();
    }

    public function getAppointmentsByDate(string $date)
    {
        return $this->dashboardService->getAppointmentsByDate($date);
    }

    public function getScheduleByDates(string $start_date, string $end_date)
    {
        return $this->dashboardService->getScheduleByDates($start_date, $end_date);
    }
}
