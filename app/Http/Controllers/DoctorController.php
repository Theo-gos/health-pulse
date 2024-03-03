<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class DoctorController extends Controller
{
    // Show login page
    public function create(): InertiaResponse
    {
        return Inertia::render('Auth/Doctor/Login');
    }

    // Show register page
    public function register(): InertiaResponse
    {
        return Inertia::render('Auth/Doctor/Register');
    }
}
