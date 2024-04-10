<?php

namespace Database\Factories;

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
        return [
            'doctor_id' => 71,
            'task' => 'Some task',
            'location' => 'North Office, floor 1, room C206',
            'date' => '2024-04-01',
            'end_time' => '09:00:00',
            'start_time' => '08:00:00',
        ];
    }
}
