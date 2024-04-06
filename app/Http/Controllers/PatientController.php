<?php

namespace App\Http\Controllers;

use App\Services\IcdService;
use App\Services\PatientService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PatientController extends Controller
{
    private $icdService;

    private $patientService;

    public function __construct(PatientService $patientService, IcdService $icdService)
    {
        $this->patientService = $patientService;
        $this->icdService = $icdService;
    }

    public function index()
    {
        $patient = Auth::guard('patient')->user();
        $medicalInfo = $this->patientService->getMedicalInformationById([$patient->id]);
        $icd = $this->icdService->getAll();

        return Inertia::render('Auth/Patient/PatientList', [
            'medicalInfo' => $medicalInfo[$patient->id],
            'icd' => $icd,
        ]);
    }

    public function show(string $state)
    {
        return redirect()->route('patient.lists')->with('data', $state);
    }
}
