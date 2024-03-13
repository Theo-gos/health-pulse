<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    //
    public function show(string $date_start, string $date_end)
    {
        $user = Auth::user();
        // $id = Auth::id();

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
}
