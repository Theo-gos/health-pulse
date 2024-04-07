<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileAvatarUpdateRequest;
use App\Models\Doctor;
use App\Services\DoctorService;
use Inertia\Inertia;

class DoctorProfileController extends Controller
{
    private $doctorService;

    public function __construct(DoctorService $doctorService)
    {
        $this->doctorService = $doctorService;
    }

    public function index()
    {
        return Inertia::render('Auth/Doctor/DoctorProfile');
    }

    public function uploadAvatar(ProfileAvatarUpdateRequest $request, Doctor $doctor)
    {
        $isUpdated = $this->doctorService->updateAvatarForDoctor($doctor, $request->only('avatar'));

        if ($isUpdated) {
            return redirect()->back()->with('message', [
                'message' => 'Avatar updated successfully',
                'type' => 'success',
            ]);
        } else {
            return redirect()->back()->with('message', [
                'message' => 'Failed to update avatar',
                'type' => 'error',
            ]);
        }
    }
}
