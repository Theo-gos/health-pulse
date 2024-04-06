<?php

namespace App\Notifications;

use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AppointmentBookedForPatient extends Notification implements ShouldQueue
{
    use Queueable;

    private $appointment;

    private $doctor;

    private $patient;

    /**
     * Create a new notification instance.
     */
    public function __construct(Appointment $appointment)
    {
        //
        $this->appointment = $appointment;
        $this->doctor = $appointment->doctor;
        $this->patient = $appointment->patient;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->greeting('Hello from Health Pulse!')
            ->lineIf($this->appointment, "You have booked an appointment with Dr. {$this->doctor->name}.")
            ->lineIf($this->appointment, "The appointment is on {$this->appointment->date}.")
            ->lineIf($this->appointment, "Starting from {$this->appointment->start_time}.")
            ->action('See your appointments', url('/'))
            ->line('Thank you for using our service!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
