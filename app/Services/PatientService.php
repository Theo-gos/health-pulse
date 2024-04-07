<?php

namespace App\Services;

use App\Models\Patient;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class PatientService extends BaseService
{
    public function getModel()
    {
        return Patient::class;
    }

    public function generateAgeGroupCounts()
    {
        return $this->model->selectRaw(
            '
            SUM(CASE WHEN age < 18 THEN 1 ELSE 0 END) AS `14-17`,
            SUM(CASE WHEN age BETWEEN 18 AND 24 THEN 1 ELSE 0 END) AS `18-24`,
            SUM(CASE WHEN age BETWEEN 25 AND 34 THEN 1 ELSE 0 END) AS `25-34`,
            SUM(CASE WHEN age BETWEEN 35 AND 44 THEN 1 ELSE 0 END) AS `35-44`,
            SUM(CASE WHEN age BETWEEN 45 AND 54 THEN 1 ELSE 0 END) AS `45-54`,
            SUM(CASE WHEN age BETWEEN 55 AND 64 THEN 1 ELSE 0 END) AS `55-64`,
            SUM(CASE WHEN age BETWEEN 65 AND 74 THEN 1 ELSE 0 END) AS `65-74`,
            SUM(CASE WHEN age > 75 THEN 1 ELSE 0 END) AS `75-90`'
        );
    }

    public function getMedicalInformationById($patient_id)
    {
        $patients = $this->model->whereIn('id', $patient_id)
            ->with(['allergies', 'appointed_doctors', 'diagnose_doctors', 'prescribe_doctors', 'appointed_doctors.service'])
            ->get()
            ->all();

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
                    $patientMedicalInfos[$patient->id]['appointments'][$index]['doctor'] = $ap_doctor;
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
                $index = 0;
                foreach ($patient->prescribe_doctors->all() as $pres_doctor) {
                    $patientMedicalInfos[$patient->id]['prescriptions'][$index]['doctor'] = $pres_doctor;
                    $patientMedicalInfos[$patient->id]['prescriptions'][$index]['detail'] = $pres_doctor->prescriptions;
                    $index++;
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

    public function getPatientCountBasedOnAgeAndGender($gender = 'M')
    {
        return $this->generateAgeGroupCounts()
            ->where('sex', '=', $gender)
            ->get()
            ->toArray();
    }

    public function updateAvatarForPatient(Patient $patient, $data)
    {
        $url = Cloudinary::upload($data['avatar']->getRealPath())->getSecurePath();

        $data['avatar'] = $url;

        return $patient->update($data);
    }
}
