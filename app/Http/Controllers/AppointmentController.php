<?php

namespace App\Http\Controllers;

use App\Enums\CurrentTimeZone;
use App\Http\Requests\AppointmentNoteRequest;
use App\Models\Appointment;
use App\Services\AppointmentService;
use App\Services\IcdService;
use App\Services\MedicationService;
use App\Services\PatientService;
use App\Services\TestResultService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    private $appointmentService;

    private $patientService;

    private $icdService;

    private $testResultService;

    private $medicationService;

    public function __construct(
        AppointmentService $appointmentService,
        PatientService $patientService,
        IcdService $icdService,
        TestResultService $testResultService,
        MedicationService $medicationService,
    ) {
        $this->appointmentService = $appointmentService;
        $this->patientService = $patientService;
        $this->icdService = $icdService;
        $this->testResultService = $testResultService;
        $this->medicationService = $medicationService;
    }

    public function show(string $date_start, string $date_end)
    {
        $user = Auth::user();
        $appointments = $this->appointmentService->getAllBetweenDates($date_start, $date_end, $user->id, null);

        return redirect()->route('doctor.appointments')->with('appointment', [
            'list' => $appointments,
        ]);
    }

    public function showAppointmentNote(Appointment $appointment)
    {
        $medicalInfosAndPaginator = $this->patientService->getMedicalInformationById([$appointment->patient_id]);
        $medicalInfo = $medicalInfosAndPaginator['medicalInfos'];
        $icd = $this->icdService->getAll();
        $medications = $this->medicationService->getAll();

        $note = $this->appointmentService->getAppointmentNoteById($appointment->id);

        return Inertia::render('Auth/Doctor/AppointmentNote', [
            'medicalInfo' => $medicalInfo,
            'appointment' => $appointment,
            'icd' => $icd,
            'medications' => $medications,
            'note' => $note,
        ]);
    }

    public function storeAppointmentNoteData(AppointmentNoteRequest $request, Appointment $appointment)
    {
        $user = Auth::user();

        $isUpdated = $this->patientService->updateLastVisitById($request->patient_id);

        if (! $isUpdated) {
            return redirect()->back()->with('message', [
                'message' => 'Failed to update patient last visit',
                'type' => 'error',
            ]);
        }

        if ($request->diagnoses) {
            $isStored = $this->appointmentService->storeDiagnoses($user->id, $request->patient_id, $request->diagnoses);

            if (! $isStored) {
                return redirect()->back()->with('message', [
                    'message' => 'Failed to store diagnoses',
                    'type' => 'error',
                ]);
            }
        }

        if ($request->prescriptions) {
            $isStored = $this->appointmentService->storePrescription($request->prescriptions);

            if (! $isStored) {
                return redirect()->back()->with('message', [
                    'message' => 'Failed to store prescriptions',
                    'type' => 'error',
                ]);
            }
        }

        if ($request->isReVisit) {
            $payload = [
                'doctor_id' => $user->id,
                'patient_id' => $request->patient_id,
                'date' => $request->recurringDate,
                'start_time' => $request->recurringTime['start_time'],
                'end_time' => $request->recurringTime['end_time'],
            ];
            $isStored = $this->appointmentService->store($payload);

            if (! $isStored) {
                return redirect()->back()->with('message', [
                    'message' => 'Failed to store recurring appointment',
                    'type' => 'error',
                ]);
            }
        }

        $note = $this->appointmentService->storeAppointmentNote($request->only('appointment_id', 'main_complaint', 'objective_note', 'tests', 'files', 'signature', 'recurringDate', 'recurringTime'));

        if (! $note) {
            return redirect()->back()->with('message', [
                'message' => 'Failed to store appointment note',
                'type' => 'error',
            ]);
        }

        $this->appointmentService->setAppointmentAsDone($appointment);

        $test = $this->testResultService->storeTestResult($user, $request->all());

        if ($test) {
            return redirect()->back()->with('message', [
                'message' => 'Stored to database successfully',
                'type' => 'success',
            ]);
        } else {
            return redirect()->back()->with('message', [
                'message' => 'Failed to store test result',
                'type' => 'error',
            ]);
        }
    }

    public function index(Request $request)
    {
        date_default_timezone_set(CurrentTimeZone::TIMEZONE);
        $appointments = [];
        $start_date = date('Y-m-d');
        if ($request->query('start_date')) {
            $doctor_id = Auth::user()->id;
            $start_date = $request->query('start_date');
            $appointments = $this->appointmentService->getAllBetweenDates($request->query('start_date'), $request->query('end_date'), $doctor_id, null);
        } else {
            $appointments = $this->appointmentService->getAllOfThisWeek();
        }

        return Inertia::render('Auth/Doctor/Appointments', [
            'appointments' => $appointments,
            'startDate' => $start_date,
        ]);
    }

    public function showRecurringOption(Request $request)
    {
        $doctor = Auth::user();

        if ($request->query('recurringDate')) {
            $date = $request->query('recurringDate');
            $appointments = $this->appointmentService->getAllByDate($date, $doctor->id, null);

            return redirect()->back()->with('appointment', [
                'list' => $appointments,
                'service' => $doctor->service,
            ]);
        }

        return redirect()->back()->with('message', [
            'message' => 'Something went wrong',
            'type' => 'error',
        ]);
    }
}
