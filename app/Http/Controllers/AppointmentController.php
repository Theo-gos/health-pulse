<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function getAllBetweenDates(string $date_start, string $date_end)
    {
        $user = Auth::user();

        $appointments = Appointment::where('doctor_id', $user->id)
            ->select('doctor_id', 'date', 'patient_name', 'start_time', 'end_time')
            ->havingBetween('date', [$date_start, $date_end])
            ->orderBy('date', 'asc')
            ->orderBy('start_time', 'asc')
            ->get();

        $return = array();

        foreach ($appointments as $appointment) {
            $return[date('l', strtotime($appointment['date']))][] = $appointment;
        };

        return $return;
    }

    public function getAllByDate(string $date)
    {
        $user = Auth::user();

        $appointments = Appointment::where('doctor_id', $user->id)
            ->select('doctor_id', 'date', 'patient_name', 'start_time', 'end_time')
            ->where('date', $date)
            ->orderBy('start_time', 'asc')
            ->get();

        return $appointments;
    }

    public function getByHour(string $hour)
    {
        $user = Auth::user();

        $appointment = Appointment::where('doctor_id', $user->id)
            ->select('doctor_id', 'date', 'patient_name', 'start_time', 'end_time')
            ->where('start_time', '<',  $hour)
            ->where('end_time', '>',  $hour)
            ->get();

        return $appointment;
    }
}
