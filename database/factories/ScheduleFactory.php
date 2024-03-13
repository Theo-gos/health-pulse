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
            'task' => fake()->title(),
            'location' => 'North Office, floor 1, room C206',
            'date' => fake()->dateTimeThisMonth(),
            'end_time' => fake()->time(),
            'start_time' => fake()->time(),
        ];
    }
}
