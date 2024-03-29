<?php

namespace App\Http\Controllers;

use App\Http\Requests\AppointmentNoteRequest;
use App\Models\Appointment;
use App\Services\AppointmentService;
use App\Services\IcdService;
use App\Services\PatientService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    private $appointmentService;

    private $patientService;

    private $icdService;

    public function __construct(
        AppointmentService $appointmentService,
        PatientService $patientService,
        IcdService $icdService,
    ) {
        $this->appointmentService = $appointmentService;
        $this->patientService = $patientService;
        $this->icdService = $icdService;
    }

    public function show(string $date_start, string $date_end)
    {
        $user = Auth::user();
        $appointments = $this->appointmentService->getAllBetweenDates($date_start, $date_end, $user->id, null);

        return redirect()->back()->with('appointment', [
            'list' => $appointments,
        ]);
    }

    public function showAppointmentNote(Appointment $appointment)
    {
        $medicalInfo = $this->patientService->getMedicalInformationById([$appointment->patient_id]);
        $icd = $this->icdService->getAll();

        $note = $this->appointmentService->getAppointmentNoteById($appointment->id);

        return Inertia::render('Auth/Doctor/AppointmentNote', [
            'medicalInfo' => $medicalInfo,
            'appointment' => $appointment,
            'icd' => $icd,
            'note' => $note,
        ]);
    }

    public function storeAppointmentNoteData(AppointmentNoteRequest $request, Appointment $appointment)
    {
        $user = Auth::user();

        if ($request->diagnoses) {
            $this->appointmentService->storeDiagnoses($user->id, $request->patient_id, $request->diagnoses);
        }

        $prescription = [];
        if (! is_null($request->medication_name)) {
            $prescription = $this->appointmentService->storePrescription($user->id, $request->only('patient_id', 'date', 'medication_name', 'dose', 'dose_addon', 'pill_per_day', 'pill_type', 'recommendation'));
        }

        if (! $prescription) {
            return redirect(route('doctor.appointments'))->with('message', [
                'message' => 'Failed to store',
                'type' => 'error',
            ]);
        }

        $note = $this->appointmentService->storeAppointmentNote($request->only('appointment_id', 'main_complaint', 'objective_note', 'subjective_note', 'files', 'signature'));

        if ($note) {
            return redirect(route('doctor.appointments'))->with('message', [
                'message' => 'Stored to database successfully',
                'type' => 'success',
            ]);
        } else {
            return redirect(route('doctor.appointments'))->with('message', [
                'message' => 'Failed to store',
                'type' => 'error',
            ]);
        }
    }

    public function index()
    {
        $appointments = $this->appointmentService->getAllOfThisWeek();

        return Inertia::render('Auth/Doctor/Appointments', [
            'appointments' => $appointments,
        ]);
    }
}
