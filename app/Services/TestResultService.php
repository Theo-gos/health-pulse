<?php

namespace App\Services;

use App\Models\Test;
use Spatie\LaravelPdf\Facades\Pdf;

class TestResultService extends BaseService
{
    private $patientService;

    private $icdService;

    public function __construct(PatientService $patientService, IcdService $icdService)
    {
        parent::__construct();
        $this->patientService = $patientService;
        $this->icdService = $icdService;
    }

    public function getModel()
    {
        return Test::class;
    }

    public function storeTestResult($doctor, $data)
    {
        $patient = $this->patientService->getById($data['patient_id']);
        foreach ($data['diagnoses'] as &$diagnosis) {
            $icd = $this->icdService->getByIcdCode($diagnosis['icd_code'])->all();
            $diagnosis['icd_name'] = $icd[0]->icd_name;
        }

        $pdf = Pdf::view('Test.test_result', [
            'doctor' => $doctor,
            'patient' => $patient,
            'data' => $data,
        ])
            ->format('a4')
            ->name($data['date'].'_'.$patient['name'].'_test-result.pdf');

        dd($pdf);
    }
}
