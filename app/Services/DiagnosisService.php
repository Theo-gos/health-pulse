<?php

namespace App\Services;

use App\Models\Diagnosis;

class DiagnosisService extends BaseService
{
    public function getModel()
    {
        return Diagnosis::class;
    }

    public function getLatestDiagnosesPerPatient()
    {
        $latestDiagnosesPerPatient = $this->model
            ->selectRaw('patient_id, icds.icd_code, icds.severity, icds.color, MAX(date) as latest_date')
            ->join('icds', 'diagnoses.icd_code', '=', 'icds.icd_code')
            ->groupByRaw('patient_id, icd_code, icds.severity, icds.color')
            ->get()
            ->toArray();

        return $latestDiagnosesPerPatient;
    }

    public function getCommonIllnessCount()
    {
        return $this->model->selectRaw('icds.icd_code, icd_name, color, COUNT(icd_name) as count')
            ->join('icds', 'diagnoses.icd_code', '=', 'icds.icd_code')
            ->groupByRaw('icds.icd_code, icd_name, color')
            ->take(4)
            ->get()
            ->toArray();
    }

    public function getDiagnosesByPatientId($patientId)
    {
        return $this->model->where('patient_id', $patientId)->with('icd')->get()->all();
    }
}
