<?php

namespace App\Http\Controllers;

use App\Services\DoctorService;
use App\Services\IcdService;
use App\Services\PatientService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RecordController extends Controller
{
    //

    private $icdService;

    private $patientService;

    private $doctorService;

    public function __construct(
        IcdService $icdService,
        DoctorService $doctorService,
        PatientService $patientService
    ) {
        $this->icdService = $icdService;
        $this->doctorService = $doctorService;
        $this->patientService = $patientService;
    }

    public function index()
    {
        $doctor_id = Auth::user()->id;

        $patients = $this->doctorService->getAllAppointedPatientsIdByDoctorId($doctor_id);
        $medicalInfos = $this->patientService->getMedicalInformationById($patients);
        $icd = $this->icdService->getAll();

        return Inertia::render('Auth/Doctor/Records', [
            'medical_info' => $medicalInfos,
            'icd' => $icd,
        ]);
    }
}
