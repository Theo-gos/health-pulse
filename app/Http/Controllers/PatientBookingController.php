<?php

namespace App\Http\Controllers;

use App\Events\AppointmentBookedEvent;
use App\Http\Requests\AppointmentBookingRequest;
use App\Mail\AppointmentBooked;
use App\Models\Appointment;
use App\Services\BookingService;
use App\Services\PatientService;
use Illuminate\Support\Facades\Auth;
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
        $patient = Auth::guard('patient')->user();
        $appointment = $this->bookingService->store($request->all());
        $message = [];

        if ($appointment) {
            $message = [
                'message' => 'Stored to database',
                'type' => 'success',
                'appointment' => $appointment->only('date', 'doctor_id', 'end_time', 'patient_name', 'start_time', 'id'),
            ];

            Mail::to($patient->email)->send(new AppointmentBooked($appointment));
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

    public function sendMail()
    {
        $patient = Auth::guard('patient')->user();
        $appointment = Appointment::find(1);
        Mail::to($patient->email)->send(new AppointmentBooked($appointment));
    }
}
