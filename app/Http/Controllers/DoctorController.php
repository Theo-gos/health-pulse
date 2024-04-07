<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Services\DoctorService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class DoctorController extends Controller
{
    private $doctorService;

    public function __construct(DoctorService $doctorService)
    {
        $this->doctorService = $doctorService;
    }

    // Show login page
    public function create(): InertiaResponse
    {
        return Inertia::render('Auth/Doctor/Login');
    }

    public function showNotifications()
    {
        $doctor = Auth::user();
        $notifications = $this->doctorService->getAllDoctorNotifications($doctor);

        return Inertia::render('Auth/Doctor/Notification', $notifications);
    }

    public function markNotificationAsRead(Notification $notification)
    {
        $this->doctorService->markNotificationAsRead($notification);

        return redirect()->back();
    }

    public function markAllNotificationsAsRead()
    {
        $doctor = Auth::user();
        $this->doctorService->markAllNotificationsAsRead($doctor->id);

        return redirect()->back();
    }
}
