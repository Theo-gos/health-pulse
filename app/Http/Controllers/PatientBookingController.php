<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AppointmentBookingRequest;
use App\Mail\AppointmentBooked;
use App\Models\Patient;
use App\Services\BookingService;
use App\Services\PatientService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class PatientBookingController extends Controller
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

    public function store(AppointmentBookingRequest $request)
    {
        $validated = $request->validated();

        $appointment = $this->bookingService->store($validated);
        $message = array();

        if ($appointment) {
            $message = [
                'message' => 'Stored to database',
                'type' => 'success',
                'appointment' => $appointment->only('date', 'doctor_id', 'end_time', 'patient_name', 'start_time', 'id'),
            ];
        } else {
            $message = [
                'message' => 'Failed to store',
                'type' => 'error',
            ];
        }

        $patient = Patient::find(1);
        Mail::to($patient->email)->send(new AppointmentBooked);

        return redirect()->back()->with('message', $message);
    }
}
