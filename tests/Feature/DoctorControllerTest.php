<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DoctorControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testShowLoginPage(): void
    {
        $response = $this->get(route('doctor.login.create'));

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Auth/Doctor/Login')
        );
    }
}
