<?php

namespace App\Http\Controllers;

use App\Events\AppointmentBookedEvent;
use App\Http\Requests\AppointmentBookingRequest;
use App\Notifications\AppointmentBookedForDoctor;
use App\Notifications\AppointmentBookedForPatient;
use App\Services\BookingService;
use App\Services\PatientService;
use Illuminate\Support\Facades\Auth;
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
        $patient = $this->patientService->getById(Auth::guard('patient')->user()->id);
        $appointment = $this->bookingService->storeAppointment($patient->id, $request->all());
        $doctor = $appointment->doctor;
        $message = [];

        if ($appointment) {
            $message = [
                'message' => 'Stored to database',
                'type' => 'success',
                'appointment' => $appointment->only('date', 'doctor_id', 'end_time', 'patient_name', 'start_time', 'id'),
            ];

            $patient->notify(new AppointmentBookedForPatient($appointment));
            $doctor->notify(new AppointmentBookedForDoctor($appointment));

            event(new AppointmentBookedEvent([
                'doctor_id' => $appointment->doctor_id,
                'message' => 'There is a new appointment',
            ]));
        } else {
            $message = [
                'message' => 'Failed to store',
                'type' => 'error',
            ];
        }

        return redirect()->back()->with('message', $message);
    }
}
