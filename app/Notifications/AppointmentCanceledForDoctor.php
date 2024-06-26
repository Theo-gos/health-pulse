<?php

namespace App\Notifications;

use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AppointmentCanceledForDoctor extends Notification
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
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
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
            'patient' => $this->patient,
            'appointment' => $this->appointment,
            'status' => 'canceled',
        ];
    }
}
