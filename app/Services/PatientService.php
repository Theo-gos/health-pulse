<?php

namespace App\Services;

use App\Models\Patient;

class PatientService extends BaseService
{
    public function getModel()
    {
        return Patient::class;
    }

    public function getMedicalInformationById($patient_id)
    {
        $patients = $this->model->whereIn('id', $patient_id)
            ->with(['allergies', 'appointed_doctors', 'diagnose_doctors', 'prescribe_doctors', 'appointed_doctors.service'])
            ->get()
            ->all();

        $patientMedicalInfos = [];

        foreach ($patients as $patient) {
            if ($patient->allergies->count() > 0) {
                foreach ($patient->allergies->all() as $allergy) {
                    $patientMedicalInfos[$patient->id]['allergies'][$allergy->type][] = $allergy;
                }
            } else {
                $patientMedicalInfos[$patient->id]['allergies'] = [];
            }

            if ($patient->appointed_doctors->count() > 0) {
                foreach ($patient->appointed_doctors->all() as $ap_doctor) {
                    $patientMedicalInfos[$patient->id]['appointments'][] = $ap_doctor->appointments;
                }
            } else {
                $patientMedicalInfos[$patient->id]['appointments'] = [];
            }

            if ($patient->diagnose_doctors->count() > 0) {
                foreach ($patient->diagnose_doctors->all() as $dia_doctor) {
                    $patientMedicalInfos[$patient->id]['diagnoses'][] = $dia_doctor->diagnoses;
                }
            } else {
                $patientMedicalInfos[$patient->id]['diagnoses'] = [];
            }

            if ($patient->prescribe_doctors->count() > 0) {
                foreach ($patient->prescribe_doctors->all() as $pres_doctor) {
                    $patientMedicalInfos[$patient->id]['prescriptions'][] = $pres_doctor->prescriptions;
                }
            } else {
                $patientMedicalInfos[$patient->id]['prescriptions'] = [];
            }
        }

        return $patientMedicalInfos;
    }
}
