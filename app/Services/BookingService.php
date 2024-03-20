<?php

namespace App\Services;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingService
{
    private $doctorService;
    private $appointmentService;

    public function __construct(DoctorService $doctorService, AppointmentService $appointmentService)
    {
        $this->doctorService = $doctorService;
        $this->appointmentService = $appointmentService;
    }

    public function getBookingData()
    {
        $today = date("Y-m-d", strtotime('today'));

        $services = Service::all();
        $doctors = $this->doctorService->getAllDoctors();
        $appointments = array();
        foreach ($doctors as $doctor) {
            $appointments[$doctor['id']] = $doctor->appointments()
                ->select('id', 'doctor_id', 'date', 'start_time', 'end_time')
                ->where('date', '>=', $today)
                ->orderBy('date', 'asc')
                ->orderBy('start_time', 'asc')
                ->get();
        }

        $bookedAppointments = array();
        foreach ($appointments as $key => $appointment) {
            foreach ($appointment as $val)
                $bookedAppointments[$key][$val['date']][] = $val;
        }

        return [
            'services' => $services,
            'doctors' => $doctors,
            'appointments' => $appointments,
            'bookedAppointments' => $bookedAppointments,
        ];
    }

    public function storeNewAppointment(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date|after_or_equal:today',
            'doctor' => 'required',
            'service' => 'required',
            'time' => 'required',
        ]);

        return $this->appointmentService->storeToDatabase([
            'doctor_id' => $validated['doctor'],
            'patient_name' => 'Theo Lee',
            'date' => $validated['date'],
            'start_time' => $validated['time']['start_time'],
            'end_time' => $validated['time']['end_time'],
        ]);
    }
}
