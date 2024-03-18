<?php

namespace App\Services;

use App\Models\Service;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingService
{
    private $doctorService;
    private $patientService;

    public function __construct(DoctorService $doctorService, PatientService $patientService)
    {
        $this->doctorService = $doctorService;
        $this->patientService = $patientService;
    }

    public function showBookingPage()
    {
        $services = Service::all();
        $doctors = $this->doctorService->getAllDoctors();
        $appointments = array();
        foreach ($doctors as $doctor) {
            $appointments[$doctor['name']] = $doctor->appointments;
        }

        return [
            'services' => $services,
            'doctors' => $doctors,
            'appointments' => $appointments,
        ];
    }
}
