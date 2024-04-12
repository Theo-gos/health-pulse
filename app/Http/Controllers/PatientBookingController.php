<?php

namespace App\Http\Controllers;

use App\Events\AppointmentEvent;
use App\Http\Requests\AppointmentBookingRequest;
use App\Models\Appointment;
use App\Notifications\AppointmentBookedForDoctor;
use App\Notifications\AppointmentBookedForPatient;
use App\Notifications\AppointmentCanceledForDoctor;
use App\Notifications\AppointmentCanceledForPatient;
use App\Services\AppointmentService;
use App\Services\BookingService;
use App\Services\PatientService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PatientBookingController extends Controller
{
    private $patientService;

    private $bookingService;

    private $appointmentService;

    public function __construct(PatientService $patientService, BookingService $bookingService, AppointmentService $appointmentService)
    {
        $this->patientService = $patientService;
        $this->bookingService = $bookingService;
        $this->appointmentService = $appointmentService;
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

            event(new AppointmentEvent([
                'doctor_id' => $message['appointment']->doctor_id,
                'message' => 'There is a new appointment',
            ]));
        }

        return redirect()->back()->with('message', $message);
    }

    public function cancel(Appointment $appointment)
    {
        if (! Auth::guard('patient')->check()) {
            return redirect()->route('home');
        }

        $status = $this->appointmentService->cancel($appointment);
        if ($status) {
            $patient = $this->patientService->getById(Auth::guard('patient')->user()->id);
            $doctor = $appointment->doctor;

            $patient->notify(new AppointmentCanceledForPatient($appointment));
            $doctor->notify(new AppointmentCanceledForDoctor($appointment));

            event(new AppointmentEvent([
                'doctor_id' => $appointment->doctor_id,
                'message' => 'An appointment has been canceled.',
            ]));

            return redirect()->back()->with('message', [
                'message' => 'Canceled appointment successfully!',
                'type' => 'success',
            ]);
        } else {
            return redirect()->back()->with('message', [
                'message' => 'Canceled appointment failed!',
                'type' => 'error',
            ]);
        }
    }
}
