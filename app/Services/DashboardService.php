<?php

namespace App\Services;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class DashboardService
{
    protected $timezone = 'Asia/Ho_Chi_Minh';

    public function __construct(private AppointmentService $appointmentService, private ScheduleService $scheduleService)
    {
        date_default_timezone_set($this->timezone);
    }

    public function index(): Response
    {
        $first_day_this_month = date('Y-m-01');
        $last_day_this_month  = date('Y-m-t');

        $appointments = $this->appointmentService->getAllByDate(date("Y-m-d"))->toArray();
        $current_appointment = $this->appointmentService->getByHourAndDate(date("H:i:s"), date("Y-m-d"));

        $schedule = $this->scheduleService->getAllBetweenDates($first_day_this_month, $last_day_this_month);

        return Inertia::render('Auth/Doctor/Dashboard', [
            'appointments' => $appointments,
            'current_appointment' => $current_appointment,
            'schedules' => $schedule,
        ]);
    }

    public function getAppointmentsByDate(string $date)
    {
        $appointments = $this->appointmentService->getAllByDate($date)->toArray();
        $current_appointment = $this->appointmentService->getByHourAndDate(date("h:i:s"), date("Y-m-d"));

        return redirect()->back()->with('appointment', [
            'list' => $appointments,
            'current' => $current_appointment,
        ]);
    }

    public function getScheduleByDates(string $start_date, string $end_date)
    {
        $schedule = $this->scheduleService->getAllBetweenDates($start_date, $end_date);

        return redirect()->back()->with('schedule', [
            'list' => $schedule,
        ]);
    }
}
