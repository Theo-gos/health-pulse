<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ScheduleController extends Controller
{
    public function getAllBetweenDates(string $date_start, string $date_end)
    {
        $user = Auth::user();

        $schedules = Schedule::where('doctor_id', $user->id)
            ->select('doctor_id', 'id', 'task', 'location', 'date', 'start_time', 'end_time')
            ->havingBetween('date', [$date_start, $date_end])
            ->orderBy('date', 'asc')
            ->orderBy('start_time', 'asc')
            ->get();

        $return = array();

        foreach ($schedules as $schedule) {
            $return[$schedule['date']][] = $schedule;
        };

        return $return;
    }

    public function getAllByDate(string $date)
    {
        $user = Auth::user();

        $schedules = Schedule::where('doctor_id', $user->id)
            ->select('doctor_id', 'id', 'task', 'location', 'date', 'start_time', 'end_time')
            ->where('date', $date)
            ->orderBy('start_time', 'asc')
            ->get();

        return $schedules;
    }

    public function getById(string $id)
    {
        $user = Auth::user();

        $schedule = Schedule::where('doctor_id', $user->id)
            ->select('doctor_id', 'id', 'task', 'location', 'date', 'start_time', 'end_time')
            ->where('id', $id)
            ->get();

        return $schedule;
    }
}
