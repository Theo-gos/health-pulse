<?php

namespace App\Http\Controllers;

use App\Http\Requests\AppointmentBookingRequest;
use App\Mail\AppointmentBooked;
use App\Models\Patient;
use App\Services\BookingService;
use App\Services\PatientService;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

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
        $appointment = $this->bookingService->store($request->all());
        $message = [];

        if ($appointment) {
            $message = [
                'message' => 'Stored to database',
                'type' => 'success',
                'appointment' => $appointment->only('date', 'doctor_id', 'end_time', 'patient_name', 'start_time', 'id'),
            ];

            $patient = Patient::find(1);
            Mail::to($patient->email)->send(new AppointmentBooked);
        } else {
            $message = [
                'message' => 'Failed to store',
                'type' => 'error',
            ];
        }

        return redirect()->back()->with('message', $message);
    }
}
