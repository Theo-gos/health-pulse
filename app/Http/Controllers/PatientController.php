<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Services\BookingService;
use App\Services\PatientService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PatientController extends Controller
{
    private $patientService;
    private $bookingService;

    public function __construct(PatientService $patientService, BookingService $bookingService)
    {
        $this->patientService = $patientService;
        $this->bookingService = $bookingService;
    }

    public function booking()
    {
        $data = $this->bookingService->getBookingData();

        return Inertia::render('Auth/Patient/AppointmentBooking', [
            'bookingData' => $data,
        ]);
    }
}
