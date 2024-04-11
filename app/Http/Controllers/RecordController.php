<?php

namespace App\Http\Controllers;

use App\Services\DoctorService;
use App\Services\IcdService;
use App\Services\PatientService;
use Illuminate\Http\Request;
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

    public function index(Request $request)
    {
        $doctor_id = Auth::user()->id;
        $medicalInfosAndPaginator = [];

        $patients = $this->doctorService->getAllAppointedPatientsIdForTodayByDoctorId($doctor_id);
        if ($request->query('name') || $request->query('age')) {
            $medicalInfosAndPaginator = $this->patientService->getMedicalInformationById($patients, $request);
        } else {
            $medicalInfosAndPaginator = $this->patientService->getMedicalInformationById($patients);
        }

        $medicalInfos = $medicalInfosAndPaginator['medicalInfos'];
        $paginator = $medicalInfosAndPaginator['paginator'];

        $icd = $this->icdService->getAll();

        return Inertia::render('Auth/Doctor/Records', [
            'medical_info' => $medicalInfos,
            'icd' => $icd,
            'paginator' => $paginator,
        ]);
    }
}
