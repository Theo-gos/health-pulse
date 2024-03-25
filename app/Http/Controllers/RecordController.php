<?php

namespace App\Http\Controllers;

use App\Services\AppointmentService;
use App\Services\DoctorService;
use App\Services\PatientService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RecordController extends Controller
{
    //

    private $appointmentService;

    private $patientService;

    private $doctorService;

    public function __construct(AppointmentService $appointmentService, DoctorService $doctorService, PatientService $patientService)
    {
        $this->appointmentService = $appointmentService;
        $this->doctorService = $doctorService;
        $this->patientService = $patientService;
    }

    public function index()
    {
        $doctor_id = Auth::user()->id;

        $patients = $this->doctorService->getAllAppointedPatientsIdByDoctorId($doctor_id);
        $medicalInfos = $this->patientService->getMedicalInformationById($patients);

        return Inertia::render('Auth/Doctor/Records');
    }
}
