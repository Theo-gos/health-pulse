<?php

namespace App\Jobs;

use App\Notifications\DailyNotificationForDoctor;
use App\Notifications\DailyNotificationForPatient;
use App\Services\AppointmentService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendEmailsDaily implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $appointmentService;

    /**
     * Create a new job instance.
     */
    public function __construct(AppointmentService $appointmentService)
    {
        //
        $this->appointmentService = $appointmentService;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $todayAppointments = $this->appointmentService->getAllToday();

        foreach ($todayAppointments as $appointment) {
            $appointment->doctor->notify(new DailyNotificationForDoctor($appointment));
            $appointment->patient->notify(new DailyNotificationForPatient($appointment));
        }
    }
}
