<?php

namespace App\Http\Controllers;

use App\Services\IcdService;
use App\Services\MedicationService;
use App\Services\PatientService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PatientController extends Controller
{
    private $icdService;

    private $patientService;

    private $medicationService;

    public function __construct(PatientService $patientService, IcdService $icdService, MedicationService $medicationService)
    {
        $this->patientService = $patientService;
        $this->icdService = $icdService;
        $this->medicationService = $medicationService;
    }

    public function index()
    {
        if (! Auth::guard('patient')->check()) {
            return redirect()->route('home');
        }

        $patient = Auth::guard('patient')->user();
        $medicalInfosAndPaginator = $this->patientService->getMedicalInformationById([$patient->id]);
        $medicalInfo = $medicalInfosAndPaginator['medicalInfos'];
        $icd = $this->icdService->getAll();
        $medications = $this->medicationService->getAll();

        return Inertia::render('Auth/Patient/PatientList', [
            'medicalInfo' => $medicalInfo[$patient->id],
            'icd' => $icd,
            'medications' => $medications,
        ]);
    }

    public function show(string $state)
    {
        if (! Auth::guard('patient')->check()) {
            return redirect()->route('home');
        }

        return redirect()->route('patient.lists')->with('data', $state);
    }
}
