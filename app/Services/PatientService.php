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

        // dd($patients[0]->appointed_doctors[0]->service->type);

        $patientMedicalInfos = [];

        foreach ($patients as $patient) {
            $patientMedicalInfos[$patient->id]['patient'] = $patient;
            if ($patient->allergies->count() > 0) {
                foreach ($patient->allergies->all() as $allergy) {
                    $patientMedicalInfos[$patient->id]['allergies'][$allergy->type][] = $allergy;
                }
            } else {
                $patientMedicalInfos[$patient->id]['allergies'] = [];
            }

            if ($patient->appointed_doctors->count() > 0) {
                $index = 0;
                foreach ($patient->appointed_doctors->all() as $ap_doctor) {
                    $ap_doctor['type'] = $ap_doctor->service->type;
                    $patientMedicalInfos[$patient->id]['appointments'][$index]['booked_doctor'] = $ap_doctor;
                    $patientMedicalInfos[$patient->id]['appointments'][$index]['detail'] = $ap_doctor->appointments;
                    $index++;
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

    public function store($data)
    {
        $birthDate = $data['dob'];
        $birthDate = explode('-', $birthDate);
        $age = (date('md', date('U', mktime(0, 0, 0, $birthDate[2], $birthDate[1], $birthDate[0]))) > date('md')
            ? ((date('Y') - $birthDate[0]) - 1)
            : (date('Y') - $birthDate[0]));

        $name = $data['first_name'].' '.$data['last_name'];
        $this->model->create([
            'name' => $name,
            'address' => $data['address'],
            'phone' => $data['phone'],
            'email' => $data['email'],
            'password' => $data['password'],
            'date_of_birth' => $data['dob'],
            'sex' => $data['gender'],
            'age' => $age,
        ]);
    }
}
