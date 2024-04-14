<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class DoctorFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    protected static $index = 1;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'service_id' => 1,
            'avatar' => url('https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'),
            'phone' => fake()->phoneNumber(),
            'email' => 'doctor'.static::$index++.'@example.com',
            'password' => static::$password ??= Hash::make('password'),
            'age' => fake()->numberBetween(25, 50),
            'sex' => 'M',
            'name' => fake()->name('male'),
        ];
    }
}
