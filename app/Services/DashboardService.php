<?php

namespace App\Services;

use App\Enums\GenderType;
use Illuminate\Support\Facades\Auth;

class DashboardService
{
    protected $timezone = 'Asia/Ho_Chi_Minh';

    private $appointmentService;

    private $diagnosisService;

    private $scheduleService;

    private $patientService;

    public function __construct(
        AppointmentService $appointmentService,
        ScheduleService $scheduleService,
        DiagnosisService $diagnosisService,
        PatientService $patientService,
    ) {
        date_default_timezone_set($this->timezone);

        $this->appointmentService = $appointmentService;
        $this->diagnosisService = $diagnosisService;
        $this->scheduleService = $scheduleService;
        $this->patientService = $patientService;
    }

    public function index()
    {
        $user = Auth::user();
        $first_day_this_month = date('Y-m-01');
        $last_day_this_month = date('Y-m-t');

        $appointments = $this->appointmentService->getAllByDate(date('Y-m-d'), $user->id, null)->toArray();
        $current_appointment = $this->appointmentService->getByHourAndDate(date('H:i:s'), date('Y-m-d'), $user->id, null);

        $schedule = $this->scheduleService->getAllBetweenDates($first_day_this_month, $last_day_this_month);

        $diagnosisStatistic = $this->diagnosisService->getLatestDiagnosesPerPatient();
        $commonIllnessStatistic = $this->diagnosisService->getCommonIllnessCount();

        $malePatientStatistic = $this->patientService->getPatientCountBasedOnAgeAndGender(GenderType::MALE);
        $femalePatientStatistic = $this->patientService->getPatientCountBasedOnAgeAndGender(GenderType::FEMALE);

        return [
            'appointments' => $appointments,
            'current_appointment' => $current_appointment,
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
        $current_appointment = $this->appointmentService->getByHourAndDate(date('h:i:s'), date('Y-m-d'), $user->id, null);

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
