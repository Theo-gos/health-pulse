<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        \App\Models\Doctor::factory()
            ->count(10)
            ->state(new Sequence(
                [
                    'sex' => 'M',
                    'name' => fake()->name('male'),
                ],
                [
                    'sex' => 'F',
                    'name' => fake()->firstName('female'),
                ],
            ))
            ->hasAppointments(10)
            ->create();
    }
}
