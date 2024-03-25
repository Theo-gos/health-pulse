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

        // \App\Models\Service::factory()
        //     ->count(7)
        //     ->state(new Sequence(
        //         [
        //             'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/general_care.png?v=1',
        //             'name' => 'General Care',
        //             'type' => 'general',
        //             'price' => '400.000',
        //             'duration' => '1 hour',
        //         ],
        //         [
        //             'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/dentistry.png?v=1',
        //             'name' => 'Dental Care',
        //             'type' => 'dentist',
        //             'price' => '400.000',
        //             'duration' => '1 hour',
        //         ],
        //         [
        //             'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/eye_care.png?v=1',
        //             'name' => 'Eye Care',
        //             'type' => 'eye',
        //             'price' => '500.000',
        //             'duration' => '30 minutes',
        //         ],
        //         [
        //             'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/ear_nose_throat.png?v=1',
        //             'name' => 'Ear Nose Throat',
        //             'type' => 'ENT',
        //             'price' => '450.000',
        //             'duration' => '20 minutes',
        //         ],
        //         [
        //             'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/cardiology.png?v=1',
        //             'name' => 'Cardiology',
        //             'type' => 'cardiologist',
        //             'price' => '500.000',
        //             'duration' => '1 hour',
        //         ],
        //         [
        //             'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/gastroenterology.png?v=1',
        //             'name' => 'Gastroenterology',
        //             'type' => 'gastroenterologist',
        //             'price' => '500.000',
        //             'duration' => '30 minutes',
        //         ],
        //         [
        //             'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/neurology.png?v=1',
        //             'name' => 'Neurology',
        //             'type' => 'neurologist',
        //             'price' => '500.000',
        //             'duration' => '1 hour',
        //         ],
        //     ))
        //     ->hasDoctors(10)
        //     ->create();
        // \App\Models\Patient::factory(5)->create();
        // \App\Models\Appointment::factory(10)->create();
        // \App\Models\Allergy::factory()
        //     ->count(4)
        //     ->state(new Sequence(
        //         [
        //             'name' => 'Lactose',
        //             'type' => 'Food',
        //             'severity' => 'Mild',
        //         ],
        //         [
        //             'name' => 'Peanut',
        //             'type' => 'Food',
        //             'severity' => 'Severe',
        //         ],
        //         [
        //             'name' => 'Ethanol',
        //             'type' => 'Drug',
        //             'severity' => 'Mild',
        //         ],
        //         [
        //             'name' => 'Flower',
        //             'type' => 'Environmental',
        //             'severity' => 'Mild',
        //         ],
        //     ))
        //     ->create();
        \App\Models\Prescription::factory(4)->create();
        \App\Models\Diagnosis::factory(6)->create();
    }
}
