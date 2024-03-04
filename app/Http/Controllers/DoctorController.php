<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class DoctorController extends Controller
{
    public function index(): InertiaResponse
    {
        return Inertia::render('Home');
    }

    // Show login page
    public function create(): InertiaResponse
    {
        return Inertia::render('Auth/Doctor/Login');
    }
}
