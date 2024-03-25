<?php

namespace App\Services;

use App\Models\Appointment;
use Illuminate\Support\Facades\Auth;

class AppointmentService extends BaseService
{
    public function getModel()
    {
        return Appointment::class;
    }

    protected function roleCheck(?int $doctor_id, ?int $patient_id)
    {
        $query_string = 'doctor_id';
        $query_param = $doctor_id;
        if ($patient_id) {
            $query_string = 'patient_id';
            $query_param = $patient_id;
        }

        return [
            'query_string' => $query_string,
            'query_param' => $query_param,
        ];
    }

    // Get all appointments between two given dates
    public function getAllBetweenDates(string $date_start, string $date_end, ?int $doctor_id, ?int $patient_id)
    {
        $query_info = $this->roleCheck($doctor_id, $patient_id);

        $appointments = $this->model->where($query_info['query_string'], $query_info['query_param'])
            ->select('doctor_id', 'date', 'patient_id', 'start_time', 'end_time')
            ->havingBetween('date', [$date_start, $date_end])
            ->orderBy('date', 'asc')
            ->orderBy('start_time', 'asc')
            ->with('patient')
            ->get();

        $appointmentList = [];

        foreach ($appointments as $appointment) {
            $appointmentList[date('l', strtotime($appointment['date']))][] = $appointment;
        }

        return $appointmentList;
    }

    // Get all appointments of a single day
    public function getAllByDate(string $date, ?int $doctor_id, ?int $patient_id)
    {
        $query_info = $this->roleCheck($doctor_id, $patient_id);

        $appointments = $this->model->where($query_info['query_string'], $query_info['query_param'])
            ->select('doctor_id', 'date', 'patient_id', 'start_time', 'end_time')
            ->where('date', $date)
            ->orderBy('start_time', 'asc')
            ->with('patient')
            ->get();

        return $appointments;
    }

    // Get the current ongoing appointment of the day
    public function getByHourAndDate(string $hour, string $date, ?int $doctor_id, ?int $patient_id)
    {
        $query_info = $this->roleCheck($doctor_id, $patient_id);

        $appointment = $this->model->where($query_info['query_string'], $query_info['query_param'])
            ->select('doctor_id', 'date', 'patient_id', 'start_time', 'end_time')
            ->where('date', $date)
            ->where('start_time', '<', $hour)
            ->where('end_time', '>', $hour)
            ->with('patient')
            ->get();

        return $appointment;
    }

    // Get all appointments of this week
    public function getAllOfThisWeek()
    {
        $doctor_id = Auth::user()->id;
        $first_day_this_week = date('Y-m-d', strtotime('monday this week'));
        $last_day_this_week = date('Y-m-d', strtotime('sunday this week'));

        return $this->getAllBetweenDates($first_day_this_week, $last_day_this_week, $doctor_id, null);
    }

    public function getAllByDoctorId(string $doctor_id)
    {
        return $this->model->where('doctor_id', $doctor_id)
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();
    }
}
