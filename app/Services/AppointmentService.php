<?php

namespace App\Services;

use App\Models\Appointment;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppointmentService
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

        $appointmentList = array();

        foreach ($appointments as $appointment) {
            $appointmentList[date('l', strtotime($appointment['date']))][] = $appointment;
        };

        return $appointmentList;
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

    public function getByHourAndDate(string $hour, string $date)
    {
        $user = Auth::user();

        $appointment = Appointment::where('doctor_id', $user->id)
            ->select('doctor_id', 'date', 'patient_name', 'start_time', 'end_time')
            ->where('date', $date)
            ->where('start_time', '<',  $hour)
            ->where('end_time', '>',  $hour)
            ->get();

        return $appointment;
    }

    public function showAppointmentPage()
    {
        $first_day_this_week = date("Y-m-d", strtotime('monday this week'));
        $last_day_this_week  = date("Y-m-d", strtotime('sunday this week'));

        return $this->getAllBetweenDates($first_day_this_week, $last_day_this_week);
    }

    public function storeToDatabase($data)
    {
        $appointment = Appointment::create($data);

        if ($appointment) {
            return [
                'message' => 'Stored to database',
                'type' => 'success',
                'appointment' => $appointment->only('date', 'doctor_id', 'end_time', 'patient_name', 'start_time', 'id'),
            ];
        } else {
            return [
                'message' => 'Fail to store',
                'type' => 'error',
            ];
        }
    }
}
