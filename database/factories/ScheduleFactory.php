<?php

namespace Database\Factories;

use App\Enums\CurrentTimeZone;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Schedule>
 */
class ScheduleFactory extends Factory
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
            'task' => 'Some task',
            'location' => 'North Office, floor 1, room C206',
            'date' => date('Y-m-d'),
            'end_time' => '09:00:00',
            'start_time' => '08:00:00',
        ];
    }
}
