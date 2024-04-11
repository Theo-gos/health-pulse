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
        $message = $this->bookingService->storeAppointment($patient->id, $request->all());

        if ($message['type'] === 'success') {
            $doctor = $message['appointment']->doctor;

            $patient->notify(new AppointmentBookedForPatient($message['appointment']));
            $doctor->notify(new AppointmentBookedForDoctor($message['appointment']));

            event(new AppointmentBookedEvent([
                'doctor_id' => $message['appointment']->doctor_id,
                'message' => 'There is a new appointment',
            ]));
        }

        return redirect()->back()->with('message', $message);
    }
}
