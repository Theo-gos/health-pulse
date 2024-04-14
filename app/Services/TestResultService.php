<?php

namespace App\Services;

use App\Models\Test;
use Barryvdh\DomPDF\Facade\Pdf;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class TestResultService extends BaseService
{
    private $patientService;

    private $icdService;

    private $medicationService;

    public function __construct(
        PatientService $patientService,
        IcdService $icdService,
        MedicationService $medicationService,
    ) {
        parent::__construct();
        $this->patientService = $patientService;
        $this->icdService = $icdService;
        $this->medicationService = $medicationService;
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
        foreach ($data['prescriptions'] as &$prescription) {
            $medication = $this->medicationService->getByMedicationId($prescription['medication_id'])->all();
            $prescription['medication_name'] = $medication[0]->medication_name;
            $prescription['dose'] = $medication[0]->dose;
        }

        $payload = [
            'doctor_id' => $doctor->id,
            'patient_id' => $patient->id,
            'date' => $data['date'],
            'name' => $patient->name.'_'.$data['date'].'.pdf',
        ];

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

        $payload['result_url'] = $result;

        $test = $this->model->create($payload);

        return $test;
    }

    public function getTestResultsByPatientId($patientId)
    {
        $tests = $this->model->where('patient_id', $patientId)->with('doctor')->get()->all();
        $testsList = [];

        if ($tests) {
            $index = 0;
            foreach ($tests as $test) {
                $testsList['tests'][$index]['doctor'] = $test->doctor;
                $testsList['tests'][$index]['detail'] = $test;
                $index++;
            }
        } else {
            $testsList['tests'] = [];
        }

        return $testsList;
    }
}
