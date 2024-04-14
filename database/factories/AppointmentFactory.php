<?php

namespace Database\Factories;

use App\Enums\CurrentTimeZone;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        date_default_timezone_set(CurrentTimeZone::TIMEZONE);

        return [
            'doctor_id' => 71,
            'patient_id' => 1,
            'date' => date('Y-m-d'),
            'status' => 'active',
            'end_time' => '09:00:00',
            'start_time' => '08:00:00',
        ];
    }
}
