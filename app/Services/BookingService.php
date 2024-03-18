<?php

namespace App\Services;

use App\Models\Service;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingService
{
    private $doctorService;

    public function __construct(DoctorService $doctorService)
    {
        $this->doctorService = $doctorService;
    }

    public function getBookingData()
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
