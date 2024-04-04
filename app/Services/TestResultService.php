<?php

namespace App\Services;

use App\Models\Test;
use Barryvdh\DomPDF\Facade\Pdf;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

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

        $pdf = Pdf::loadView('Test.test_result', [
            'doctor' => $doctor,
            'patient' => $patient,
            'data' => $data,
        ]);

        $tempPdfPath = storage_path('app/test_result.pdf');
        file_put_contents($tempPdfPath, $pdf->output());
        $result = Cloudinary::upload($tempPdfPath, [
            'folder' => 'test_results',
        ])->getSecurePath();
        unlink($tempPdfPath);
        dd($result);

        // $pdf->save(public_path() . '/pdf/' . $data['date'] . '_' . $patient['name'] . '_test-result.pdf');
        // dd(public_path());

        // $pdf = Pdf::view('Test.test_result', [
        //     'doctor' => $doctor,
        //     'patient' => $patient,
        //     'data' => $data,
        // ])
        //     ->format('a4')
        //     ->name($data['date'] . '_' . $patient['name'] . '_test-result.pdf');
        return $pdf;
    }
}
