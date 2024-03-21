<?php

namespace App\Services;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardService
{
    protected $timezone = 'Asia/Ho_Chi_Minh';

    private $appointmentService;
    private $scheduleService;

    public function __construct(AppointmentService $appointmentService, ScheduleService $scheduleService)
    {
        date_default_timezone_set($this->timezone);

        $this->appointmentService = $appointmentService;
        $this->scheduleService = $scheduleService;
    }

    public function index()
    {
        $user = Auth::user();
        $first_day_this_month = date('Y-m-01');
        $last_day_this_month  = date('Y-m-t');

        $appointments = $this->appointmentService->getAllByDate(date("Y-m-d"), $user->id, null)->toArray();
        $current_appointment = $this->appointmentService->getByHourAndDate(date("H:i:s"), date("Y-m-d"), $user->id, null);

        $schedule = $this->scheduleService->getAllBetweenDates($first_day_this_month, $last_day_this_month);

        return [
            'appointments' => $appointments,
            'current_appointment' => $current_appointment,
            'schedules' => $schedule,
        ];
    }

    public function getAppointmentsByDate(string $date)
    {
        $user = Auth::user();
        $appointments = $this->appointmentService->getAllByDate($date, $user->id, null)->toArray();
        $current_appointment = $this->appointmentService->getByHourAndDate(date("h:i:s"), date("Y-m-d"), $user->id, null);

        return [
            'list' => $appointments,
            'current' => $current_appointment,
        ];
    }

    public function getScheduleByDates(string $start_date, string $end_date)
    {
        $schedule = $this->scheduleService->getAllBetweenDates($start_date, $end_date);

        return [
            'list' => $schedule,
        ];
    }
}
