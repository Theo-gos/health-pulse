<?php

namespace App\Services;

use App\Enums\CurrentTimeZone;
use App\Enums\GenderType;
use Illuminate\Support\Facades\Auth;

class DashboardService
{
    protected $timezone = CurrentTimeZone::TIMEZONE;

    private $appointmentService;

    private $diagnosisService;

    private $scheduleService;

    private $patientService;

    private $testResultService;

    public function __construct(
        AppointmentService $appointmentService,
        ScheduleService $scheduleService,
        DiagnosisService $diagnosisService,
        PatientService $patientService,
        TestResultService $testResultService,
    ) {
        date_default_timezone_set($this->timezone);

        $this->appointmentService = $appointmentService;
        $this->diagnosisService = $diagnosisService;
        $this->scheduleService = $scheduleService;
        $this->patientService = $patientService;
        $this->testResultService = $testResultService;
    }

    public function index()
    {
        $user = Auth::user();
        $first_day_this_month = date('Y-m-01');
        $last_day_this_month = date('Y-m-t');
        $current_diagnoses = [];
        $current_tests = [];

        $appointments = $this->appointmentService->getAllByDate(date('Y-m-d'), $user->id, null)->toArray();
        $current_appointment = $this->appointmentService
            ->getOngoingAppointment(date('H:i:s'), date('Y-m-d'), $user->id, null);
        if ($current_appointment->all()) {
            $current_diagnoses = $this->diagnosisService
                ->getDiagnosesByPatientId($current_appointment->all()[0]->patient_id);
            $current_tests = $this->testResultService
                ->getTestResultsByPatientId($current_appointment->all()[0]->patient_id);
        }

        $schedule = $this->scheduleService->getAllBetweenDates($first_day_this_month, $last_day_this_month);

        $diagnosisStatistic = $this->diagnosisService->getLatestDiagnosesPerPatient();
        $commonIllnessStatistic = $this->diagnosisService->getCommonIllnessCount();

        $malePatientStatistic = $this->patientService->getPatientCountBasedOnAgeAndGender(GenderType::MALE);
        $femalePatientStatistic = $this->patientService->getPatientCountBasedOnAgeAndGender(GenderType::FEMALE);

        return [
            'appointments' => $appointments,
            'current_appointment' => $current_appointment,
            'current_diagnoses' => $current_diagnoses,
            'current_tests' => $current_tests,
            'schedules' => $schedule,
            'diagnosisStatistic' => $diagnosisStatistic,
            'commonIllnessStatistic' => $commonIllnessStatistic,
            'malePatientStatistic' => $malePatientStatistic[0],
            'femalePatientStatistic' => $femalePatientStatistic[0],
        ];
    }

    public function getAppointmentsByDate(string $date)
    {
        $user = Auth::user();
        $appointments = $this->appointmentService->getAllByDate($date, $user->id, null)->toArray();
        $current_appointment = $this->appointmentService
            ->getOngoingAppointment(date('h:i:s'), date('Y-m-d'), $user->id, null);

        return [
            'list' => $appointments,
            'current' => $current_appointment,
        ];
    }

    public function getScheduleByDates(string $start_date, string $end_date)
    {
        return $this->scheduleService->getAllBetweenDates($start_date, $end_date);
    }
}
